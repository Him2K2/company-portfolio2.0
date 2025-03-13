import React, { useEffect, useState } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { AiOutlineGlobal } from "react-icons/ai";
import { IoLogoGameControllerA } from "react-icons/io";
import { FaBuildingUser } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { LuImageUp } from "react-icons/lu";
import { PiFilePdfDuotone } from "react-icons/pi";

function Header({ activeSection, setActiveSection }) {
  const [company, setCompany] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExport, setIsExport] = useState(false);

  const exportToPDF = () => {
    window.print();
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id); // Cập nhật active section khi click nút header
    }
  };

  const handleMobileClick = (id) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      setCompany(data.company);
    }
  }, []);

  return (
    <div className="w-screen flex h-15 bg-blue-700 p-5 text-white fixed justify-between items-center z-50 mb-auto md:h-15 lg:w-[80vw] select-none print-hidden">
      <a
        onClick={() => scrollToSection("home")}
        className="bg-blue-700 cursor-pointer hover:bg-blue-600 flex items-center justify-center z-10 w-20 h-15"
      >
        <img src={company?.logo_img_url} className="invert mix-blend-screen w-15 h-15" alt="Company Logo" />
      </a>

      <div>
        <ul className="hidden md:flex items-center gap-5">
          <li
            className={`p-3 hover:bg-blue-500 rounded-3xl cursor-pointer transition-all flex items-center ${activeSection === 'home' || activeSection === 'abouteus' ? 'bg-blue-500' : ''}`}
            onClick={() => scrollToSection("home")}
          >
            <IoHome className="mr-1 text-[2rem]" /> Home
          </li>
          <li
            className={`p-3 hover:bg-blue-500 rounded-3xl cursor-pointer transition-all flex items-center ${activeSection === 'part1' || activeSection === 'product1' || activeSection === 'product2' || activeSection === 'product3' ? 'bg-blue-500' : ''}`}
            onClick={() => scrollToSection("part1")}
          >
            <AiOutlineGlobal className="mr-1 text-[2rem]" /> Web/App
          </li>
          <li
            className={`p-3 hover:bg-blue-500 rounded-3xl cursor-pointer transition-all flex items-center ${activeSection === 'part2' || activeSection === 'product4' || activeSection === 'product5' || activeSection === 'product6' || activeSection === 'product7' ? 'bg-blue-500' : ''}`} // Highlight nút active
            onClick={() => scrollToSection("part2")}
          >
            <IoLogoGameControllerA className="mr-1 text-[2rem]" /> Game
          </li>
          <li
            className={`p-3 hover:bg-blue-500 rounded-3xl cursor-pointer transition-all flex items-center ${activeSection === 'part3' || activeSection === 'usservice' || activeSection === 'employee' || activeSection === 'thankyou' ? 'bg-blue-500' : ''}`} // Highlight nút active
            onClick={() => scrollToSection("part3")}
          >
            <FaBuildingUser className="mr-2 text-[2rem] " />About Us
          </li>
        </ul>
      </div>
      <div className="hidden md:block w-68"></div>
      {/* Mobile menu */}

      <div
        className={`absolute z-50 md:hidden top-16 left-0 w-full bg-blue-700 flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${isMenuOpen ? "opacity-90 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-5"
          }`}
        style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
      >
        <li className="p-3 hover:bg-blue-500 cursor-pointer transition-all" onClick={() => handleMobileClick("part1")}>PHẦN I</li>
        <li className="p-3 hover:bg-blue-500 cursor-pointer transition-all" onClick={() => handleMobileClick("part2")}>PHẦN II</li>
        <li className="p-3 hover:bg-blue-500 cursor-pointer transition-all" onClick={() => handleMobileClick("part3")}>PHẦN III</li>
      </div>
      <div
        className={`absolute z-50 rounded-2xl top-16 right-0 w-[7rem]   bg-blue-700 flex flex-col justify-center gap-1  text-[0.9rem] transform transition-transform ${isExport ? "opacity-90 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-5"
          }`}
      >
        <li className="p-1 hover:bg-blue-500 cursor-pointer transition-all rounded-2xl flex justify-start items-center " onClick={() => handleMobileClick("part1")}> ToImage <LuImageUp className="text-2xl ml-2" /></li>
        <li className="p-1 hover:bg-blue-500 cursor-pointer transition-all rounded-2xl flex justify-start items-center" onClick={exportToPDF}>ToPDF <PiFilePdfDuotone className="text-[1.8rem] ml-2"/></li>
      </div>
      <div className="p-4 cursor-pointer print-hidden flex items-center" onClick={() => setIsExport(prev => !prev)}>ExPort<RiLogoutBoxRFill className="text-white text-3xl" /> </div>
      <TiThMenuOutline
        className="text-white w-10 h-10 md:hidden cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
    </div>
  );
}

export default Header;