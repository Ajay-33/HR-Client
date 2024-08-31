import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/")
  }
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-2 px-4">
        {/* Left side: Logo or Brand Name */}
        <div className="text-3xl font-bold text-gray-800">
          HR <span className="text-purple-700">Shop</span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-gray-800 hover:text-purple-700 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/find-box"
            className="text-gray-800 hover:text-purple-700 transition duration-300"
          >
            LinkedIn
          </Link>
          <Link
            to="/store"
            className="text-gray-800 hover:text-purple-700 transition duration-300"
          >
            Twitter
          </Link>
          <Link
            to="/location"
            className="text-gray-800 hover:text-purple-700 transition duration-300"
          >
            Github
          </Link>
        </nav>

        {!localStorage.getItem("token")?(<div className="flex space-x-4">
          <Link
            to="/login"
            className="border border-gray-500 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-full transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-purple-800 text-white py-1 px-3 rounded-full hover:bg-purple-600 transition duration-300"
          >
            Signup
          </Link>
        </div>):(<div
            onClick={handleLogout}
            className="border cursor-pointer border-gray-500 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-full transition duration-300"
          >
            Logout
          </div>)}

      </div>


      {/* Mobile Menu */}
      <div className="md:hidden bg-gray-100 px-4 py-2">
        <nav className="flex justify-between text-lg text-gray-700">
          <Link to="/" className="hover:text-blue-500 transition duration-300">
            LinkedIn
          </Link>
          <Link
            to="/github"
            className="hover:text-blue-500 transition duration-300"
          >
            Github
          </Link>
          <Link
            to="/twitter"
            className="hover:text-blue-500 transition duration-300"
          >
            Twitter
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
