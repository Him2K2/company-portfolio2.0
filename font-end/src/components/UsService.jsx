import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faToolbox,
  faMobileAlt,
  faCode,
  faPalette,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";

const data = JSON.parse(localStorage.getItem("data"));
function Usservice({ companyId }) {
  const [services, setServices] = useState([]);

  useEffect(() => {

    const sv = data?.service?.filter((item) => item.company_id === companyId);
    if (sv?.length) {
      setServices(sv);
    }
  }, [companyId]);
  return (
    <div id="13our-service" className="w-full min-h-screen flex flex-col select-none">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full h-[25vh] flex justify-center items-center text-2xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text font-sans">
          DỊCH VỤ CỦA CHÚNG TÔI
        </div>
        <div className="flex relative justify-center items-center flex-wrap py-8">
          {services.slice(0, 5).map((item, index) => {
            const icons = [faToolbox, faPalette, faCode, faMobileAlt, faGamepad];
            return (
              <div
                key={item.id}
                className={`flex flex-col items-center p-4 w-60 h-60 ${index % 2 === 0 ?
                  'md:flex-col-reverse 2xl:border-black 2xl:border-b-3 2xl:pb-9 2xl:border-r-3 ' :
                  '2xl:border-black 2xl:border-t-3  2xl:pt-9 2xl:border-r-3'}`}
              >

                <div className="w-30 h-30 bg-blue-500 rounded-full flex justify-center items-center">
                  <FontAwesomeIcon icon={icons[index]} size="2x" color="#fff" />
                </div>
      
                <div className="mt-4 text-gray-800 font-sans text-center">{item?.service}</div>

              </div>
            );
          })}
        </div>

      </div>

      {/* <div className="w-screen h-8 !important bg-blue-600 mt-auto relative z-10">
        <button className="px-10 py-1 text-white bg-stone-800 absolute -top-3 left-10">Page No:18</button>
      </div> */}
    </div>
  );

}
export default React.memo(Usservice);