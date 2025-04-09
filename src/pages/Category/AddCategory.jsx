import React from 'react';
import { CategoryForm } from '../../components';

function AddCategory() {
  return (
    <div className="min-h-screen bg-white px-4 py-8 flex flex-col items-center">
   
      <div className="w-full max-w-2xl">
        <CategoryForm />
      </div>
    </div>
  );
}

export default AddCategory;
