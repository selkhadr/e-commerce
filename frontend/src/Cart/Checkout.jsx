import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import PayPalButton from './PayPalButton';
import { createCheckout } from '../redux/slices/checkoutSlice'; // Adjust the path as needed
// bgImg0 is not used in the JSX, so it can be removed if not needed elsewhere.
// import bgImg0 from '../assets/bg0.jpg'; 
// useNavigate is not used in the JSX, so it can be removed if not needed elsewhere.
// import { useNavigate } from 'react-router-dom';




function Checkout() {
    const [CheckoutId, setCheckoutId]=useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cart, loading,error}=useSelector((state)=>state.cart);
    const {user}=useSelector((state)=>state.auth);


    // const navigate = useNavigate(); // Not used, so commented out
    const [shippingAddess, setshippingAddess]= useState({
        firstName:"",
        lastName:"",
        address:"",
        city:"",
        postalCode:"",
        country:"", // Corrected typo from 'contry'
        phone:"", // Corrected typo from 'phonenumber'
    });

    //ensure cart is loaded before processing
    useEffect(()=>{
        if(!cart||!cart.products||cart.products.length===0){
            navigate("/");
        }
    },[cart,navigate]);

    const handleCreateCheckout=async(e)=>{
        e.preventDefault();
        if(cart && cart.products.length>0){
            const res=await dispatch(
                await createCheckout({
                    checkoutItems:cart.products,
                    shippingAddress,
                    paymentMethod:"Paypal",
                    totalPrice:cart.totalPrice,
                })
            );
            if(res.payload && res.payload._id){
                setCheckoutId(res.payload._id);//set checkout id if chekcout successfully
            }
        }
    }

    const handlePaymentSuccess = async (details)=>{
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
                {paymentStatus:"paid",paymentDetails:details},
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
                await handleFinalizeCheckout(CheckoutId);
        } catch (error) {
            console.error(error);
        }
    }

    const handleFinalizeCheckout = async(CheckoutId)=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
                {},
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );
                navigate("/order-confirmation");
        } catch (error) {
            console.error(error);
        }
    };
    if(loading)return <p>loading cart...</p>;
    if(error)return <p>error:{error}</p>;
    if(!cart || !cart.products || cart.products.length===0)return <p>your cart is empty</p>;


  return (
    // Main container for the checkout page, ensuring full height and centering content
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
        {/* Left section: Checkout form */}
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-6 sm:p-8 md:p-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center">Checkout</h2>
            <form onSubmit={handleCreateCheckout} className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-6">Contact Details</h3>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                        id="email"
                        type="email" 
                        disabled 
                        value={user?user.email:""}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 bg-gray-100 cursor-not-allowed text-gray-600 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base" 
                    />
                </div>

                <h3 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-6 mt-8">Delivery Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input 
                            id="firstName"
                            required
                            onChange={(e)=>setshippingAddess({...shippingAddess,firstName:e.target.value})}
                            value={shippingAddess.firstName} 
                            type="text" 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base" 
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input 
                            id="lastName"
                            required
                            onChange={(e)=>setshippingAddess({...shippingAddess,lastName:e.target.value})}
                            value={shippingAddess.lastName} 
                            type="text" 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base" 
                        />
                    </div>
                </div>
                
                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input 
                        id="address"
                        required
                        onChange={(e)=>setshippingAddess({...shippingAddess,address:e.target.value})}
                        value={shippingAddess.address} 
                        type="text" 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base" 
                    />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input 
                            id="city"
                            required
                            onChange={(e)=>setshippingAddess({...shippingAddess,city:e.target.value})}
                            value={shippingAddess.city} 
                            type="text" 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base" 
                        />
                    </div>
                    <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                        <input 
                            id="postalCode"
                            required
                            onChange={(e)=>setshippingAddess({...shippingAddess,postalcode:e.target.value})}
                            value={shippingAddess.postalcode} 
                            type="text" 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base" 
                        />
                    </div>
                </div>
                
                <div className="mb-4">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input 
                        id="country"
                        required
                        onChange={(e)=>setshippingAddess({...shippingAddess,country:e.target.value})} // Corrected to 'country'
                        value={shippingAddess.country} // Corrected to 'country'
                        type="text" 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base" 
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                        id="phoneNumber"
                        required
                        onChange={(e)=>setshippingAddess({...shippingAddess,phone:e.target.value})} // Corrected to 'phone'
                        value={shippingAddess.phone} // Corrected to 'phone'
                        type="text" 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base" 
                    />
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    {!CheckoutId ? (
                        <button 
                            type="submit" 
                            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out text-lg"
                        >
                            Continue to PayPal
                        </button>
                    ) : (
                        <div className="text-center">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Pay with PayPal</h3>
                            {/* Placeholder for PayPal integration */}
                            <PayPalButton amount={cart.totalPrice} onSuccess={handlePaymentSuccess} 
                            onError={(err)=>alert("payment failled try again ", err)}/>
                        </div>
                    )}
                </div>
            </form>
        </div>
        {/* right section */}
        <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg mb-4"> order summer</h3>
            <div className="border-t py-4 mb-4">
                    {cart.products.map((product, index)=>(
                        <div  key={index} className="flex items-start justify-between py-2 border-b">
                            <div className="flex items-start">
                                <img src={product.image}
                                alt={product.name}
                                className="w-20 h-24 object-cover mr-4" />
                                <div>
                                    <h3 className="text-md">{product.name}</h3>
                                    <p className="text-gray-50">Size: {product.size}</p>
                                    <p className="text-gray-50">Color: {product.color}</p>
                                </div>
                            </div>
                                <p className="text-xl">${product.price?.toLocaleString()}</p>
                        </div>
                    ))}
            </div>
            <div className="flex justify-between items-center text-lg mb-4">
                <p>Subtotal</p>
                <p>${cart.totalPrice?.toLocaleString()}</p>
            </div>
            <div className="flex justify-between items-center text-lg">
                <p>shiping</p>
                <p>free</p>
            </div>
            <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
                <p>total</p>
                <p>
                    ${cart.totalPrice?.toLocaleString()}
                </p>
            </div>
        </div>
    </div>
  )
}

export default Checkout;
