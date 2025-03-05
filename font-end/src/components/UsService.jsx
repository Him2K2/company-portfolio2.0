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
export default function UsService({ companyId }) {
  const [services, setServices] = useState([]);

  useEffect(() => {

    const sv = data?.service?.filter((item) => item.company_id === companyId);
    if (sv?.length) {
      setServices(sv);
    }
  }, [companyId]);
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full h-[25vh] flex justify-center items-center text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text font-sans">
          DỊCH VỤ CỦA CHÚNG TÔI
        </div>
        <div className="flex justify-center items-center flex-wrap gap-10 px-4 py-8">
          {services.slice(0, 5).map((item, index) => {
            const icons = [faToolbox, faPalette, faCode, faMobileAlt, faGamepad];
            return (
              <div
                key={item.id}
                className={`flex flex-col items-center ${index % 2 === 0 ? 'mt-10' : 'mb-5'}`}
              >
                <div className="w-32 h-32 bg-blue-500 rounded-full flex justify-center items-center">
                  <FontAwesomeIcon icon={icons[index]} size="2x" color="#fff" />
                </div>
                <div className="mt-4 text-gray-800 font-sans text-center">{item?.service}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-screen h-8 !important bg-blue-600 mt-auto relative z-10">
        <button className="px-10 py-1 text-white bg-stone-800 absolute -top-3 left-10">Page No:18</button>
      </div>
    </div>
  );

}
