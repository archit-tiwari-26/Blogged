import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-gradient-to-r from-blue-500 to-purple-600",
    textColor = "text-white",
    className = "",
    disabled = false,
    ...props
}) {
    return (
        <button 
            type={type}
            disabled={disabled}
            className={`
                relative px-6 py-3 rounded-lg font-medium text-sm
                transition-all duration-300 ease-out
                transform active:scale-95
                focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                overflow-hidden group
                ${bgColor} ${textColor} ${className}
            `} 
            {...props}
        >
            {/* Button content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
            
            {/* Hover overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent 
                          translate-x-full group-hover:translate-x-0 
                          group-disabled:translate-x-full
                          transition-transform duration-300" />
            
            {/* Subtle shadow on hover */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 
                          group-disabled:opacity-0 transition-opacity duration-300
                          shadow-lg shadow-blue-500/25" />
        </button>
    );
}