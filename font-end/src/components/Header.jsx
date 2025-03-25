import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";


//icon
import { TiThMenuOutline } from "react-icons/ti";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { AiOutlineGlobal, AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoLogoGameControllerA } from "react-icons/io";
import { FaBuildingUser } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { LuImageUp } from "react-icons/lu";
import { PiFilePdfDuotone } from "react-icons/pi";

const sectionIds = [
  "01home",
  "02about-us",
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
  "13our-service",
  "14employee",
  "15thank-you"
];

function Header({ activeSection, setActiveSection }) {
  const [company, setCompany] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExportMenu, setIsExportMenu] = useState(false);
  const [exportTimeout, setExportTimeout] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      setCompany(data.company);
    }
  }, []);

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  }, [setActiveSection]);

  const handleMobileClick = useCallback((id) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  }, [scrollToSection]);

  const handleExportHover = useCallback(() => {
    if (exportTimeout) {
      clearTimeout(exportTimeout);
    }
    setIsExportMenu(true);
  }, [exportTimeout]);

  const handleExportLeave = useCallback(() => {
    const timeout = setTimeout(() => {
      setIsExportMenu(false);
    }, 100);
    setExportTimeout(timeout);
  }, []);

  const exportToPDF = useCallback(async () => {
    setIsExportMenu(false);
    setIsExporting(true);
    try {
      // Dynamic import cho các thư viện nặng
      const domtoimage = (await import("dom-to-image")).default;
      const { jsPDF } = await import("jspdf");

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
          const img = new Image();
          img.src = dataUrl;
          await new Promise((resolve) => (img.onload = resolve));
          const imgWidth = img.naturalWidth;
          const imgHeight = img.naturalHeight;
          const scale = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
          const newWidth = imgWidth * scale;
          const newHeight = imgHeight * scale;
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
      pdf.save("portfolio.pdf");
    } catch (error) {
      console.error("Lỗi khi xuất PDF:", error);
    } finally {
      setIsExporting(false);
    }
  }, []);

  const handleExportToImage = useCallback(async () => {
    setIsExportMenu(false);
    setIsExporting(true);
    try {
      const domtoimage = (await import("dom-to-image")).default;
      const JSZip = (await import("jszip")).default;
      const { saveAs } = await import("file-saver");

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
    } catch (error) {
      console.error("Lỗi khi xuất hình ảnh:", error);
    } finally {
      setIsExporting(false);
    }
  }, []);

  // Hàm chuyển ngôn ngữ
  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      {isExporting && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-60 z-50"></div>
      )}
      <div className="w-screen flex h-15 bg-blue-700 p-5 text-white fixed justify-between items-center z-50 mb-auto md:h-15 lg:w-[80vw] select-none print-hidden">

        {/* Logo */}
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

        {/* Menu Desktop */}
        <div>
          <ul className="hidden md:flex items-center gap-1">
            <li
              className={`p-3 h-15 hover:bg-blue-500 cursor-pointer transition-all flex items-center ${activeSection === "01home" || activeSection === "02about-us" ? "bg-blue-500" : ""
                }`}
              onClick={() => scrollToSection("01home")}
            >
              <IoHome className="mr-1 text-[2rem]" /> {t("home")}
            </li>
            <li
              className={`p-3 h-15 hover:bg-blue-500 cursor-pointer transition-all flex items-center ${activeSection === "03part1" ||
                activeSection === "04product1" ||
                activeSection === "05product2" ||
                activeSection === "06product3"
                ? "bg-blue-500"
                : ""
                }`}
              onClick={() => scrollToSection("03part1")}
            >
              <AiOutlineGlobal className="mr-1 text-[2rem]" /> {t("web")}
            </li>
            <li
              className={`p-3 h-15 hover:bg-blue-500 cursor-pointer transition-all flex items-center ${activeSection === "07part2" ||
                activeSection === "08product4" ||
                activeSection === "09product5" ||
                activeSection === "10product6" ||
                activeSection === "11product7"
                ? "bg-blue-500"
                : ""
                }`}
              onClick={() => scrollToSection("07part2")}
            >
              <IoLogoGameControllerA className="mr-1 text-[2rem]" /> {t("game")}
            </li>
            <li
              className={`p-3 h-15 hover:bg-blue-500 cursor-pointer transition-all flex items-center ${activeSection === "12part3" ||
                activeSection === "13our-service" ||
                activeSection === "14employee" ||
                activeSection === "15thank-you"
                ? "bg-blue-500"
                : ""
                }`}
              onClick={() => scrollToSection("12part3")}
            >
              <FaBuildingUser className="mr-2 text-[2rem]" /> {t("about")}
            </li>
          </ul>
        </div>



        {/* Mobile menu */}
        <div
          className={`absolute z-50 md:hidden top-16 left-0 w-full bg-blue-700 flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${isMenuOpen
            ? "opacity-90 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-5"
            }`}
          style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
        >
          <li
            className={`p-3 hover:bg-blue-500 cursor-pointer transition-all flex items-center ${activeSection === "01home" || activeSection === "02about-us" ? "bg-blue-500" : ""
              }`}
            onClick={() => handleMobileClick("01home")}
          >
            <IoHome className="mr-1 text-[2rem]" /> {t("home")}
          </li>
          <li
            className={`p-3 hover:bg-blue-500 cursor-pointer transition-all flex items-center ${activeSection === "03part1" ||
              activeSection === "04product1" ||
              activeSection === "05product2" ||
              activeSection === "06product3"
              ? "bg-blue-500"
              : ""
              }`}
            onClick={() => scrollToSection("03part1")}
          >
            <AiOutlineGlobal className="mr-1 text-[2rem]" /> {t("web")}
          </li>
          <li
            className={`p-3 hover:bg-blue-500 cursor-pointer transition-all flex items-center ${activeSection === "07part2" ||
              activeSection === "08product4" ||
              activeSection === "09product5" ||
              activeSection === "10product6" ||
              activeSection === "11product7"
              ? "bg-blue-500"
              : ""
              }`}
            onClick={() => handleMobileClick("07part2")}
          >
            <IoLogoGameControllerA className="mr-1 text-[2rem]" /> {t("game")}
          </li>
          <li
            className={`p-3 hover:bg-blue-500 cursor-pointer transition-all flex items-center ${activeSection === "12part3" ||
              activeSection === "13our-service" ||
              activeSection === "14employee" ||
              activeSection === "15thank-you"
              ? "bg-blue-500"
              : ""
              }`}
            onClick={() => handleMobileClick("12part3")}
          >
            <FaBuildingUser className="mr-2 text-[2rem]" /> {t("about")}
          </li>



          <li
            className="p-3 hover:bg-blue-500 cursor-pointer transition-all flex justify-start items-center"
            onClick={handleExportToImage}
          >
            <LuImageUp className="text-[2rem] ml-2" />{t("toimg")}
          </li>
          <li
            className="p-3 hover:bg-blue-500 cursor-pointer transition-all flex justify-start items-center"
            onClick={exportToPDF}
          >
            <PiFilePdfDuotone className="text-[2.2rem] ml-2" />{t("topdf")}
          </li>
          {/* ADD LANGUAGE SWITCH (Mobile) */}
          <div className="flex space-x-2">
            <button
              className={`px-2 py-1 rounded cursor-pointer ${i18n.language === 'en' ? 'bg-blue-300 text-blue-700' : 'bg-white text-blue-700'
                }`}
              onClick={() => handleChangeLanguage('en')}
            >
              EN
            </button>
            <button
              className={`px-2 py-1 rounded cursor-pointer ${i18n.language === 'vi' ? 'bg-blue-300 text-blue-700' : 'bg-white text-blue-700'
                }`}
              onClick={() => handleChangeLanguage('vi')}
            >
              VI
            </button>
          </div>
        </div>



        <div className="space-x-2 flex">
          {/* ADD LANGUAGE SWITCH (Desktop) */}
          <div className="hidden md:flex items-center space-x-2 ">
            <button
              className={`px-2 py-1 rounded cursor-pointer ${i18n.language === 'en' ? 'bg-blue-300 text-blue-700' : 'bg-white text-blue-700'
                }`}
              onClick={() => handleChangeLanguage('en')}
            >
              EN
            </button>
            <button
              className={`px-2 py-1 rounded cursor-pointer ${i18n.language === 'vi' ? 'bg-blue-300 text-blue-700' : 'bg-white text-blue-700'
                }`}
              onClick={() => handleChangeLanguage('vi')}
            >
              VI
            </button>
          </div>
          {/* Export section */}
          <div
            className="p-3 cursor-pointer w-[8rem] print-hidden flex items-center relative hover:bg-blue-500"
            onMouseEnter={handleExportHover}
            onMouseLeave={handleExportLeave}
          >
            {isExporting ? (
              <AiOutlineLoading3Quarters className="text-white text-3xl animate-spin" />
            ) : (
              <div className="md:flex w-[50rem] hidden md:items-center">
                <RiLogoutBoxRFill className="text-white text-3xl " />
                {t("export")}

              </div>
            )}

            <div
              className={`hidden md:flex absolute z-50 top-15 left-0 w-[8rem] bg-blue-700 flex-col justify-center gap-1 text-[0.9rem] transform transition-all duration-300 ${isExportMenu
                ? "opacity-100 pointer-events-auto translate-y-0"
                : "opacity-0 pointer-events-none -translate-y-5"
                }`}
            >
              <li
                className="p-3 hover:bg-blue-500 cursor-pointer transition-all flex justify-start items-center"
                onClick={handleExportToImage}
              >
                <LuImageUp className="text-2xl mr-2" />{t("toimg")}
              </li>
              <li
                className="p-3 hover:bg-blue-500 cursor-pointer transition-all flex justify-start items-center"
                onClick={exportToPDF}
              >
                <PiFilePdfDuotone className="text-[1.8rem] mr-2" /> {t("topdf")}
              </li>
            </div>
          </div>
        </div>

        <TiThMenuOutline
          className="text-white w-10 h-10 md:hidden cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>
    </>
  );
}

export default React.memo(Header);
