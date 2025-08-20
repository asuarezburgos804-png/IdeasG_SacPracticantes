import React from 'react';
import { Icon } from "@iconify/react";

const CustomMenuContextual = ({
  isVisible,
  x,
  y,
  title,
  subtitle,
  options,
  onClose,
}) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed bg-white shadow-lg rounded-lg overflow-hidden z-50 border border-default-200"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        minWidth: "180px",
      }}
      onClick={onClose}
    >
      <div className="py-1">
        {(title || subtitle) && (
          <div className="px-3 py-2 bg-azulVeci-50 border-b border-azulVeci-100">
            {title && (
              <p className="text-xs font-medium text-azulVeci-700">{title}</p>
            )}
            {subtitle && (
              <p className="text-sm font-bold">{subtitle}</p>
            )}
          </div>
        )}
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-${option.color || 'azulVeci'}-50 flex items-center gap-2 transition-colors ${option.textColor ? `text-${option.textColor}` : ''}`}
            onClick={option.onClick}
          >
            <Icon
              icon={option.icon}
              size={16}
              className={option.textColor ? `text-${option.textColor}` : `text-${option.color || 'azulVeci'}-600`}
            />
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomMenuContextual;