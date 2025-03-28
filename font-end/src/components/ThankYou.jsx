import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; 

import { MdOutlineMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";

const data = JSON.parse(localStorage.getItem("data"));

 function Thankyou() {
    const [company, setCompany] = useState(null);
    const {t} = useTranslation();

    useEffect(() => {
        const company = data?.company;
        if (company) {
            setCompany(company);
        }
    }, []);

    return (
        <div id="15thank-you" className="max-w-screen h-screen flex flex-col items-center select-none">
            <div className="max-w-screen h-[25vh]"></div>
            <div className="flex flex-col justify-center items-center w-full h-[40vh] overflow-hidden">
                <div className="flex space-x-4 mb-4">
                    <div className="w-4 h-4 bg-blue-900"></div>
                    <div className="w-4 h-4 bg-blue-500"></div>
                    <div className="w-4 h-4 bg-blue-300"></div>
                </div>
                <div className="flex relative w-full justify-center">
                    <div className="w-60 h-60 bg-gray-200  absolute bottom-10 right-20 2xl:absoltule 2xl:bottom-20 2xl:right-10 hidden md:block"></div>
                    <div className="w-[60vw] h-[30vh] bg-blue-600 text-white flex justify-center items-center text-2xl md:text-5xl lg:text-8xl font-bold relative z-10 ">
                        {t("thankyou")}
                     </div>
                    <div className="w-60 h-60 bg-gray-200 absolute bottom-10 left-20 2xl:absoltule 2xl:bottom-20 2xl:right-10 hidden md:block"></div>
                </div>
            </div>
            <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center mt-20 px-10 space-y-4 md:space-y-0">
                <a href={`mailto:${company?.email}`} target="_blank" className="flex items-center text-lg">
                    <MdOutlineMailOutline className="mr-2 text-red-500" /> {company?.email}
                </a>
                <a href={`tel:${company?.phone}`} className="flex items-center text-lg">
                    <IoCallOutline className="mr-2 text-green-500" /> {company?.phone}
                </a>
                <a href={company?.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-lg">
                    <FaLink className="mr-2 text-blue-500" /> {company?.website}
                </a>

            </div>
        </div>
    );
}
export default React.memo(Thankyou);