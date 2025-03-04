import React, { useState, useEffect } from "react";


const data = JSON.parse(localStorage.getItem("data"));
const products = data.productsData;
const Product1 = ({
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

    return (
        <div className="w-screen h-screen flex overflow-hidden flex-col mt-5">
            <div className="flex flex-col w-full h-[calc(100vh-2rem)] md:flex-row md:justify-center md:items-center mt-30">
            <div className=" md:w-40 md:h-40 bg-blue-700 z-10 relative -top-95 -left-10"></div>
                <div className=" h-1/2 mt-10 mx-10 justify-center md:space-y-10 md:h-full md:w-2/3 md:m-20">
                    <div className="font-medium text-blue-600 text-5xl mb-4 md:mb-10">{productData?.name}</div>
                    <div className="flex m-5 md:flex md:items-center">
                        <div className="flex w-20 h-5 mt-1 md:m-10">
                            <div className="bg-blue-950 w-5 h-5 ml-1" ></div>
                            <div className="bg-blue-500 w-5 h-5 ml-1" ></div>
                            <div className="bg-blue-200 w-5 h-5 ml-1" ></div>
                        </div>
                        <div className="text-blue-500 align-text-bottom">
                            {productData?.url_web}
                        </div>
                    </div>
                    <div className="mb-10">{productData?.description}</div>
                    <div className="flex space-x-5 justify-center mb-10">
                        <button className="px-5 py-2 bg-blue-500 text-white rounded-lg">Design</button>
                        <button className="px-5 py-2 bg-blue-500 text-white rounded-lg">BackEnd</button>
                        <button className="px-5 py-2 bg-blue-500 text-white rounded-lg">FrondEnd</button>
                    </div>
                    <div className="mt-auto">{productData?.manufacture_year}</div>
                </div>
                <div className=" w-full h-50 flex  justify-center items-center md:w-1/3 md:h-full">
                    <img src={imageData[0]} className="w-25 h-45 md:w-60 md:h-110">
                    </img>
                </div>


            </div>

            <div className="w-screen h-8 !important bg-blue-700 mt-auto relative z-10">
                <button className="px-10 py-1 text-white bg-black opacity-50 absolute -top-3 left-10">Page No:4</button>
            </div>
        </div>
    )
}

export default Product1
