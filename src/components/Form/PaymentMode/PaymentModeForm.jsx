import React from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../../";
import paymentService from "../../../appwrite/paymentServices";

function PaymentModeForm() {
  const { register, handleSubmit, reset } = useForm();

  const submit = async (data) => {
    console.log("Payment Mode Form Data", data);
    try {
      const response = await paymentService.AddPaymentMode(data);
      console.log("Payment mode added successfully", response);
    } catch (error) {
      console.error("Error adding payment mode", error);
    }
    reset();
  };

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 sm:p-8 mx-auto mt-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center">
        💳 Add a New Payment Mode
      </h2>
      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        <Input
          label="Payment Mode"
          name="paymentMode"
          type="text"
          placeholder="e.g. UPI, Credit Card, Cash"
          {...register("paymentMode", { required: true })}
        />
        <Button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200"
        >
          Add Payment Mode
        </Button>
      </form>
    </div>
  );
}

export default PaymentModeForm;
