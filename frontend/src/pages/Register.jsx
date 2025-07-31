import  { useEffect, useState } from 'react';
// Assuming 'Link' is from react-router-dom or a similar library for navigation
import { Link, useLocation, useNavigate } from 'react-router-dom';
// The user's original image import. Note: In the Canvas environment,
// relative paths like '../assets/bg0.jpg' will not resolve.
// For demonstration, a placeholder image URL is used below.
import { registerUser } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from '../redux/slices/cartSlice';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {user,guestId, loading}=useSelector((state)=>state.auth);
    const {cart} = useSelector((state)=>state.cart);

    //get redirect parameter and check if it-s checkout or someting
    const redirect = new URLSearchParams(location.search).get("redirect")||"/";
    const isCheckoutRedirect = redirect.includes("checkout");

    useEffect(()=>{
        if(user){
            if(cart?.products.length>0&&guestId){
                dispatch(mergeCart({guestId,user})).then(()=>{
                    navigate(isCheckoutRedirect?"/checkout":"/");
                });
            }else{
                navigate(isCheckoutRedirect?"/checkout":"/")
            }
        }
    },[user,guestId,cart,navigate,isCheckoutRedirect,dispatch]);


    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        dispatch(registerUser({name,email,password}));
        // Implement your login logic here (e.g., API call)
    };

    return (
        // Main container: full screen height, flex layout for two columns on medium screens and up
        <div className="min-h-screen flex flex-col md:flex-row font-inter">
            {/* Left section: Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-white">
                <form onSubmit={handleSubmit} className="w-full max-w-md p-6 sm:p-8 rounded-xl">
                    {/* Header section */}
                    <div className="text-center mb-6">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Rabbit</h2>
                        <h2 className="text-2xl font-semibold text-gray-800">Hey there!</h2>
                        <p className="text-gray-600 mt-2">Enter your username and password to login</p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name "
                            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 ease-in-out bg-gray-50"
                            required
                        />
                    </div>

                    {/* Email input group */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 ease-in-out bg-gray-50"
                            required
                        />
                    </div>

                    {/* Password input group */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 ease-in-out bg-gray-50"
                            required
                        />
                    </div>

                    {/* Sign In button */}
                    <div className="flex items-center justify-center mb-4">
                        <button
                            type="submit"
                            className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 w-full"
                        >
                            { loading? "loading" : "Sign up"}
                        </button>
                    </div>

                    {/* Register link */}þ
                    <p className="text-center text-gray-600 text-sm">
                        already have an account ?{' '}
                        <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-gray-800 hover:underline font-semibold">
                            login
                        </Link>
                    </p>
                </form>
            </div>

            {/* Right section: Background Image (hidden on small screens, block on medium and up) */}
            <div className="hidden md:block md:w-1/2 bg-gray-200">
                <img
                    // Using a placeholder image for demonstration in the Canvas environment.
                    // In your actual project, 'bgImg0' from '../assets/bg0.jpg' would be used.
                    src="https://placehold.co/800x1000/000000/FFFFFF?text=Login+Image"
                    alt="Abstract background"
                    className="w-full h-full object-cover rounded-l-lg md:rounded-none"
                    // Fallback in case the image fails to load
                    onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = "https://placehold.co/800x1000/CCCCCC/000000?text=Image+Not+Found";
                    }}
                />
            </div>
        </div>
    );
}

export default Register;
