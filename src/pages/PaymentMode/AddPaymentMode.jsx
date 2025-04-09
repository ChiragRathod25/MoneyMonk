import React from "react";
import { PaymentModeForm } from "../../components";

function AddPaymentMode() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-8">
 
      <div className="w-full max-w-xl">
        <PaymentModeForm />
      </div>
    </div>
  );
}

export default AddPaymentMode;
