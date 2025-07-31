import { useState } from "react";
import { useSelector } from "react-redux";
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
  const {cart} = useSelector((state)=>state.cart);
  const {user} = useSelector((state)=>state.auth);

  const cartItemCount = cart?.products?.reduce((total,product)=>total+product.quantity,
  0) || 0;

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
            <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-gray-400 transition-colors duration-300">
              Rabbit
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/collections/all?gender=Men" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300">
              Men
            </Link>
            <Link to="/collections/all?gender=Women" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300">
              Women
            </Link>
            <Link to="/collections/all?Category=Top Wear" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300">
              Top Wear
            </Link>
            <Link to="/collections/all?Category=Bottom wear" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300">
              Bottom Wear
            </Link>
          </div>

          {/* Icons and Mobile Menu Button */}
          <div className="flex items-center space-x-6">
            {user && user.role==="admin"&&(
            <Link to="/admin" className="block bg-black px-2 rounded text-sm text-white">Admin</Link>)}
            <Link to="/profile" className="text-gray-600 hover:text-gray-900 text-xl">
              <HiOutlineUser />
            </Link>
            <button onClick={toggleDrawerOpen} className="relative text-gray-600 hover:text-gray-900 text-xl focus:outline-none">
              <HiOutlineShoppingBag />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
              )}
              
            </button>

            {/* Search Bar and Mobile Menu Icon */}
            <div className="flex items-center space-x-4">
              <div > 
                <SearchBar />
              </div>
              <button onClick={toggleNavDrawerOpen} className="md:hidden text-gray-600 hover:text-gray-900 text-2xl focus:outline-none">
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
            <button onClick={toggleNavDrawerOpen} className="text-gray-600 hover:text-gray-900 text-2xl focus:outline-none">
              <IoMdClose />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex-grow">
            <Link
              to="#"
              onClick={toggleNavDrawerOpen}
              className="block py-3 text-lg font-medium text-gray-800 hover:text-gray-900 border-b border-gray-200 transition-colors duration-300"
            >
              <h2>Menu</h2>
            </Link>
            <Link
              to="/collections/all?gender=Men"
              onClick={toggleNavDrawerOpen}
              className="block py-3 text-lg font-medium text-gray-800 hover:text-gray-900 border-b border-gray-200 transition-colors duration-300"
            >
              <h2>Men</h2>
            </Link>
            <Link
              to="/collections/all?gender=Women"
              onClick={toggleNavDrawerOpen}
              className="block py-3 text-lg font-medium text-gray-800 hover:text-gray-900 border-b border-gray-200 transition-colors duration-300"
            >
              <h2>Women</h2>
            </Link>
            <Link
              to="/collections/all?Category=Top Wear"
              onClick={toggleNavDrawerOpen}
              className="block py-3 text-lg font-medium text-gray-800 hover:text-gray-900 border-b border-gray-200 transition-colors duration-300"
            >
              <h2>Top Wear</h2>
            </Link>
            <Link
              to="/collections/all?Category=Bottom Wear"
              onClick={toggleNavDrawerOpen}
              className="block py-3 text-lg font-medium text-gray-800 hover:text-gray-900 transition-colors duration-300"
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