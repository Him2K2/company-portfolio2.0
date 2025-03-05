import React from "react";
import Data from "./Data";
import Home from "./components/Home";
import AbouteUs from "./components/AbouteUs";
import ProductIntroduction1 from "./components/ProductIntroduction1";
import Product1 from "./components/Product1";
import ProductIntroduction2 from "./components/ProductIntroduction2";
import Product4 from "./components/Product4";
import Product2 from "./components/Product2";
import ProductIntroduction3 from "./components/ProductIntroduction3";
import UsService from "./components/UsService";
import Employees from "./components/Employee";
import ThankYou from "./components/ThankYou";

const App = () => {
  return (
    <div className="flex flex-col">
    <Data></Data>
    <Home></Home>
    <AbouteUs></AbouteUs>
    <ProductIntroduction1 productId={7} imgID={[10,11,12,13,14]}></ProductIntroduction1>
    <Product1 productId={1} imgID={[1]}></Product1>
    <ProductIntroduction2 productId={3} imgID ={[4,5,6,3,7]} ></ProductIntroduction2>
    <Product4 productId={4} imgID={[15,16,17,18]}></Product4>
    <Product2 productId={2} imgID={[19,20,21,22,23]}></Product2>
    <ProductIntroduction3 productId={7} imgID={[24]}></ProductIntroduction3>
    <UsService companyId={1}></UsService>
    <Employees></Employees>
    <ThankYou></ThankYou>
    </div>
  );
};

export default App;