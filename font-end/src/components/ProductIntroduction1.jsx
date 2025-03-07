import React, { useState, useEffect } from "react";

const data = JSON.parse(localStorage.getItem("data"));
const products = data?.productsData;

const ProductIntroduction1 = ({
    productId,
    imgID = [],
}) => {
    // ... giữ nguyên phần state và useEffect
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
        <div className="flex flex-col h-full select-none">
            <div className="w-full h-full md:flex md:w-full">
                <div className="hidden md:flex md:max-w-[58%] md:mx-4 md:mr-auto">
                    <img src={imageData[0]} className="w-full h-full object-cover" />
                </div>
                <div className="grid grid-cols-2 grid-rows-[auto_auto_1fr] gap-4 w-full h-full md:max-w-[40%]">

                    <div className="relative aspect-square">
                        <img src={imageData[1]} className="absolute w-full h-full object-cover" />
                    </div>
                    <div className="relative aspect-square">
                        <img src={imageData[2]} className="absolute w-full h-full object-cover" />
                    </div>
                    <div className="bg-blue-800 text-white text-3xl flex flex-col items-center justify-center p-4 col-span-2">
                        <h1>Phần I</h1>
                        <p className="font-medium text-4xl">Dự Án WEB/APP</p>
                    </div>
                    <div className="relative aspect-square">
                        <img src={imageData[3]} className="absolute w-full h-full object-cover" />
                    </div>
                    <div className="relative aspect-square">
                        <img src={imageData[4]} className="absolute w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductIntroduction1
