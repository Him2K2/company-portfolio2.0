import React, { useState, useEffect } from "react";



const data = JSON.parse(localStorage.getItem("data"));
const products = data?.productsData;
const ProductIntroduction2 = ({
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
        <div id="part2" className="flex overflow-hidden flex-col max-w-screen max-h-screen select-none px-4">
            <div className="w-full  max-h-[calc(100vh-2rem)] md:flex md:w-full md:h-full">
                <div className="grid grid-cols-2 grid-rows-3 gap-4 w-full min-h-screen md:max-w-[40%]  md:h-full md:min-h-screen">
                    <div className="relative bg-blue-500 text-white flex items-center justify-center md:h-full md:w-full p-4">
                        <img src={imageData[4]} className="absolute w-full h-full object-cover"></img>
                    </div>
                    <div className="relative bg-blue-500 text-white flex items-center justify-center md:h-full md:w-full p-4">
                        <img src={imageData[0]} className="absolute w-full h-full object-cover"></img>
                    </div>
                    <div className=" bg-blue-800 text-white text-3xl  h-full w-full flex flex-col items-center min-w-full justify-center p-4 col-span-2 ">
                        <h1>Phần II</h1>
                        <p className="font-medium text-4xl">DỰ ÁN GAME</p>
                    </div>
                    <div className=" relative bg-blue-500 text-white flex items-center justify-center md:h-full md:w-full p-4">
                        <img src={imageData[3]} className="absolute w-full h-full object-cover"></img>
                    </div>
                    <div className="relative bg-blue-500 text-white flex items-center justify-center md:h-full md:w-full p-4">
                        <img src={imageData[2]} className="absolute w-full h-full object-cover"></img>
                    </div>
                </div>
                <div className="hidden md:flex md:min-w-[60%] md:ml-4" >
                    <img src={imageData[1]} className="w-full h-full" ></img>
                </div>
            </div>
            {/* <div className="w-screen h-8 !important bg-blue-700 mt-auto relative z-10">
                <button className="px-10 py-1 text-white bg-stone-800 absolute -top-3 left-10">Page No:11</button>
            </div> */}
        </div>
    )
}

export default React.memo(ProductIntroduction2);
