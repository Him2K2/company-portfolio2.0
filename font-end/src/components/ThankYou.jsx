import React, { useState, useEffect } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";

const data = JSON.parse(localStorage.getItem("data"));

export default function ThankYou() {
    const [company, setCompany] = useState(null);

    useEffect(() => {
        const company = data?.company;
        if (company) {
            setCompany(company);
        }
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col items-center">
            <div className="w-screen h-[22vh]"></div>
            <div className="flex flex-col justify-center items-center h-[40vh] overflow-hidden">
                <div className="flex space-x-4 mb-4">
                    <div className="w-4 h-4 bg-blue-900"></div>
                    <div className="w-4 h-4 bg-blue-500"></div>
                    <div className="w-4 h-4 bg-blue-300"></div>
                </div>
                <div className="flex relative w-[100vw] justify-center">
                    <div className="w-60 h-60 bg-gray-200  absolute bottom-10 right-65 hidden md:block"></div>
                    <div className="w-[60vw] h-[30vh] bg-blue-600 text-white flex justify-center items-center text-4xl font-bold relative z-10">
                        Thank You
                    </div>
                    <div className="w-60 h-60 bg-gray-200 absolute bottom-10 left-65 hidden md:block"></div>
                </div>
            </div>
            <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center mt-20 px-10 space-y-4 md:space-y-0">
                <div className="flex items-center text-lg"><MdOutlineMailOutline className="mr-2 text-red-500" /> {company?.email}</div>
                <div className="flex items-center text-lg"><IoCallOutline className="mr-2 text-green-500" /> {company?.phone}</div>
                <div className="flex items-center text-lg"><FaLink className="mr-2 text-blue-500" /> {company?.website}</div>
            </div>
            <div className="w-screen h-8 !important bg-blue-600 mt-auto relative z-10">
                <button className="px-10 py-1 text-white bg-stone-800 absolute -top-3 left-10">Page No:18</button>
            </div>
        </div>
    );
}
