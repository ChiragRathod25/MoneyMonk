import React, { useId } from "react";

function Select({ options = [], className = "", label,selectedOption, ...props }, ref) {
  console.log("default",label,selectedOption);
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-1 pl-1 text-dark-blue font-semibold"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <select
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
        ref={ref}
        id={id}
      >
        {options?.map((option) => (
          <option key={option} value={option} selected={selectedOption===option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
