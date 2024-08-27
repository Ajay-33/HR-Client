import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Left side: Logo or Brand Name */}
        <div className="text-3xl font-bold text-gray-800">
          HR <span className="text-red-500">Shop</span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/tracking"
            className="text-gray-700 hover:text-red-500 transition duration-300"
          >
            Tracking
          </Link>
          <Link
            to="/find-box"
            className="text-gray-700 hover:text-red-500 transition duration-300"
          >
            Find Box
          </Link>
          <Link
            to="/store"
            className="text-gray-700 hover:text-red-500 transition duration-300"
          >
            Store
          </Link>
          <Link
            to="/location"
            className="text-gray-700 hover:text-red-500 transition duration-300"
          >
            Location
          </Link>
        </nav>

        {/* Right side: Login/Signup Buttons */}
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="border border-gray-500 text-gray-800 py-2 px-4 rounded-xl hover:bg-gray-100 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 transition duration-300"
          >
            Signup
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden bg-gray-100 px-4 py-2">
        <nav className="flex justify-between text-lg text-gray-600">
          <Link to="/" className="hover:text-red-500 transition duration-300">
            LinkedIn
          </Link>
          <Link
            to="/github"
            className="hover:text-red-500 transition duration-300"
          >
            Github
          </Link>
          <Link
            to="/twitter"
            className="hover:text-red-500 transition duration-300"
          >
            Twitter
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
