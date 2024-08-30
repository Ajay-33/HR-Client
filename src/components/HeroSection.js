import React from 'react';
import deliveryPersonImage from '../image7.png'; // Adjust the path as needed

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-between  text-white p-8 md:p-16">
      {/* Dots and floating elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-40 h-40 bg-pink-500 rounded-full top-16 left-16 opacity-20 blur-lg animate-pulse"></div>
        <div className="absolute w-32 h-32 bg-yellow-500 rounded-full top-48 left-40 opacity-30 blur-lg animate-pulse"></div>
        <div className="absolute w-12 h-12 bg-blue-500 rounded-full bottom-32 right-28 opacity-40 blur-lg animate-pulse"></div>
        <div className="absolute w-8 h-8 bg-green-400 rounded-full bottom-16 right-16 opacity-50 blur-md animate-ping"></div>
        {/* Add more floating dots or elements as needed */}
      </div>

      <div className="text-center md:text-left md:w-1/2 relative z-10">
        <p className="text-pink-400 font-semibold mb-2 tracking-wide">
        NEXT-GEN TALENT SOURCING
        </p>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
        Revolutionize Talent Acquisition with HR Shop
        </h1>
        <p className="text-lg text-gray-200 mb-6">
        Harness our AI search engine to meet your talent needs efficiently and at scale.
        </p>
        <div className="flex justify-center md:justify-start space-x-4">
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-8 rounded-full shadow-lg hover:from-cyan-400 hover:to-blue-500 transition duration-300 transform hover:scale-105">
            Start Free Trial
          </button>
          <button className="bg-transparent text-white border border-white py-3 px-8 rounded-full hover:bg-white hover:text-indigo-900 transition duration-300 transform hover:scale-105">
            Contact Us
          </button>
        </div>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0 relative z-10">
        <img
          src={deliveryPersonImage}
          alt="Delivery Person"
          className="w-full max-w-md mx-auto  filter drop-shadow-lg rounded-3xl transform hover:scale-105 transition duration-500"
        />

      </div>
    </div>
  );
};

export default HeroSection;
