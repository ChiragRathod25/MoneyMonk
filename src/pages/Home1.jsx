import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../components";
import { Link } from "react-router-dom";

function Home() {
  const isAuthenticate = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const userName = useSelector((state) => state.auth.userData?.name);
  
  // Get current hour for greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="-5000 min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
      
      {/* Hero Section */}
      <div className="w-full text-center py-16">
        <h1 className="text-4xl font-extrabold">{greeting}, {userName} 👋</h1>
        <p className="mt-2 text-lg text-gray-200">Manage your expenses smartly and take control of your finances.</p>
        <div className="mt-6">
          <Link to="transaction/expense">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg shadow-lg mr-4">
              Add Expense
            </Button>
          </Link>
          <Link to="transaction/income">
            <Button className="bg-green-400 hover:bg-green-500 text-black font-semibold py-2 px-6 rounded-lg shadow-lg">
              Add Income
            </Button>
          </Link>
        </div>
      </div>
      

      {/* Feature Highlights */}
      <div className="w-full max-w-4xl p-6 bg-white rounded-2xl shadow-lg text-gray-900 mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Why Use Our Finance Tracker?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg">📊 Insights</h3>
            <p className="text-sm">Track your spending habits and get reports.</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg">🔔 Alerts</h3>
            <p className="text-sm">Never miss a bill payment with smart reminders.</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg">💰 Savings</h3>
            <p className="text-sm">Optimize your savings with budget tracking.</p>
          </div>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="w-full max-w-4xl p-6 bg-white rounded-2xl shadow-lg text-gray-900 mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Recent Transactions</h2>
        <p className="text-center text-gray-500">No transactions yet. Start by adding one! 💸</p>
      </div>

      {/* Authentication Status */}
      <div className="mt-6">
        <button className={`px-4 py-2 rounded-lg ${isAuthenticate ? "bg-green-500" : "bg-red-500"}`}>
          {isAuthenticate ? "Authorized ✅" : "UnAuthorized ❌"}
        </button>
      </div>
    </div>
  );
}

export default Home;
