import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-4 px-5">
      <div className="container mx-auto flex justify-between gap-8">
        {/* Left section with logo and navigation links */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4">
          HR <span className="text-purple-700">Shop</span>
          </h2>
          <nav className="mb-4">
            <ul className="space-y-2 text-sm">
              <li><Link to={"/"} className="hover:text-purple-700 transition duration-300">Home</Link></li>
              <li><Link to={"/"} className="hover:text-purple-700 transition duration-300">Services</Link></li>
              <li><Link to={"/"} className="hover:text-purple-700 transition duration-300">About Us</Link></li>
              <li><Link to={"/"} className="hover:text-purple-700 transition duration-300">Contact</Link></li>
            </ul>
          </nav>
          <p className="text-xs text-gray-500">&copy; 2024 hrshop.com. All rights reserved.</p>
        </div>

        {/* Middle section with contact information */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center space-x-3">
              <span><i className="fas fa-map-marker-alt text-purple-700"></i></span>
              <span>21 Revolution Street, NY, USA</span>
            </li>
            <li className="flex items-center space-x-3">
              <span><i className="fas fa-phone text-purple-700"></i></span>
              <span>+1 948 504 5958</span>
            </li>
            <li className="flex items-center space-x-3">
              <span><i className="fas fa-envelope text-purple-700"></i></span>
              <span><a href="mailto:support@hrshop.com" className="hover:text-purple-700 transition duration-300">support@hrshop.com</a></span>
            </li>
          </ul>
        </div>

        {/* Right section with subscription form and social icons */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email here"
                className="p-2 rounded bg-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
              <button className="bg-purple-800 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-300">Subscribe</button>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <input type="checkbox" id="age" className="w-4 h-4 bg-gray-200 border-gray-500 focus:ring-purple-700"/>
              <label htmlFor="age" className="text-gray-600">By subscribing, you confirm that you are at least 16 years old.</label>
            </div>
          </div>

          {/* Social media icons */}
          <div className="flex space-x-4 mt-6 text-2xl">
            <Link to={"/"} className="hover:text-purple-700 transition duration-300"><i className="fab fa-facebook-square"></i></Link>
            <Link to={"/"} className="hover:text-purple-700 transition duration-300"><i className="fab fa-twitter-square"></i></Link>
            <Link to={"/"} className="hover:text-purple-700 transition duration-300"><i className="fab fa-linkedin"></i></Link>
            <Link to={"/"} className="hover:text-purple-700 transition duration-300"><i className="fab fa-github-square"></i></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
