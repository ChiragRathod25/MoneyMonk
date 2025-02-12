import React from "react";
import { useId } from "react";

function Input({ type = "text", label, placeholder,className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        placeholder={placeholder}
        className={` px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        id={id}
        {...props}
      ></input>
    </div>
  );
}

export default React.forwardRef(Input);
