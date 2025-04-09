import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Select } from "../../";
import categoryService from "../../../appwrite/categoryServices";
import subCategoryService from "../../../appwrite/subCategoryServices";

function SubCategoryForm() {
  const [categories, setCategories] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const submit = async (data) => {
    const categoryId = categories.find(
      (category) => category.name === data.categoryId
    )?.$id;

    if (!categoryId) {
      console.error("No matching category found.");
      return;
    }

    data.categoryId = categoryId;

    try {
      const response = await subCategoryService.addSubCategory(data);
      console.log("Subcategory added successfully", response);
      reset();
    } catch (error) {
      console.error("Error adding subcategory", error);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response.documents);
    } catch (error) {
      console.error("Error getting categories", error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mt-6 bg-white border border-gray-200 rounded-2xl shadow-md p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center">
        🧩 Add a New Subcategory
      </h2>

      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        <Input
          label="Subcategory Name"
          name="subcategoryName"
          type="text"
          placeholder="e.g. Mobile Recharge, Tiffin, Gym"
          {...register("subcategoryName", { required: true })}
        />
        <Select
          label="Category"
          name="categoryId"
          placeholder="Select category"
          {...register("categoryId", { required: true })}
          options={categories.map((category) => category?.name)}
          selectedOption={categories[0]?.name}
        />
        <Button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200"
        >
          Add Subcategory
        </Button>
      </form>
    </div>
  );
}

export default SubCategoryForm;
