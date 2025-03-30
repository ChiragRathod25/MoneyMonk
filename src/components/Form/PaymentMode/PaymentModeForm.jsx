import React from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../../";
import paymentService from "../../../appwrite/paymentServices";

function PaymentModeForm() {
  const { register, handleSubmit,reset } = useForm();

  const submit = async (data) => {
    console.log("Payment Mode Form Data", data);
    // Call the API to add the payment mode
    await paymentService.AddPaymentMode(data)
        .then((response) => {
            console.log("Payment mode added successfully", response);
            // Optionally, reset the form or show a success message
        })
        .catch((error) => {
            console.error("Error adding payment mode", error);
            // Optionally, show an error message
        });
    // Reset the form after submission
    reset();


  };
  return (
    <>
      <div>PaymentModeForm</div>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          label="Payment Mode"
          name="paymentMode"
          type="text"
          placeholder="Payment Mode"
          {...register("paymentMode", { required: true })}
        />
        <Button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Payment Mode
        </Button>
      </form>
    </>
  );
}

export default PaymentModeForm;
