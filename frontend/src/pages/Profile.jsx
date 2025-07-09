import { useEffect, useState } from "react";
import MyOrders from "../pages/MyOrders"; // Assuming MyOrders is in a 'pages' directory relative to Profile

function Profile() {
  return (
    // Main container for the profile page
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen font-inter rounded-lg ">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left section: User information */}
        <div className="lg:w-1/4 bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center lg:items-start text-center lg:text-left h-[400px]">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">John Doe</h1>
          <p className="text-gray-600 mb-4">john@example.com</p>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105">
            Logout
          </button>
        </div>

        {/* Right section: MyOrders component */}
        <div className="lg:w-3/4">
          <MyOrders />
        </div>
      </div>
    </div>
  );
}

export default Profile;
