import React, { useEffect, useState, lazy, Suspense, useMemo, useCallback } from "react";
import axios from "axios";
import { RiLoader4Line } from "react-icons/ri";
import PageWrapper from "./components/PageWrapper";
import Header from "./components/Header";

const Home = lazy(() => import("./components/Home"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const ProductIntroduction1 = lazy(() => import("./components/ProductIntroduction1"));
const Product1 = lazy(() => import("./components/Product1"));
const ProductIntroduction2 = lazy(() => import("./components/ProductIntroduction2"));
const Product4 = lazy(() => import("./components/Product4"));
const Product2 = lazy(() => import("./components/Product2"));
const ProductIntroduction3 = lazy(() => import("./components/ProductIntroduction3"));
const UsService = lazy(() => import("./components/UsService"));
const Employees = lazy(() => import("./components/Employee"));
const ThankYou = lazy(() => import("./components/ThankYou"));

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("01home");
  // candidateSection chứa id của section nhận từ PageWrapper khi scroll
  const [candidateSection, setCandidateSection] = useState(null);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  // state này dùng để đảm bảo rằng sau inactivity ta chỉ cuộn về section 1 lần
  const [hasSnapped, setHasSnapped] = useState(false);

  // Hàm điều hướng khi click vào menu: cuộn ngay và cập nhật activeSection
  const scrollToSection = useCallback((id, isManualScroll = false) => {
  const element = document.getElementById(id);
  if (element) {
    // Nếu là cuộn tự nhiên (không phải do header), cập nhật URL ngay
    if (!isManualScroll) {
      window.history.replaceState({}, "", `#${id}`);
    }
    element.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  }
}, []);


  // Mỗi khi candidateSection thay đổi, reset hasSnapped để cho phép cuộn lại sau inactivity
  useEffect(() => {
    setHasSnapped(false);
  }, [candidateSection]);

  // Hiệu ứng bắt "inactivity" trên toàn trang: nếu không có sự kiện nào xảy ra trong 0.8s,
  // thì tự động cuộn đến candidateSection (nếu chưa thực hiện cuộn) và đánh dấu đã snap.
  useEffect(() => {
    let inactivityTimer;
    const resetTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      // Mỗi lần có hoạt động, reset lại hasSnapped để cho phép snap lại khi inactivity xảy ra
      setHasSnapped(false);
      inactivityTimer = setTimeout(() => {
        if (candidateSection && !hasSnapped) {
          scrollToSection(candidateSection, true);
          setActiveSection(candidateSection);
          window.history.replaceState({}, "", `#${candidateSection}`);
          setHasSnapped(true);
        }
      }, 800);
    };

    window.addEventListener("scroll", resetTimer);
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("touchstart", resetTimer);

    // Khởi tạo timer ngay từ đầu
    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, [candidateSection, hasSnapped, scrollToSection]);

  useEffect(() => {
    if (dataLoaded) {
      const hash = window.location.hash.substring(1);
      const targetSection = hash || "01home";

      const attemptScroll = () => {
        const element = document.getElementById(targetSection);
        if (element) {
          scrollToSection(targetSection, true);
          setIsInitialLoad(false);
        } else {
          setTimeout(attemptScroll, 300);
        }
      };

      attemptScroll();
    }
  }, [dataLoaded, scrollToSection]);

  useEffect(() => {
    if (!isInitialLoad && activeSection) {
      const currentHash = window.location.hash.substring(1);
      if (currentHash !== activeSection) {
        window.history.replaceState({}, "", `#${activeSection}`);
      }
    }
  }, [activeSection, isInitialLoad]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        scrollToSection(hash, true);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [scrollToSection]);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem("data");

      if (storedData) {
        setDataLoaded(true);
      } else {
        try {
          const response = await axios.get("/portfolios?id=1");
          localStorage.setItem("data", JSON.stringify(response.data));
          setDataLoaded(true);
        } catch (error) {
          console.error("Lỗi gọi API:", error);
        }
      }
    };

    fetchData();
  }, []);

  const pages = useMemo(
    () => [
      <Home idPage={"01home"} />,
      <AboutUs key="about" />,
      <ProductIntroduction1 key="pi1" productId={7} imgID={[10, 11, 12, 13, 14]} />,
      <Product1 key="p1" productId={1} imgID={[1]} idPage={"04product1"} />,
      <Product1 key="p2" productId={13} imgID={[25]} idPage={"05product2"} />,
      <Product4 key="p3" productId={10} imgID={[30, 31, 37, 38]} idPage={"06product3"} />,
      <ProductIntroduction2 key="pi2" productId={3} imgID={[4, 5, 6, 3, 7]} />,
      <Product4 key="p4" productId={4} imgID={[15, 16, 17, 18]} idPage={"08product4"} />,
      <Product2 key="p5" productId={2} imgID={[19, 22]} idPage={"09product5"} />,
      <Product2 key="p6" productId={11} imgID={[27, 26]} idPage={"10product6"} />,
      <ProductIntroduction3 key="pi3" productId={7} imgID={[24]} />,
      <UsService key="service" companyId={1} />,
      <Employees key="employees" />,
      <ThankYou key="thankyou" />,
    ],
    []
  );

  if (!dataLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RiLoader4Line className="text-6xl text-blue-700 animate-spin" />
      </div>
    );
  }

  const sectionIds = [
    "01home",
    "02about-us",
    "03part1",
    "04product1",
    "05product2",
    "06product3",
    "07part2",
    "08product4",
    "09product5",
    "10product6",
    "12part3",
    "13our-service",
    "14employees",
    "15thank-you",
  ];

  return (
    <div className="flex flex-col max-w-screen items-center print:block print:w-[210mm] print:mx-auto bg-black">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <RiLoader4Line className="text-6xl text-blue-600 animate-spin" />
          </div>
        }
      >
        <Header
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          setIsExportingPDF={setIsExportingPDF}
          setActiveSection={setActiveSection}
        />
        {pages.map((page, index) => (
          <PageWrapper
            key={index}
            pageNumber={index + 1}
            id={sectionIds[index]}
            sectionId={sectionIds[index]}
            updateCandidateSection={setCandidateSection}
            isExportingPDF={isExportingPDF}
          >
            {page}
          </PageWrapper>
        ))}
      </Suspense>
    </div>
  );
};

export default React.memo(App);
