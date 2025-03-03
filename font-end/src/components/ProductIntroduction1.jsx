import React, { useState, useEffect } from "react";


const data = JSON.parse(localStorage.getItem("data"));
const products = data.productsData;

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
            console.log(productData);
            
            const imgData = product.img
                .filter((item) => imgID.includes(item.id))
                .map((item) => item.image_url);
            setImageData(imgData);
                
        }
    }, [productId, imgID]);
    
    return (
        <div className='flex flex-col w-screen h-screen'>
            <div className='w-screen h-full relative overflow-hidden'>
                <div className='md:w-1/2'>
                <img src={imageData[0]} className=" md:absolute md:-z-10 "></img>
                </div>
                <div className="grid grid-cols-2 grid-rows-3 gap-4 w-full h-full max-w-lg ml-auto">
                    <div className="hidden md:bg-blue-500 md:text-white md:flex md:items-center md:justify-center md:p-4"></div>
                    <div className="hidden md:bg-blue-500 md:text-white md:flex md:items-center md:justify-center p-4"></div>
                    <div className="bg-blue-800 text-white text-3xl  flex flex-col items-center min-w-full sm:h-full justify-center p-4 col-span-2 ">
                        <h1>Phần I</h1>
                        <p>Dự Án WEB/APP</p>
                    </div>
                    <div className="hidden md:bg-blue-500 md:text-white md:flex md:items-center md:justify-center md:p-4"></div>
                    <div className="hidden md:bg-blue-500 md:text-white md:flex md:items-center md:justify-center md:p-4"></div>
                </div>

            </div>
            <div className='w-screen h-10 mt-auto bg-blue-600'></div>
        </div>
    )
}

export default ProductIntroduction1
