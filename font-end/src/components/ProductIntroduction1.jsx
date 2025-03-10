import React, { useState, useEffect } from "react";

const data = JSON.parse(localStorage.getItem("data"));
const products = data?.productsData;

const ProductIntroduction1 = ({
    productId,
    imgID = [],
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
    console.log(productData);
    return (
        <div className="flex overflow-hidden flex-col max-w-screen max-h-screen select-none">
            <div className="w-full  max-h-[calc(100vh-2rem)] md:flex md:w-full md:h-full">
                <div className="hidden md:flex md:max-w-[58%] md:mx-4 md:mr-auto" >
                    <img src={imageData[0]} className="w-full h-full" ></img>
                </div>
                <div className="grid grid-cols-2 grid-rows-3 gap-4 w-full min-h-screen md:max-w-[40%]  md:h-full md:min-h-screen">
                    <div className="relative text-white flex items-center justify-center md:h-full md:w-full p-4">
                        <img src={imageData[1]} className="absolute w-full h-full object-cover"></img>
                    </div>
                    <div className="relative text-white flex items-center justify-center md:h-full md:w-full p-4">
                        <img src={imageData[2]} className="absolute w-full h-full object-cover"></img>
                    </div>
                    <div className=" bg-blue-800 text-white text-3xl  h-full w-full flex flex-col items-center min-w-full justify-center p-4 col-span-2 ">
                        <h1>Phần I</h1>
                        <p className="font-medium text-4xl">Dự Án WEB/APP</p>
                    </div>
                    <div className=" relative text-white flex items-center justify-center md:h-full md:w-full p-4">
                        <img src={imageData[3]} className="absolute w-full h-full object-cover"></img>
                    </div>
                    <div className="relative  text-white flex items-center justify-center md:h-full md:w-full p-4">
                        <img src={imageData[4]} className="absolute w-full h-full object-cover"></img>
                    </div>
                </div>
            </div>
          
        </div>
    )
}

export default ProductIntroduction1