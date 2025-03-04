import React, { useState, useEffect } from "react";



const data = JSON.parse(localStorage.getItem("data"));
const products = data.productsData;
const ProductIntroduction3 = ({
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
        <div className="w-[100vw] h-[100vh]">
            <div className=" md:flex">
                <div className="max-w-[100vw] max-h-[100vh] flex flex-col md:w-[80vw]">
                    <div className="w-full bg-blue-700 min-h-[30vh] "></div>
                    <div className="w-full  flex flex-col justify-center items-center h-[40vh] md:mr-20 md:w-[60vw] md:flex-row">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-2xl text-blue-700">Phần III</h1>
                            <p className="text-4xl font-bold text-blue-900">Về YOTECH</p>
                        </div>
                    </div>
                    <div className="w-full bg-blue-700 min-h-[30vh]"></div>
                </div>
                <div className="hidden md:relative md:top-[15vh] md:right-[10vw] md:block md:min-w-[20vw] md:h-[50vh] md:z-20">
                    <img src={imageData[0]} className=" md:min-w-[25vw] md:h-[80vh]"></img>
                </div>
            </div>
            <div className="w-screen h-8 !important bg-blue-600 mt-auto relative z-10">
                <button className="px-10 py-1 text-white bg-stone-800 absolute -top-3 left-10">Page No:18</button>
            </div>

        </div>
    )
}

export default ProductIntroduction3