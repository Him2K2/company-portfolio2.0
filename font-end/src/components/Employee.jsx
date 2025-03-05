import React, { useEffect, useState } from "react";
import img from "../assets/img/error.png"
import { FaFacebookF, FaTwitter, FaDribbble, FaGithub } from "react-icons/fa";

const data = JSON.parse(localStorage.getItem("data"));

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const el = data?.portfolioEmployees || [];
    setEmployees(el);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="flex justify-center items-center w-full h-[30vh] text-blue-600 text-5xl font-bold">
        Thành Viên Của Chúng Tôi
      </div>
      <div className="flex flex-wrap justify-center gap-6 p-4">
        {employees.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white rounded-xl shadow-lg w-64 h-96 p-4 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <img
              className="w-56 h-56 bg-blue-200 rounded-xl object-cover"
              src={item.avatar || img}
              alt={item.employee_name}
            />
            <div className="mt-4 text-2xl font-bold text-blue-600">
              {item.employee_name}
            </div>
            <div className="text-lg text-gray-700">{item.position}</div>
            <div className="text-sm text-gray-500">
              {item.experience} năm kinh nghiệm
            </div>
            <div className="flex gap-4 mt-3 text-gray-600">
              <FaFacebookF className="cursor-pointer hover:text-blue-600" />
              <FaTwitter className="cursor-pointer hover:text-blue-400" />
              <FaDribbble className="cursor-pointer hover:text-pink-500" />
              <FaGithub className="cursor-pointer hover:text-gray-900" />
            </div>
          </div>
        ))}
      </div>
      <div className="w-screen h-8 !important bg-blue-600 mt-auto relative z-10">
                <button className="px-10 py-1 text-white bg-stone-800 absolute -top-3 left-10">Page No:18</button>
            </div>
    </div>
  );
}
