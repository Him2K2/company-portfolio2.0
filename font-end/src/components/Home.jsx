import React, { useEffect, useState } from "react";

const Home = () => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      setCompany(data.company);
    }
  }, []);

  return (
    <div id="01home" className="relative w-full h-[calc(100vh-2rem)]  flex flex-col flex-1 justify-between items-center md:flex-row select-none " >
      <img src={company?.background_img_url} className="absolute inset-0 w-full h-full"></img>
      <div className="absolute inset-0 w-full h-full z-10 bg-black opacity-60 flex items-center"></div>
      <div className="absolute bg-gradient-to-r from-blue-800 to-sky-600  flex items-center justify-center z-10 w-110 h-70">
        <img src={company?.logo_img_url} className="invert mix-blend-screen w-80 h-70" />
      </div>

      <div className="absolute mt-100 z-10 flex md:mt-0 md:ml-120 ">
        <div className="w-7 h-70 bg-white "></div>
        <div className="flex flex-col  ">
          <div className="w-50 h-7 bg-white "></div>
          <div className="text-blue-500 text-6xl font-bold mt-20 ml-8  font-montserrat">{company?.name}</div>
          <div className="text-white m-3 ml-6 font-sans text-xs flex-wrap">{company?.slogan}</div>
          <div className="w-50 h-7 bg-white mt-auto"></div>
        </div>
      </div>

    </div>
  );
};

export default React.memo(Home);