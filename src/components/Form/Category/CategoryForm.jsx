import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button, Select } from '../../';
import categoryService from '../../../appwrite/categoryServices';

function CategoryForm() {
  const { register, handleSubmit } = useForm();

  const submit = async (data) => {
    console.log(data);
    try {
      const response = await categoryService.addCategory(data);
      console.log('Category added successfully', response);
    } catch (error) {
      console.error('Error adding category', error);
    }
  };

  return (
    <div className="w-full bg-white shadow-md rounded-2xl p-6 sm:p-8 border border-gray-200">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
        ➕ Add a New Category
      </h2>
      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        <Input
          label="Category Name"
          name="categoryName"
          type="text"
          placeholder="Enter category name"
          {...register('categoryName', { required: true })}
        />
        <Select
          label="Category Type"
          name="categoryType"
          placeholder="Select category type"
          {...register('categoryType', { required: true })}
          options={['Expense', 'Income']}
          selectedOption="Expense"
        />
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
        >
          Add Category
        </Button>
      </form>
    </div>
  );
}

export default CategoryForm;
