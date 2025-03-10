import React, { useEffect, useState } from "react";
import { TiThMenuOutline } from "react-icons/ti";

function Header() {
  const [company, setCompany] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToPositionPart1 = () => {
    const viewportHeight = window.innerHeight; 
    window.scrollTo({
      top: viewportHeight * 2,
      behavior: "smooth",
    });
  };
  const scrollToPositionHome = () => {
    const viewportHeight = window.innerHeight; 
    window.scrollTo({
      top: viewportHeight * 0,
      behavior: "smooth",
    });
  };
  const scrollToPositionPart2 = () => {
    const viewportHeight = window.innerHeight; 
    window.scrollTo({
      top: viewportHeight * 4,
      behavior: "smooth",
    });
  };
  const scrollToPositionPart3 = () => {
    const viewportHeight = window.innerHeight; // Chiều cao viewport
    window.scrollTo({
      top: viewportHeight * 7.2,
      behavior: "smooth",
    });
  };
  const clickMobile1 = ()=>{
    scrollToPositionPart1(),
    setIsMenuOpen(!isMenuOpen);
  }
  const clickMobile2 = ()=>{
    scrollToPositionPart2(),
    setIsMenuOpen(!isMenuOpen);

  }
   const clickMobile3 = ()=>{
    scrollToPositionPart3(),
    setIsMenuOpen(!isMenuOpen);
  }
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      setCompany(data.company);
    }
  }, []);

  return (
    <div className="w-screen flex h-15 bg-blue-700 p-5 text-white fixed justify-between items-center z-50 mb-auto md:h-15 lg:w-[80vw] select-none">
      <a onClick={scrollToPositionHome} className="bg-blue-700 cursor-pointer hover:bg-blue-600 flex items-center justify-center z-10 w-20 h-15">
        <img src={company?.logo_img_url} className="invert mix-blend-screen w-15 h-15" alt="Company Logo" />
      </a>

      <div>
        <TiThMenuOutline 
          className="text-white w-10 h-10 md:hidden cursor-pointer" 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
        />
        <ul className="hidden md:flex items-center gap-12">
          <li className="p-3 hover:bg-blue-500 cursor-pointer transition-all" onClick={scrollToPositionPart1 }>PHẦN I</li>
          <li className="p-3 hover:bg-blue-500 cursor-pointer transition-all" onClick={scrollToPositionPart2}>PHẦN II</li>
          <li className="p-3 hover:bg-blue-500 cursor-pointer transition-all" onClick={scrollToPositionPart3}>PHẦN III</li>
        </ul>
      </div>

      <div
        className={`absolute z-50 md:hidden top-16 left-0 w-full bg-blue-700 flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${
          isMenuOpen ? "opacity-90  pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-5"
        }`}
        style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
      >
        <li className="p-3 hover:bg-blue-500 cursor-pointer transition-all" onClick={clickMobile1}>PHẦN I</li>
        <li className="p-3 hover:bg-blue-500 cursor-pointer transition-all" onClick={clickMobile2}>PHẦN II</li>
        <li className="p-3 hover:bg-blue-500 cursor-pointer transition-all" onClick={clickMobile3}>PHẦN III</li>
      </div>

      <div className="p-4">ToPDF</div>
    </div>
  );
}

export default Header;
