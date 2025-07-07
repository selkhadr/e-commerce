import React from 'react';
// Importing icons from react-icons/fa (Font Awesome)
import { FaFacebook, FaInstagram, FaTwitter, FaPhone } from 'react-icons/fa';

// Main Footer component as required
const Footer = () => { // Renamed from Footer to Footer as per React Footer structure
  return (
      <footer className="bg-gray-800 text-gray-200 py-12 px-4 sm:px-6 lg:px-8 rounded-t-lg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-center md:text-left">

          {/* Newsletter Section */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-xl font-semibold mb-3 text-white">Newsletter</h3>
            <p className="text-sm mb-2">Be the first to hear about us</p>
            <p className="text-sm mb-4">Sign up</p>
            <form className="flex flex-col items-center md:items-start space-y-3">
              <input
                type="email"
                placeholder="Enter your mail"
                required
                className="w-full max-w-xs p-2 rounded-md bg-gray-800 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button
                type="submit"
                className="w-full max-w-xs bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Shop Section */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-xl font-semibold mb-3 text-white">Shop</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition duration-200 ease-in-out">Men's Top Wear</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-200 ease-in-out">Women's Top Wear</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-200 ease-in-out">Men's Bottom Wear</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-200 ease-in-out">Women's Bottom Wear</a></li>
            </ul>
          </div>

          {/* About/Contact Section */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-xl font-semibold mb-3 text-white">Information</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition duration-200 ease-in-out">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-200 ease-in-out">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-200 ease-in-out">FAQs</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-200 ease-in-out">Features</a></li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-xl font-semibold mb-3 text-white">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition duration-200 ease-in-out">
                <FaFacebook size={24} /> {/* Changed from Facebook */}
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition duration-200 ease-in-out">
                <FaInstagram size={24} /> {/* Changed from Instagram */}
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition duration-200 ease-in-out">
                <FaTwitter size={24} /> {/* Changed from Twitter */}
              </a>
            </div>
          </div>

          {/* Call Us Section */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-xl font-semibold mb-3 text-white">Call Us</h3>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <FaPhone size={20} className="text-gray-400" /> {/* Changed from Phone */}
              <p className="text-lg">0654545</p>
            </div>
          </div>

        </div>
        <div className="mt-10 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </footer>
  );
};

export default Footer; // Exporting Footer as default
