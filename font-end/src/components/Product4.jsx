import React, { useState, useEffect } from "react";


const data = JSON.parse(localStorage.getItem("data"));
const products = data?.productsData;

const Product4 = ({
  productId,
  imgID = [],
  idPage,
}) => {
  const [productData, setProductData] = useState(null);
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const product = products.find((item) => item.id === productId);
    if (product) {

      setProductData(product);
      const imgData = product.img
        .filter((item) => imgID.includes(item.id))
        .map((item) => item.image_url);
      setImageData(imgData);

    }
  }, [productId, imgID]);
  return (
    <div id={idPage} className='flex flex-col  min-h-screen justify-center items-center select-none  md:overflow-hidden'>
      <div className='w-screen max-h-[calc(100vh-90vh)] md:min-h-20'></div>
      <div className='w-screen max-h-[calc(100vh-65vh)] flex flex-col items-center justify-center'>
        <img src={imageData[0]} className="w-30 md:w-12"></img>
        <div className="flex justify-center">
          <img src={imageData[2]} className="w-20 h-5 mt-auto md:w-18 md:h-4"></img>
          <div className="text-blue-600 text-6xl font-bold mx-7 md:text-2xl md:mt-auto md:relative md:top-1.5">{productData?.name}</div>
          <img src={imageData[3]} className="w-20 h-5 mt-auto md:w-18 md:h-4"></img>
        </div>
        <div className="mt-5">{productData?.description}</div>
        <div className="flex m-5 items-center">
          <button className="bg-blue-600 hover:bg-blue-950 selection:cursor-pointer select-all px-7 py-1 text-white text-2xl rounded-2xl mr-10 md:text-xl">Frontend</button>
          <div className="ml-10 font-medium">{productData?.manufacture_year}</div>
        </div>
      </div>
      <div className='mt-10 md:relative md:w-screen overflow-hidden md:max-h-[calc(100vh-43vh)] md:z-10 md:overflow-hidden'>
        <img src={imageData[1]} className="max-w-full max-h-full object-contain md:z-30 "></img>
      </div>
     
    </div>
  )
}

export default React.memo(Product4);
