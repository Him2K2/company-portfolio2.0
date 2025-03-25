import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; 

const AboutUs = () => {
    const [company, setCompany] = useState(null);

     const { t } = useTranslation();

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
        <div id="aboutus" className='flex flex-col w-full h-full select-none overflow-hidden'>
            <div className='flex flex-col w-full md:mt-15 md:flex-row md:justify-center md:items-center md:h-full'>
                <div className="flex relative justify-center md:justify-start md:items-center md:w-2/5">
                    <div className="hidden md:absolute md:block  md:-top-30 md:left-0 md:bg-blue-600 md:w-50 md:h-50 lg:w-80 lg:h-80"></div>
                    <div className="relative bottom-10 w-full max-w-xs md:ml-20 md:w-full md:h-100">
                        <img
                            src={company?.abouteImg}
                            className="w-full h-full"
                        />
                        <div className="absolute right-5 -bottom-5 bg-gradient-to-r from-blue-800 to-sky-600 flex items-center justify-center z-10 w-20 h-20">
                            <img
                                src={company?.logo_img_url}
                                className="invert mix-blend-screen w-20 h-20"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center mt-5 md:m-5 md:items-start md:space-y-6 md:w-3/5">
                    <h1 className="text-blue-500 text-4xl md:text-5xl font-bold">{t("aboute")}</h1>
                    <div className="flex w-20 h-5 mt-1">
                        <div className="bg-blue-950 w-5 h-5 ml-1" ></div>
                        <div className="bg-blue-500 w-5 h-5 ml-1" ></div>
                        <div className="bg-blue-200 w-5 h-5 ml-1" ></div>
                    </div>
                    <div className="mt-4 mb-6 w-full text-justify p-1">
                        {company?.info}
                    </div>
                    <div className="grid grid-cols-[auto_1fr] gap-4 w-full max-w-lg mb-8 p-2">
                        <div className="bg-blue-500 text-white flex items-center justify-center w-12 h-12 text-xl">1</div>
                        <div className="rounded-md">{company?.description[0]}</div>
                        <div className="bg-blue-800 text-white flex items-center justify-center w-12 h-12 text-xl">2</div>
                        <div className="rounded-md">{company?.description[1]}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(AboutUs);
