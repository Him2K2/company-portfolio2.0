import React, { useRef, useEffect, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

const PageWrapper = memo(({ pageNumber, children, id, sectionId, updateCandidateSection, isExportingPDF }) => {
  const ref = useRef(null);
  const { t } = useTranslation();
 
  const handleIntersection = useCallback(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isExportingPDF) {
          const targetSection = sectionId || id || "01home";
          // Khi phần tử nằm trong viewport, cập nhật candidateSection ở App
          updateCandidateSection(targetSection);
        }
      });
    },
    [updateCandidateSection, sectionId, id, isExportingPDF]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (ref.current && !isExportingPDF) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [handleIntersection, isExportingPDF]);

  return (
    <div
      ref={ref}
      id={id}
      className="relative w-full min-h-screen bg-white flex flex-col  lg:max-w-[80vw] print:min-h-[277mm] print:block print:py-5"
    >
      <div className="flex-grow">
        {children}
      </div>

      {pageNumber > 0 && (
        <div className="w-screen h-8 bg-blue-600 relative z-10 flex justify-center lg:max-w-[80vw] mt-auto">
          <button className="px-10 py-1 text-white bg-stone-800 absolute -top-3 left-1/3 md:absolute md:-top-3 md:left-10">
            {t("page")} {pageNumber}
          </button>
        </div>
      )}
    </div>
  );
});

export default React.memo(PageWrapper);
