
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left section with logo and navigation links */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            <span className="text-blue-500">HR</span>Shop
          </h2>
          <nav className="mb-4">s
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Home</a></li>
            </ul>
          </nav>
          <p className="text-sm">bjhdbcbjc.com &copy; 2020</p>
        </div>

        {/* Middle section with contact information */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <span><i className="fas fa-map-marker-alt"></i></span>
              <span>21 Revolution Street, NY, USA</span>
            </li>
            <li className="flex items-center space-x-3">
              <span><i className="fas fa-phone"></i></span>
              <span>+1 9485045958</span>
            </li>
            <li className="flex items-center space-x-3">
              <span><i className="fas fa-envelope"></i></span>
              <span><a href="mailto:support@bbbootstrap.com" className="hover:underline">support@bbbootstrap.com</a></span>
            </li>
          </ul>
        </div>

        {/* Right section with about info and social icons */}
        <div className="mt-8 md:mt-0 flex flex-col items-start  space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-lg font-medium">We Will get you</label>
            <div className="flex space-x-2">
              <input 
                type="email" 
                id="email" 
                placeholder="Your email here" 
                className="p-2 rounded bg-white text-black"
              />
              <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800">Contact</button>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="age" className="w-4 h-4"/>
              <label htmlFor="age" className="text-sm">By checking the box, you agree that you are at least 16 years of age.</label>
            </div>
          </div>
          
          {/* Social media icons */}
          <div className="flex space-x-4 mt-4 text-3xl">
            <a href="#" className="hover:opacity-75"><i className="fab fa-facebook-square"></i></a>
            <a href="#" className="hover:opacity-75"><i className="fab fa-twitter-square"></i></a>
            <a href="#" className="hover:opacity-75"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="hover:opacity-75"><i className="fab fa-github-square"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;