import React, { useEffect, useState } from "react";

const AbouteUs = () => {
    const [company, setCompany] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("data");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (parsedData?.company) {
                const descriptionArray = JSON.parse(parsedData.company.description);
                setCompany({ ...parsedData.company, description: descriptionArray });
            }
        }
    }, []);
    return (
        <div className='flex flex-col h-screen w-screen md:flex md:flex-row md:justify-center md:items-center'>
            <div className=" flex justify-center md:m-5 md:items-center md:w-2/5">

                <div className="none md:relative md:-top-30 md:left-30 md:bg-blue-600 md:w-50 md:h-50"></div>
                <div className="relative md:w-70 md:h-80 ">
                    <img src={company?.background_img_url} className="w-60 h-80 border-stone-500 border-2"></img>
                    <div className="absolute right-5 -bottom-5 bg-gradient-to-r from-blue-800 to-sky-600  flex items-center justify-center z-10 w-20 h-20">
                        <img src={company?.logo_img_url} className="invert mix-blend-screen w-20 h-20" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-5 md:m-5 md:flex md:justify-start md:items-start md:space-y-6 md:w-3/5">
                <h1 className="text-blue-600 text-4xl font-medium ">Về Chúng Tôi</h1>
                <div className="flex w-20 h-5 mt-1">
                    <div className="bg-blue-950 w-5 h-5 ml-1" ></div>
                    <div className="bg-blue-500 w-5 h-5 ml-1" ></div>
                    <div className="bg-blue-200 w-5 h-5 ml-1" ></div>
                </div>
                <div className="m-5 ml-0">
                    {company?.info}
                </div>
                <div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-4 w-full max-w-lg m-1">
                    <div className="bg-blue-500 text-white flex items-center justify-center w-12 h-12 text-xl ">1</div>
                    <div className="bg-gray-100 p-4 rounded-md ">{company?.description[0]}</div>
                    <div className="bg-blue-500 text-white flex items-center justify-center w-12 h-12 text-xl ">2</div>
                    <div className="bg-gray-100 p-4 rounded-md">{company?.description[1]}</div>
                </div>

            </div>

        </div>
    )
}

export default AbouteUs
