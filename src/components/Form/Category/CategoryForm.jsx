import React from 'react'
import { useForm } from 'react-hook-form'
import {Input,Button,Select} from "../../"
import categoryService from '../../../appwrite/categoryServices'

function CategoryForm() {
    const {register,handleSubmit}=useForm()

    const submit=async (data)=>{
        console.log(data)
        // Add your submit logic here
        await categoryService.addCategory(data).then((response)=>{
            console.log("Category added successfully",response)
        }
        ).catch((error)=>{
            console.error("Error adding category",error)
        })
    }
  return (
      <>
    <div>CategoryForm</div>
    <form onSubmit={handleSubmit(submit)}>
        <Input 
        label="Category Name"
        name="categoryName"
        type="text"
        placeholder="Enter category name"
        {...register("categoryName",{required:true})}
        />
        <Select
        label="Category Type"
        name="categoryType"
        placeholder="Select category type"
        {...register("categoryType",{required:true})}
        options={['Expense','Income']}
        selectedOption="Expense"
        />
        <Button 
        type="submit"
        className="bg-dark-blue text-white mt-3"
        >
            Add Category
        </Button>

    </form>
    </>
  )
}

export default CategoryForm