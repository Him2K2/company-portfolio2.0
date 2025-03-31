import React, { useState, useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import hinh1 from "../assets/img/product2-2.png";
import hinh2 from "../assets/img/product2-3.png";
import hinh3 from "../assets/img/product4-3.png";

const data = JSON.parse(localStorage.getItem("data"));
const products = data?.productsData;
const Product2 = ({
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
        <div id={idPage} className="min-h-screen md:h-full select-none">
            <div className="flex flex-col-reverse w-full h-full justify-center md:flex-row md:h-full">
                <div className="hidden md:block md:w-22 md:min-h-screen md:mr-auto">
                    <img src={hinh1} className="md:block md:max-w-[5vw]  md:min-w-[5vw]  md:h-[50vh]"></img>
                    <img src={hinh2} className="md:block md:max-w-[5vw]  md:min-w-[5vw]  md:h-[55vh]"></img>
                </div>
                <div className="md:w-[35vw] md:flex md:justify-center">
                    <img src={imageData[0]} className="w-full md:w-full object-contain md:mr-auto"></img>
                </div>
                <div className="flex flex-col justify-center items-center md:ml-auto md:w-[55vw]">
                    <img src={imageData[1]} className="w-40 md:w-20  object-contain md:mt-20 md:mr-auto "></img>
                    <div className="text-4xl md:text-6xl text-blue-600 font-bold md:flex md:justify-start md:items-center md:mr-auto md:m-10">{productData?.name}</div>
                    <img src={hinh3} className="w-50 m-5 md:mr-auto md:w-40 md:h-8 md:m-5 md:ml-10"></img>
                    <div className="flex w-[91%] items-center m-5 md:m-5 md:ml-20">

                        <div><AiFillCheckCircle className=" text-3xl mr-5 h-full text-blue-600" /></div>
                        <div className="text-xl p-1">{productData?.description}</div>
                    </div>
                    <div className="hidden md:block md:mr-auto">
                        <button className="px-8 py-2 bg-blue-500 text-white rounded-lg mx-10">Frontend</button>
                        <button className="px-8 py-2 bg-blue-800  text-white rounded-lg mx-10">Backend</button>
                    </div>
                    <div className="hidden md:block md:mr-auto md:m-10 md:font-medium ">{productData?.manufacture_year}</div>
                    <div className="hidden md:block md:bg-blue-600 text-2xl ml-auto md:w-[20vw] md:p-2 md: text-white md:font-bold md:pl-5">Dự Án Game</div>

                </div>
            </div>

        </div>
    )
}

export default React.memo(Product2);