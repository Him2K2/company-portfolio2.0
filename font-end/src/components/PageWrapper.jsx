import React from "react";

const PageWrapper = ({ pageNumber, children }) => {
  return (
    <div className="relative w-full">
      <div className="p-4">{children}</div>
      {pageNumber > 0 && (
          <div className="w-screen h-8 !important bg-blue-600 mt-auto relative z-10">
          <button className="px-10 py-1 text-white bg-stone-800 absolute -top-3 left-10">Page No:{pageNumber}</button>
      </div>
      )}
    </div>
  );
};

export default PageWrapper;
