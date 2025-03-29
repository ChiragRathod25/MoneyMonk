import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Select } from "../../";
import categoryService from "../../../appwrite/categoryServices";
import subCategoryService from "../../../appwrite/subCategoryServices";

function SubCategoryForm() {
  const [categories, setCategories] = React.useState([]);

  const { register, handleSubmit } = useForm();
  const submit = async (data) => {
    console.log(data);
    // get the categoryId from the selected category
    const categoryId= categories.find(
        (category) => category.name === data.categoryId
      ).$id;
    console.log("categoryId", categoryId);
    data.categoryId = categoryId;
    console.log("data", data); 
    
    const response=await subCategoryService.addSubCategory(data)
        .then((response) => {
            console.log("Subcategory added successfully", response);
        })
        .catch((error) => {
            console.error("Error adding subcategory", error);
        });
    console.log("Subcategory added successfully", response);
  };
  const getAllCategories = async () => {
    await categoryService
      .getAllCategories()
      .then((response) => {
        console.log("getAllCategories response", response);
        setCategories(response.documents);
        console.log("categories", categories);
      })
      .catch((error) => {
        console.error("Error getting categories", error);
      });
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <div>SubCategoryForm</div>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          label="Subcategory Name"
          name="subcategoryName"
          type="text"
          placeholder="Enter subcategory name"
          {...register("subcategoryName", { required: true })}
        />
        <Select
          label="Category"
          name="categoryId"
          placeholder="Select category"
          {...register("categoryId", { required: true })}
          options={categories.map((category) => (
            category?.name
          ))}
            selectedOption={categories[0]?.$id}
        />
        <Button type="submit" className="bg-dark-blue text-white mt-3">
          Add Subcategory
        </Button>
      </form>
    </>
  );
}

export default SubCategoryForm;
