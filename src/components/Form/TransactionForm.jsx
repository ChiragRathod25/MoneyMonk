import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Error, Input, Loading, Select } from "../";
import transactionService from "../../appwrite/transactionServices";
import categoryService from "../../appwrite/categoryServices";
import subCategoryService from "../../appwrite/subCategoryServices";
import paymentService from "../../appwrite/paymentServices";
import bucketService from "../../appwrite/bucketServices";

function TransactionForm({ transaction, transacationType }) {
  console.log("TransactionForm called for", transacationType);
  transacationType = transacationType === "income" ? "Income" : "Expense";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [paymentMode, setPaymentMode] = useState([]);

  const userId = useSelector((state) => state.auth.userData.$id);
  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      amount: transaction ? transaction.amount : "",
      type: transaction
        ? transaction.type
        : transacationType
          ? transacationType
          : "",
      status: transaction ? transaction.status : "",
      description: transaction ? transaction.description : "",
      paymentModeId: transaction ? transaction.paymentModeId : "",
      categoryId: transaction ? transaction.categoryId : "",
      subcategoryId: transaction ? transaction.subcategoryId : "",
      date: transaction ? transaction.date : Date.now(),
    },
  });

  const amount = watch("amount");
  const type = watch("type");
  const categoryId = watch("categoryId");
  useEffect(() => {
    if (!type || !categoryId) return;
    if (type === "Income") {
      setValue(
        "categoryId",
        categories.find((category) => category.name === "Income").$id
      );
    }
  }, [type, categoryId]);

  useEffect(() => {
    console.log("amount changed", amount);
    if (amount < 0) {
      alert("Amount can not be negative");
      setValue("amount", 0);
    }
  }, [amount]);

  useEffect(() => {
    console.log("categoryId changed", categoryId);
  }, [categoryId]);

  useEffect(() => {
    console.log("useEffect called");

    categoryService
      .getAllCategories()
      .then((response) => {
        console.log("getAllCategories response");
        console.log(response);
        setCategories(response.documents);
        return response;
      })
      .then((response) => {
        // if type=='Income' set categoryId to Income category
        console.log("Categories", response);
        if (transacationType === "Income") {
          setValue(
            "categoryId",
            response.documents.find((category) => category.name === "Income")
              .$id
          );
        } else {
          setValue("categoryId", response.documents[0].$id);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });

    subCategoryService
      .getAllSubCategories()
      .then((response) => {
        console.log("getAllSubCategories response");
        console.log(response);
        setSubcategories(response.documents);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });

    paymentService
      .getAllPaymentModes()
      .then((response) => {
        console.log("getAllPaymentModes response");
        console.log(response);
        setPaymentMode(response.documents);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  }, []);


  
  const createTransaction = async (data) => {
    console.log("createTransaction called");
    // upload file to appwrite storage
    if (data.reference && data.reference.length > 0) {
      const file = data.reference[0];
      console.log("file", file);
      try {
          const fileResponse=await bucketService.uploadFile(file);
          console.log("fileResponse", fileResponse);
          data.reference = fileResponse.$id;
      } catch (error) {
          console.log("Error uploading file", error);
          setError(error.message);
      }
    }


    await transactionService
      .createTrasanction(data, userId)
      .then((response) => {
        console.log("createTransaction response");
        console.log(response);
        alert("Transaction created successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  if (error && error.length > 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <Error errorMsg={error} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <Loading />
      </div>
    );
  }

  return (
    <div className=" p-8 min-h-screen flex items-center justify-center bg-light-gray">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-dark-blue mb-6">
          Transaction Form
        </h2>
        <form onSubmit={handleSubmit(createTransaction)}>
          <Select
            {...register("type", { required: true })}
            label="Type"
            options={["Income", "Expense"]}
            selectedOption={transacationType}
          />
          <Input
            {...register("amount", {
              required: true,
              valueAsNumber: true,
              min: 0.01,
            })}
            type="number"
            placeholder="Amount"
            label="Amount"
          />
          <Select
            {...register("status", { required: true })}
            label="Status"
            options={["Pending", "Done", "Scheduled"]}
            selectedOption={"Done"}
          />
          <Input
            {...register("description")}
            type="text"
            placeholder="Description"
            label="Description"
          />
          <Input
            {...register("date", { required: true })}
            type="date"
            placeholder="Date"
            label="Date"
          />

          <label
            className="inline-block mb-1 pl-1 text-dark-blue font-semibold"
            htmlFor={"categoryId"}
          >
            {"Category"}
          </label>
          <select
            className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
            {...register("categoryId", { required: true })}
            id={"categoryId"}
          >
            {categories &&
              categories.map((category) => (
                <option key={category.$id} value={category.$id}>
                  {category.name}
                </option>
              ))}
          </select>

          <label
            className="inline-block mb-1 pl-1 text-dark-blue font-semibold"
            htmlFor={"subcategoryId"}
          >
            {"SubCategory"}
          </label>
          <select
            className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
            {...register("subcategoryId", { required: true })}
            id={"subcategoryId"}
          >
            {subcategories &&
              subcategories.map((subcategory) =>
                subcategory.categoryId?.$id == categoryId ? (
                  <option key={subcategory.$id} value={subcategory.$id}>
                    {subcategory.name}
                  </option>
                ) : null
              )}
          </select>

          <label
            className="inline-block mb-1 pl-1 text-dark-blue font-semibold"
            htmlFor={"paymentModeId"}
          >
            {"Payment Mode"}
          </label>
          <select
            className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
            {...register("paymentModeId", { required: true })}
            id={"paymentModeId"}
          >
            {paymentMode &&
              paymentMode.map((payment) => (
                <option key={payment.$id} value={payment.$id}>
                  {payment.name}
                </option>
              ))}
          </select>

          <Input type="file" label="Reference" {...register("reference")} />
          <div className="flex justify-between mt-4">
            <Button
              text="Cancel"
              onClick={() => {
                reset();
                navigate("/");
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Cancel
            </Button>
            <Button
              text="Reset"
              onClick={() => {
                reset();
              }}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Reset
            </Button>
            <Button type="submit" className="bg-teal-500 hover:bg-teal-600">
              {transaction ? "Update Transaction" : "Add Transaction"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;
