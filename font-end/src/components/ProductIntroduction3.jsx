import React, { useState, useEffect } from "react";



const data = JSON.parse(localStorage.getItem("data"));
const products = data?.productsData;
const ProductIntroduction3 = ({
    productId,
    imgID = [],
}) => {
    const [imageData, setImageData] = useState([]);

    useEffect(() => {
        const product = products.find((item) => item.id === productId);
        if (product) {
            const imgData = product.img
                .filter((item) => imgID.includes(item.id))
                .map((item) => item.image_url);
            setImageData(imgData);
        }
    }, [productId, imgID]);

    return (
        <div id="12part3" className=" h-[100vh] select-none ">
            <div className=" md:flex">
                <div className="max-w-[100vw] max-h-[100vh] flex flex-col md:w-[80vw]">
                    <div className="w-full bg-blue-700 min-h-[30vh] "></div>
                    <div className="w-full  flex flex-col justify-center items-center h-[40vh] md:mr-20 md:w-[60vw] md:flex-row">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-2xl text-blue-700">PHẦN III</h1>
                            <p className="text-4xl font-bold text-blue-900">VỀ YOTECH</p>
                        </div>
                    </div>
                    <div className="w-full bg-blue-700 min-h-[30vh]"></div>
                </div>
                <div className="hidden md:relative md:top-[15vh] md:right-[10vw] md:block md:min-w-[20vw] md:h-[50vh] md:z-20">
                    <img src={imageData[0]} className=" md:min-w-[25vw] md:h-[80vh]"></img>
                </div>
            </div>

        </div>
    )
}

export default React.memo(ProductIntroduction3);