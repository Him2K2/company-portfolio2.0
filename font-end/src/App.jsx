import React from "react";
import Data from "./Data";
import Home from "./components/Home";
import UsAboute from "./components/UsAboute";
import ProductIntroduction1 from "./components/ProductIntroduction1";
import Product1 from "./components/Product1";

const App = () => {
  return (
    <div className="flex flex-col">
    <Data></Data>
    <Home></Home>
    <UsAboute></UsAboute>
    {/* <ProductIntroduction1 productId={1} imgID={[2]}></ProductIntroduction1> */}
    <Product1 productId={1} imgID={[1]}></Product1>

    </div>
  );
};

export default App;