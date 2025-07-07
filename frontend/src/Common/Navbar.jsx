import { useState } from "react";
import { Link } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineUser, HiOutlineMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io"; 
import SearchBar from "./SearchBar";
 import CartDrawer from "./CartDrawer"; 

const Navbar = () => {
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const toggleNavDrawerOpen = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      {/* Modified: z-index of the navbar */}
      <nav className="bg-white shadow-md p-4 sticky top-0 z-30"> 
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="#" className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition-colors duration-300">
              Rabbit
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-300">
              Men
            </Link>
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-300">
              Women
            </Link>
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-300">
              Top Wear
            </Link>
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-300">
              Bottom Wear
            </Link>
          </div>

          {/* Icons and Mobile Menu Button */}
          <div className="flex items-center space-x-6">
            <Link to="#" className="text-gray-600 hover:text-indigo-600 text-xl">
              <HiOutlineUser />
            </Link>
            <button onClick={toggleDrawerOpen} className="relative text-gray-600 hover:text-indigo-600 text-xl focus:outline-none">
              <HiOutlineShoppingBag />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                4
              </span>
            </button>

            {/* Search Bar and Mobile Menu Icon */}
            <div className="flex items-center space-x-4">
              <div > 
                <SearchBar />
              </div>
              <button onClick={toggleNavDrawerOpen} className="md:hidden text-gray-600 hover:text-indigo-600 text-2xl focus:outline-none">
                <HiOutlineMenu />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Drawer (assuming it's a separate component) */}
     <CartDrawer drawerOpen={drawerOpen} toggleDrawerOpen={toggleDrawerOpen} /> 

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${navDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Close Button for Mobile Drawer */}
          <div className="flex justify-end mb-8">
            <button onClick={toggleNavDrawerOpen} className="text-gray-600 hover:text-indigo-600 text-2xl focus:outline-none">
              <IoMdClose />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex-grow">
            <Link
              to="#"
              onClick={toggleNavDrawerOpen}
              className="block py-3 text-lg font-medium text-gray-800 hover:text-indigo-600 border-b border-gray-200 transition-colors duration-300"
            >
              <h2>Menu</h2>
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawerOpen}
              className="block py-3 text-lg font-medium text-gray-800 hover:text-indigo-600 border-b border-gray-200 transition-colors duration-300"
            >
              <h2>Men</h2>
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawerOpen}
              className="block py-3 text-lg font-medium text-gray-800 hover:text-indigo-600 border-b border-gray-200 transition-colors duration-300"
            >
              <h2>Women</h2>
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawerOpen}
              className="block py-3 text-lg font-medium text-gray-800 hover:text-indigo-600 border-b border-gray-200 transition-colors duration-300"
            >
              <h2>Top Wear</h2>
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawerOpen}
              className="block py-3 text-lg font-medium text-gray-800 hover:text-indigo-600 transition-colors duration-300"
            >
              <h2>Bottom Wear</h2>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;