import React from 'react';
import deliveryPersonImage from '../image.jpg.webp'; // Adjust the path as needed

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-yellow-100 to-blue-100 p-8 md:p-16">
      {/* Dots and floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-32 h-32 bg-orange-400 rounded-full top-10 left-10 opacity-30"></div>
        <div className="absolute w-24 h-24 bg-yellow-500 rounded-full top-40 left-32 opacity-50"></div>
        <div className="absolute w-8 h-8 bg-blue-400 rounded-full bottom-32 right-20 opacity-60"></div>
        {/* Add more floating dots or elements as needed */}
      </div>

      <div className="text-center md:text-left md:w-1/2 relative z-10">
        <p className="text-orange-500 font-semibold mb-2">SIMPLE WAY TO MAKE A ORDER</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Delivered your food in just 30 minutes
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Best home delivery service in India #1
        </p>
        <div className="flex justify-center md:justify-start space-x-4">
          <button className="bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:from-green-500 hover:to-green-700">
            Start Free Trial
          </button>
          <button className="bg-transparent text-blue-500 border border-blue-500 py-3 px-6 rounded-lg hover:bg-blue-500 hover:text-white">
            See Menu
          </button>
        </div>
        <div className="mt-8 text-gray-500 text-sm flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <span>No shipping charge</span>
          <span>100% Secure checkout</span>
        </div>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0 relative z-10">
        <img
          src={deliveryPersonImage}
          alt="Delivery Person"
          className="w-full max-w-sm mx-auto"
        />
        {/* Floating boxes */}
        <div className="absolute top-0 right-10 bg-white shadow-lg p-2 rounded-lg">
          <img src="path-to-order-icon.png" alt="Order Icon" />
          <p className="text-sm">Confirm Your Order</p>
        </div>
        <div className="absolute bottom-20 left-0 bg-white shadow-lg p-2 rounded-lg">
          <p className="text-sm">Any residence, behind mall, Ahmedabad</p>
        </div>
        <div className="absolute bottom-10 right-10 bg-white shadow-lg p-2 rounded-lg flex items-center">
          <img src="path-to-customer-icon.png" alt="Customer Icon" className="w-6 h-6 rounded-full" />
          <p className="ml-2 text-sm">Our Customers</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
