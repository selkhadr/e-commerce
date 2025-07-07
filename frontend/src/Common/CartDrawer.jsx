import { IoMdClose } from "react-icons/io";
import CartContent from "./CartContent"

function CartDrawer({ drawerOpen, toggleDrawerOpen }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50
        ${drawerOpen ? "translate-x-0" : "translate-x-full"}
        md:w-96`} 
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
        <button
          onClick={toggleDrawerOpen}
          className="text-gray-500 hover:text-gray-700 focus:outline-none text-2xl"
        >
          <IoMdClose />
        </button>
      </div>

      <div className="flex-grow p-4 overflow-y-auto">
        <CartContent/>
      </div>

      <div className="p-4 border-t border-gray-200 flex flex-col space-y-3">
        <div className="flex justify-between items-center text-lg font-semibold">
          <p className="text-gray-700">Total:</p>
          <p className="text-red-400">$0.00</p> {/* Placeholder for total */}
        </div>
        <button className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartDrawer;