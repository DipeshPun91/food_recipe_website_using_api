import React from "react";
import { FaPlus } from "react-icons/fa";

const serif = { fontFamily: "'Fraunces', serif", fontWeight: 600 };

const EmptyState = ({ icon, title, description, buttonText, onAction }) => {
  return (
    <div className="text-center py-16 bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm">
      <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#2B2420]/20 flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
      <h3 className="text-xl text-[#2B2420] mb-2" style={serif}>
        {title}
      </h3>
      <p className="text-[#2B2420]/60 max-w-md mx-auto mb-6">{description}</p>
      {buttonText && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 bg-[#C1440E] text-[#FAF3E7] rounded-sm shadow-[3px_3px_0_0_#2B2420] hover:bg-[#a3390b] transition-colors"
        >
          <FaPlus className="inline mr-2" />
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
