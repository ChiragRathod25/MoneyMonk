import React, { useState } from "react";
import { Button } from "../";
import { Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import { Menu, X } from "lucide-react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* App Logo */}
        <div className="text-2xl font-bold" onClick={()=>navigate("/")}>
          {/* <Link to="/">💰 MoneyMonk</Link> */}
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="h-22 w-auto" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {!authStatus ? (
            <>
              <Link to="/register">
                <Button className="bg-teal-400 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg shadow">
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg shadow">
                  Login
                </Button>
              </Link>
            </>
          ) : (
            <LogoutBtn />
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white text-gray-800 shadow-lg rounded-b-lg py-4">
          {!authStatus ? (
            <>
              <Link
                to="/register"
                className="block px-6 py-2 hover:bg-gray-200"
              >
                Sign Up
              </Link>
              <Link to="/login" className="block px-6 py-2 hover:bg-gray-200">
                Login
              </Link>
            </>
          ) : (
            <div className="px-6">
              <LogoutBtn />
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Header;
