import React, { useEffect, useState } from "react";
import domtoimage from "dom-to-image";
import { jsPDF } from "jspdf"; 
import JSZip from "jszip";
import { saveAs } from "file-saver";

//icon
import { TiThMenuOutline } from "react-icons/ti";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { AiOutlineGlobal, AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoLogoGameControllerA } from "react-icons/io";
import { FaBuildingUser } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { LuImageUp } from "react-icons/lu";
import { PiFilePdfDuotone } from "react-icons/pi";

function Header({ activeSection, setActiveSection }) {
  const [company, setCompany] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExportMenu, setIsExportMenu] = useState(false);
  const [exportTimeout, setExportTimeout] = useState(null);
  const [isExporting, setIsExporting] = useState(false); // state cho loading export

  const handleExportHover = () => {
    if (exportTimeout) {
      clearTimeout(exportTimeout); 
    }
    setIsExportMenu(true);
  };

  const handleExportLeave = () => {
    const timeout = setTimeout(() => {
      setIsExportMenu(false);
    }, 300); 
    setExportTimeout(timeout);
  };

  const exportToPDF = async () => {
    setIsExportMenu(false);
    setIsExporting(true);
    
    const sectionIds = [
      "01home",
      "02abouteus",
      "03part1",
      "04product1",
      "05product2",
      "06product3",
      "07part2",
      "08product4",
      "09product5",
      "10product6",
      "11product7",
      "12part3",
      "13usservice",
      "14employee",
      "15thankyou"
    ];
  
    // Tạo PDF với định dạng A4 nằm ngang
    const pdf = new jsPDF("l", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    let isFirstPage = true;
  
    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (!element) continue;
  
      try {
        const dataUrl = await domtoimage.toPng(element, {
          quality: 1,
          bgcolor: "#ffffff",
          skipCrossOrigin: true
        });
  
        // Tạo hình ảnh để lấy kích thước gốc
        const img = new Image();
        img.src = dataUrl;
        await new Promise((resolve) => (img.onload = resolve));
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;
  
        // Tính tỷ lệ để scale hình vừa khít với tờ A4 landscape
        const scale = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const newWidth = imgWidth * scale;
        const newHeight = imgHeight * scale;
  
        // Tính vị trí căn giữa hình ảnh
        const x = (pdfWidth - newWidth) / 2;
        const y = (pdfHeight - newHeight) / 2;
  
        if (!isFirstPage) {
          pdf.addPage();
        }
        pdf.addImage(dataUrl, "PNG", x, y, newWidth, newHeight);
        isFirstPage = false;
      } catch (error) {
        console.error(`Lỗi khi chụp ${id}:`, error);
      }
    }
  
    // Lưu file PDF
    pdf.save("portfolio.pdf");
    setIsExporting(false);
  };
  
  
  const handleExportToImage = async () => {
    setIsExportMenu(false);
    setIsExporting(true);
    const sectionIds = [
      "01home",
      "02abouteus",
      "03part1",
      "04product1",
      "05product2",
      "06product3",
      "07part2",
      "08product4",
      "09product5",
      "10product6",
      "11product7",
      "12part3",
      "13usservice",
      "14employee",
      "15thankyou"
    ];

    const zip = new JSZip();

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (!element) continue;

      try {
        const dataUrl = await domtoimage.toPng(element, {
          quality: 1,
          bgcolor: "#ffffff",
          skipCrossOrigin: true,
        });

        const blob = await fetch(dataUrl).then((res) => res.blob());
        zip.file(`${id}.png`, blob);
      } catch (error) {
        console.error(`Lỗi khi chụp ${id}:`, error);
      }
    }
    
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "portfolio_screenshots.zip");
    setIsExporting(false);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
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
        onClick={() => scrollToSection("01home")}
        className="bg-blue-700 cursor-pointer hover:bg-blue-600 flex items-center justify-center z-10 w-20 h-15"
      >
        <img
          src={company?.logo_img_url}
          className="invert mix-blend-screen w-15 h-15"
          alt="Company Logo"
        />
      </a>

      <div>
        <ul className="hidden md:flex items-center gap-5">
          <li
            className={`p-3 hover:bg-blue-500 rounded-3xl cursor-pointer transition-all flex items-center ${
              activeSection === "01home" || activeSection === "02abouteus"
                ? "bg-blue-500"
                : ""
            }`}
            onClick={() => scrollToSection("01home")}
          >
            <IoHome className="mr-1 text-[2rem]" /> Home
          </li>
          <li
            className={`p-3 hover:bg-blue-500 rounded-3xl cursor-pointer transition-all flex items-center ${
              activeSection === "03part1" ||
              activeSection === "04product1" ||
              activeSection === "05product2" ||
              activeSection === "06product3"
                ? "bg-blue-500"
                : ""
            }`}
            onClick={() => scrollToSection("03part1")}
          >
            <AiOutlineGlobal className="mr-1 text-[2rem]" /> Web/App
          </li>
          <li
            className={`p-3 hover:bg-blue-500 rounded-3xl cursor-pointer transition-all flex items-center ${
              activeSection === "07part2" ||
              activeSection === "08product4" ||
              activeSection === "09product5" ||
              activeSection === "10product6" ||
              activeSection === "11product7"
                ? "bg-blue-500"
                : ""
            }`}
            onClick={() => scrollToSection("07part2")}
          >
            <IoLogoGameControllerA className="mr-1 text-[2rem]" /> Game
          </li>
          <li
            className={`p-3 hover:bg-blue-500 rounded-3xl cursor-pointer transition-all flex items-center ${
              activeSection === "12part3" ||
              activeSection === "13usservice" ||
              activeSection === "14employee" ||
              activeSection === "15thankyou"
                ? "bg-blue-500"
                : ""
            }`}
            onClick={() => scrollToSection("12part3")}
          >
            <FaBuildingUser className="mr-2 text-[2rem]" /> About Us
          </li>
        </ul>
      </div>
      <div className="hidden md:block w-68"></div>
      {/* Mobile menu */}
      <div
        className={`absolute z-50 md:hidden top-16 left-0 w-full bg-blue-700 flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${
          isMenuOpen
            ? "opacity-90 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-5"
        }`}
        style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
      >
        <li
          className="p-3 hover:bg-blue-500 cursor-pointer transition-all"
          onClick={() => handleMobileClick("03part1")}
        >
          PHẦN I
        </li>
        <li
          className="p-3 hover:bg-blue-500 cursor-pointer transition-all"
          onClick={() => handleMobileClick("07part2")}
        >
          PHẦN II
        </li>
        <li
          className="p-3 hover:bg-blue-500 cursor-pointer transition-all"
          onClick={() => handleMobileClick("12part3")}
        >
          PHẦN III
        </li>
      </div>

      {/* Export section */}
      <div
        className="p-3 cursor-pointer print-hidden flex items-center relative hover:bg-blue-500"
        onMouseEnter={handleExportHover}
        onMouseLeave={handleExportLeave}
      >
        {/* Hiển thị icon loading nếu đang xuất */}
        {isExporting ? (
          <AiOutlineLoading3Quarters className="text-white text-3xl animate-spin" />
        ) : (
          <>
            Export
            <RiLogoutBoxRFill className="text-white text-3xl" />
          </>
        )}
        
        {/* Export menu */}
        <div
          className={`absolute z-50 top-15 -right-5 w-[7rem] bg-blue-700 flex flex-col justify-center gap-1 text-[0.9rem] transform transition-all duration-300 ${
            isExportMenu
              ? "opacity-90 pointer-events-auto translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-5"
          }`}
        >
          <li
            className="p-1 hover:bg-blue-500 cursor-pointer transition-all flex justify-start items-center"
            onClick={handleExportToImage}
          >
            ToImage <LuImageUp className="text-2xl ml-2" />
          </li>
          <li
            className="p-1 hover:bg-blue-500 cursor-pointer transition-all flex justify-start items-center"
            onClick={exportToPDF}
          >
            ToPDF <PiFilePdfDuotone className="text-[1.8rem] ml-2" />
          </li>
        </div>
      </div>

      <TiThMenuOutline
        className="text-white w-10 h-10 md:hidden cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
    </div>
  );
}

export default React.memo(Header);
