import { useEffect, useState } from 'react';
import ProductGrid from './ProductGrid';
import toast from 'react-hot-toast'; // Assuming you are using react-hot-toast for toasts
import { useParams } from 'react-router-dom';
import { fetchProductDetails, fetchSimilarProducts } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';

import { useSelector } from "react-redux";


function ProductDetails({productId}) {
    const {id}=useParams();
    const dispatch = useDispatch();
    const {selectedProduct,loading, error,similarProducts}=useSelector((state)=>state.products);
    const {user, guestId} = useSelector((state)=>state.auth);
    const [mainImg, setMainImg] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisable, setIsButtonDisable] = useState(false);

    const productFetchId = productId || id;

    useEffect(()=>{
        if(productFetchId){
            dispatch(fetchProductDetails(productFetchId));
            dispatch(fetchSimilarProducts({id:productFetchId}));
        }
    },[dispatch,productFetchId]);

    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImg(selectedProduct.images[0].url);
        }
    }, [selectedProduct]);

    const handleQuantityChange = (action) => {
        if (action === "plus") {
            setQuantity((prev) => prev + 1);
        }
        if (action === "minus" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.error("Please select a size and color before adding to cart!", { duration: 2000 });
            return;
        }

        setIsButtonDisable(true);
        
        dispatch(addToCart({
            productId:productFetchId,
            quantity,
            size:selectedSize,
            color:selectedColor,
            guestId,
            userId:user?._id,
        }))
        .then(()=>{
            toast.success("product added to cart",{
                duration:1000,
            });
        })
        .finally(()=> {
            setIsButtonDisable(false);
        })
    };

    if(loading){
        return <p>loading...</p>
    }
    if(error){
        return <p>error:{error}</p>
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            {selectedProduct &&(
            <>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Side: Image Gallery */}
                    <div className="lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
                        {/* Desktop Thumbnails (hidden on mobile, shown on md and above) */}
                        <div className="hidden md:flex flex-col gap-2 overflow-y-auto max-h-[650px]">
                            {selectedProduct.images.map((image, index) => (
                                <img
                                    src={image.url}
                                    alt={image.alt || `Product thumbnail ${index + 1}`}
                                    key={index}
                                    className={`w-20 h-20 object-cover cursor-pointer border-2 ${mainImg === image.url ? "border-black" : "border-gray-300"} rounded-md transition-all duration-200 hover:border-black`}
                                    onClick={() => setMainImg(image.url)}
                                />
                            ))}
                        </div>

                        {/* Main Product Image */}
                        <div className="flex-1 flex justify-center items-center rounded-lg overflow-hidden shadow-lg h-[650px] w-full">
                            <img
                                src={mainImg}
                                alt={selectedProduct.name}
                                className="w-full h-full object-cover"
                            />
                        </div>


                        {/* Mobile Thumbnails (shown on mobile, hidden on md and above) */}
                        <div className="md:hidden flex overflow-x-auto gap-2 p-2 bg-gray-100 rounded-lg">
                            {selectedProduct.images.map((image, index) => (
                                <img
                                    src={image.url}
                                    alt={image.alt || `Product thumbnail ${index + 1}`}
                                    key={index}
                                    className={`w-16 h-16 object-cover cursor-pointer border-2 ${mainImg === image.url ? "border-black" : "border-gray-300"} rounded-md flex-shrink-0 transition-all duration-200 hover:border-black`}
                                    onClick={() => setMainImg(image.url)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Product Details */}
                    <div className="flex-1 p-4 md:p-6 bg-white rounded-lg shadow-md h-[650px]">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 leading-tight">
                            {selectedProduct.name}
                        </h1>

                        {selectedProduct.originalPrice && (
                            <p className="text-xl text-gray-500 line-through mb-1">
                                ${selectedProduct.originalPrice.toFixed(2)}
                            </p>
                        )}
                        <p className="text-4xl font-bold text-indigo-700 mb-4">
                            ${selectedProduct.price.toFixed(2)}
                        </p>

                        <p className="text-gray-600 leading-relaxed mb-6">
                            {selectedProduct.description}
                        </p>

                        {/* Color Selection */}
                        <div className="mb-6">
                            <p className="text-lg font-semibold text-gray-700 mb-2">Color:</p>
                            <div className="flex gap-3 flex-wrap">
                                {selectedProduct.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${selectedColor === color ? "border-indigo-600 ring-2 ring-indigo-300" : "border-gray-300 hover:border-gray-500"}`}
                                        style={{ backgroundColor: color.toLowerCase() }}
                                        title={color}
                                    ></button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="mb-6">
                            <p className="text-lg font-semibold text-gray-700 mb-2">Size:</p>
                            <div className="flex gap-3 flex-wrap">
                                {selectedProduct.sizes.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSelectedSize(s)}
                                        className={`px-4 py-2 border rounded-lg text-lg font-medium transition-all duration-200 ${selectedSize === s ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                                    >
                                        {s.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Control */}
                        <div className="mb-8">
                            <p className="text-lg font-semibold text-gray-700 mb-2">Quantity:</p>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => handleQuantityChange("minus")}
                                    className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-700 text-2xl font-bold rounded-lg hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={quantity === 1}
                                >
                                    -
                                </button>
                                <span className="text-2xl font-bold text-gray-800 w-12 text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange("plus")}
                                    className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-700 text-2xl font-bold rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-4 bg-indigo-700 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-indigo-800 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                            disabled={isButtonDisable || !selectedSize || !selectedColor}
                        >
                            {isButtonDisable ? "Adding..." : "ADD TO CART"}
                        </button>
                    </div>
                </div>
                <div className="mt-20">
                    <h2 className="text-2xl text-center font-medium mb-4">
                        You may also like
                    </h2>
                    <ProductGrid products={similarProducts} loading={loading} error={error}/>
                </div>
            </>
            )}
        </div>
    );
}

export default ProductDetails;