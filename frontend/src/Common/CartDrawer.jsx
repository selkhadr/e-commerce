import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent"
import {useNavigate} from "react-router-dom"

function CartDrawer({ drawerOpen, toggleDrawerOpen }) {
  const navigate = useNavigate();
  const handleCheckout = ()=>{
    console.log("ddddd");
    navigate("/checkout");
  };
  return (
    <div
  className={`fixed top-0 right-0 h-full w-full max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50
    ${drawerOpen ? "translate-x-0" : "translate-x-full"}
    md:max-w-md lg:max-w-lg`}
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

      <div className="flex-grow p-1 overflow-y-auto">
        <CartContent/>
      </div>

      <div className="p-4 border-t border-gray-200 flex flex-col space-y-3">
        <div className="flex justify-between items-center text-lg font-semibold">
          <p className="text-gray-700">Total:</p>
          <p className="text-red-400">$0.00</p> {/* Placeholder for total */}
        </div>
        <button onClick={handleCheckout} className="w-full bg-gray-800 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartDrawer;