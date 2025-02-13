import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-teal-500",
  hoverColor = "hover:bg-teal-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg ${bgColor} ${hoverColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;