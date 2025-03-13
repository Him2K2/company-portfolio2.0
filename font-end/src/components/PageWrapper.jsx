import React, { useRef, useEffect } from "react";

const PageWrapper = ({ pageNumber, children, id, sectionId, setActiveSection }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId || id || 'home'); // Set active section
          }
        });
      },
      { threshold: 0.5 } // Ngưỡng 60% section hiển thị thì active
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [setActiveSection, sectionId, id]);

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
};

export default PageWrapper;