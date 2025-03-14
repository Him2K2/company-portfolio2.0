import React, { useEffect, useState, lazy, Suspense, useMemo, useCallback } from "react";
import axios from "axios";
import { RiLoader4Line } from "react-icons/ri";
import PageWrapper from "./components/PageWrapper";
import Header from "./components/Header";

const Home = lazy(() => import("./components/Home"));
const AbouteUs = lazy(() => import("./components/AbouteUs"));
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
  const [activeSection, setActiveSection] = useState("home");
  const [isExportingPDF, setIsExportingPDF] = useState(false); // Thêm state này

  const memoizedSetActiveSection = useCallback((section) => {
    setActiveSection(section);
  },);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem("data");

      if (storedData) {
        setDataLoaded(true);
      } else {
        try {
          const response = await axios.get("/portfolios?id=1");
          const data = JSON.stringify(response.data);
          localStorage.setItem("data", data);
          setDataLoaded(true);
        } catch (error) {
          console.error("Lỗi gọi API:", error);
        }
      }
    };

    fetchData();
  },);

  useEffect(() => {
    // Cập nhật URL khi activeSection thay đổi
    if (activeSection) {
      const url = `#${activeSection}`;
      window.history.replaceState({}, '', url);
    }
  }, [activeSection]);



  const homePage = <Home />;

  const pages = useMemo(() => [
    <AbouteUs key="about" />,
    <ProductIntroduction1 key="pi1" productId={7} imgID={[10, 11, 12, 13, 14]} />,
    <Product1 key="p1" productId={1} imgID={[1]} idPage={"product1"} />,
    <Product1 key="p2" productId={13} imgID={[25]} idPage={"product2"} />,
    <Product4 key="p3" productId={10} imgID={[30, 31, 37, 38]} idPage={"product3"} />,
    <ProductIntroduction2 key="pi2" productId={3} imgID={[4, 5, 6, 3, 7]} />,
    <Product4 key="p4" productId={4} imgID={[15, 16, 17, 18]} idPage={"product4"} />,
    <Product2 key="p5" productId={2} imgID={[19, 22]} idPage={"product5"} />,
    <Product2 key="p6" productId={11} imgID={[27, 26]} idPage={"product6"} />,
    <Product2 key="p7" productId={12} imgID={[29]} idPage={"product7"} />,
    <ProductIntroduction3 key="pi3" productId={7} imgID={[24]} />,
    <UsService key="service" companyId={1} />,
    <Employees key="employees" />,
    <ThankYou key="thankyou" />,
  ],);

  if (!dataLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RiLoader4Line className="text-6xl text-blue-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-screen items-center print:block print:w-[210mm] print:mx-auto bg-black">
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
      <RiLoader4Line className="text-6xl text-blue-600 animate-spin" />
    </div>}>
      <Header className="no-print" activeSection={activeSection} setActiveSection={memoizedSetActiveSection} setIsExportingPDF={setIsExportingPDF} /> {/* Truyền prop setIsExportingPDF */}
      <PageWrapper id="home" sectionId="home" setActiveSection={memoizedSetActiveSection} className="page-wrapper">
        {homePage}
      </PageWrapper>


        {pages.map((page, index) => {
          let sectionId = null;
          if (index === 0) sectionId = "abouteus";
          if (index === 1) sectionId = "part1"; // PHẦN I - ProductIntroduction1 (index 1 vì Home là index 0 ngầm định)
          if (index === 2) sectionId = "product1";
          if (index === 3) sectionId = "product2";
          if (index === 4) sectionId = "product3";
          if (index === 5) sectionId = "part2"; // PHẦN II - ProductIntroduction2 (index 4)
          if (index === 6) sectionId = "product4";
          if (index === 7) sectionId = "product5";
          if (index === 8) sectionId = "product6";
          if (index === 9) sectionId = "product7";
          if (index === 10) sectionId = "part3"; // PHẦN III - ProductIntroduction3 (index 9)
          if (index === 11) sectionId = "usservice";
          if (index === 12) sectionId = "employee";
          if (index === 13) sectionId = "thankyou";
          return (
            <PageWrapper
              key={index}
              pageNumber={index + 2}
              id={sectionId}
              sectionId={sectionId}
              setActiveSection={memoizedSetActiveSection}
              className="page-wrapper"
              isExportingPDF={isExportingPDF}
            >
              {page}
            </PageWrapper>
          );
        })}
      </Suspense>
    </div>
  );
};

export default  React.memo(App);