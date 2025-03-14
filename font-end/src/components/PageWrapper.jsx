import React, { useRef, useEffect, memo, useCallback } from "react";

const PageWrapper = memo(({ pageNumber, children, id, sectionId, setActiveSection, isExportingPDF }) => { // Nhận prop isExportingPDF
  const ref = useRef(null);

  const handleIntersection = useCallback(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isExportingPDF) { // Kiểm tra trạng thái isExportingPDF
          setActiveSection(sectionId || id || 'home');
        }
      });
    },
    [setActiveSection, sectionId, id, isExportingPDF]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.9 });

    if (ref.current && !isExportingPDF) { // Kiểm tra trạng thái isExportingPDF
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [handleIntersection, isExportingPDF]); // Thêm isExportingPDF vào dependency array

  return (
    <div ref={ref} id={id} className="relative w-full min-h-screen bg-white flex flex-col lg:max-w-[80vw] print:min-h-[277mm] print:block print:py-5">
      <div className="flex-grow">
        {children}
      </div>

      {pageNumber > 0 && (
        <div className="w-screen h-8 bg-blue-600 relative z-10 lg:max-w-[80vw]">
          <button className="px-10 py-1 text-white bg-stone-800 absolute -top-3 left-10">
            Page No: {pageNumber}
          </button>
        </div>
      )}
    </div>
  );
});

export default React.memo(PageWrapper);