import React, { useEffect, useState, lazy, Suspense } from "react";
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

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem("data");

      if (storedData) {
        console.log("Dữ liệu từ Local Storage:", JSON.parse(storedData));
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
  }, []);

  if (!dataLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RiLoader4Line className="text-6xl text-blue-700 animate-spin" />
      </div>
    );
  }

  const homePage = <Home />;

  const pages = [
    <AbouteUs />,
    <ProductIntroduction1 productId={7} imgID={[10, 11, 12, 13, 14]} />,
    <Product1 productId={1} imgID={[1]} />,
    <ProductIntroduction2 productId={3} imgID={[4, 5, 6, 3, 7]} />,
    <Product4 productId={4} imgID={[15, 16, 17, 18]} />,
    <Product2 productId={2} imgID={[19, 20, 21, 22, 23]} />,
    <ProductIntroduction3 productId={7} imgID={[24]} />,
    <UsService companyId={1} />,
    <Employees />,
    <ThankYou />,
  ];

  return (
    <div className="flex flex-col max-w-screen items-center">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
        <RiLoader4Line className="text-6xl text-blue-600 animate-spin" />
      </div>}>
      {/* <Header></Header> */}
      <PageWrapper>
      {homePage}
    </PageWrapper>

    {pages.map((page, index) => (
      <PageWrapper key={index} pageNumber={index + 2}>
        {page}
      </PageWrapper>
    ))}
  </Suspense>
    </div>
  );
};

export default App;
