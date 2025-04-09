import React from "react";
import { SubCategoryForm } from "../../components";

function AddSubcategory() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-8">
  
      <div className="w-full max-w-xl">
        <SubCategoryForm />
      </div>
    </div>
  );
}

export default AddSubcategory;
