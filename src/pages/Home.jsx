import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../components";
import { Link } from "react-router-dom";

function Home() {
  const isAuthenticate =Boolean(localStorage.getItem('authStatus'));
  const userName = localStorage.getItem('authName'); 
  const navigate = useNavigate();
  console.log(useSelector((state) => state.auth.userData));
  
  useEffect(() => {
   console.log("isAuthenticate", isAuthenticate);
   console.log("userName", userName);
  }
  , [isAuthenticate, navigate]);

  // Get current hour for greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      {/* 🌟 Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-16 text-center rounded-b-3xl shadow-lg">
        <h1 className="text-5xl font-extrabold drop-shadow-md">
          {greeting}, {userName || "Welcome to Your Finance Tracker"} 👋
        </h1>
        <p className="text-lg mt-3 opacity-90">
          Take full control of your expenses and savings effortlessly.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link to="transaction/expense/add">
            <Button className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg shadow-md">
              Add Expense
            </Button>
          </Link>
          <Link to="transaction/income/add">
            <Button className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg shadow-md">
              Add Income
            </Button>
          </Link>
          <Link
            to="transaction/expense/all"
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg shadow-md"
          >
            View All Expenses
          </Link>
          <Link 

            to="transaction/income/all"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md"
          >
            View All Income
          </Link>
          <Link 

            to="reports"
            className="
            bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg shadow-md"
            
          >
            Reports
          </Link>

        </div>
      </section>

   
      {/* ✅ Dashboard Summary */}
      <section className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Your Financial Overview
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Total Balance */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-600">Total Balance</h2>
            <p className="text-4xl font-extrabold text-gray-800 mt-2">₹50,000</p>
          </div>

          {/* Total Income */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-600">Total Income</h2>
            <p className="text-4xl font-extrabold text-green-500 mt-2">₹80,000</p>
          </div>

          {/* Total Expenses */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-600">Total Expenses</h2>
            <p className="text-4xl font-extrabold text-red-500 mt-2">₹30,000</p>
          </div>
        </div>
      </section>

         {/* ✅ Feature Highlights */}
         {

         !isAuthenticate &&
         <section className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Why Use Our Finance Tracker?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6 text-center border border-gray-200">
            <h3 className="font-semibold text-lg">📊 Smart Insights</h3>
            <p className="text-sm text-gray-600 mt-2">
              Track spending and analyze trends with interactive charts.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 text-center border border-gray-200">
            <h3 className="font-semibold text-lg">🔔 Timely Alerts</h3>
            <p className="text-sm text-gray-600 mt-2">
              Get reminders for bills, subscriptions, and more.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 text-center border border-gray-200">
            <h3 className="font-semibold text-lg">💰 Budget Planning</h3>
            <p className="text-sm text-gray-600 mt-2">
              Set monthly budgets and optimize your savings.
            </p>
          </div>
        </div>
       </section>
      }

      {/* ✅ Recent Transactions */}
      <section className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Recent Transactions
        </h2>
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <ul className="divide-y divide-gray-300">
            <li className="flex justify-between py-3">
              <span className="text-gray-700 font-medium">Grocery Shopping</span>
              <span className="text-red-500 font-bold">- ₹2,000</span>
            </li>
            <li className="flex justify-between py-3">
              <span className="text-gray-700 font-medium">Salary</span>
              <span className="text-green-500 font-bold">+ ₹50,000</span>
            </li>
            <li className="flex justify-between py-3">
              <span className="text-gray-700 font-medium">Netflix Subscription</span>
              <span className="text-red-500 font-bold">- ₹500</span>
            </li>
          </ul>
          <Link to="/transaction" className="text-teal-500 hover:underline mt-4 block text-right">
            View All Transactions →
          </Link>
        </div>
      </section>


      {/* ✅ Authentication Status */}
      <div className="mt-6 text-center">
        <button className={`px-4 py-2 my-2 rounded-lg ${isAuthenticate ? "bg-green-500" : "bg-red-500"} text-white`}>
          {isAuthenticate ? "Authorized ✅" : "UnAuthorized ❌"}
        </button>
      </div>
    </div>
  );
}

export default Home;
