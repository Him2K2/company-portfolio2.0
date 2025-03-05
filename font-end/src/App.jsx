import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";

const Data = lazy(() => import("./Data"));
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
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="flex flex-col">
      <Suspense fallback={<div>Đang tải component...</div>}>
        <Data />
        <Home />
        <AbouteUs />
        <ProductIntroduction1 productId={7} imgID={[10, 11, 12, 13, 14]} />
        <Product1 productId={1} imgID={[1]} />
        <ProductIntroduction2 productId={3} imgID={[4, 5, 6, 3, 7]} />
        <Product4 productId={4} imgID={[15, 16, 17, 18]} />
        <Product2 productId={2} imgID={[19, 20, 21, 22, 23]} />
        <ProductIntroduction3 productId={7} imgID={[24]} />
        <UsService companyId={1} />
        <Employees />
        <ThankYou />
      </Suspense>
    </div>
  );
};

export default App;