import React from "react";

const CardTools = ({ items = [], title = "" }) => {
  return (
    <div className="flex justify-center items-center bg-[#F4F6F8]  py-12 px-4">
      <div className="bg-[#F4F6F8] p-8 rounded-2xl  max-w-6xl">
        <h2 className="text-2xl font-bold text-center text-[#1F2937] mb-8 relative inline-block after:content-[''] after:block after:w-16 after:h-1 after:bg-[#FF8231] after:mx-auto after:mt-2 drop-shadow-[0_2px_2px_rgba(255,130,49,0.4)]">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-3 p-4 rounded-xl bg-white hover:bg-[#FFE0CB] transition-colors shadow-sm min-h-[150px]"
            >
              <div className="w-16 h-16 flex justify-center items-center rounded-full bg-gradient-to-br from-[#FFE0CB] to-[#e86f1a] shadow-md text-white text-2xl">
                {item.icon}
              </div>
              <span className="text-xs font-medium text-[#4B5563] text-center break-words px-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardTools;
