import React from 'react';
import { Link } from 'react-router-dom';
import bgImg0 from '../assets/bg0.jpg'; 
import bgImg1 from '../assets/bg1.jpg'; 
import bgImg2 from '../assets/bg2.jpg'; 
import bgImg3 from '../assets/bg3.jpg'; 
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; 

function NewArrivals() {
    const newArrivals = [
        {
            _id: "1",
            name: "Stylish Belie",
            price: 120,
            images: [
                {
                    url: bgImg0,
                    altText: "stylish"
                }
            ]
        },
        {
            _id: "2",
            name: "Stylish Belie",
            price: 120,
            images: [
                {
                    url: bgImg1,
                    altText: "stylish"
                }
            ]
        },
        {
            _id: "3",
            name: "Stylish Belie",
            price: 120,
            images: [
                {
                    url: bgImg2,
                    altText: "stylish"
                }
            ]
        },
        {
            _id: "4",
            name: "Stylish Belie",
            price: 120,
            images: [
                {
                    url: bgImg3,
                    altText: "stylish"
                }
            ]
        },
        {
            _id: "5",
            name: "Stylish Belie",
            price: 120,
            images: [
                {
                    url: bgImg0,
                    altText: "stylish"
                }
            ]
        },
        {
            _id: "6",
            name: "Stylish Belie",
            price: 120,
            images: [
                {
                    url: bgImg0,
                    altText: "stylish"
                }
            ]
        },
        {
            _id: "7",
            name: "Stylish Belie",
            price: 120,
            images: [
                {
                    url: bgImg0,
                    altText: "stylish"
                }
            ]
        },
        {
            _id: "8",
            name: "Elegant Sandal",
            price: 95,
            images: [
                {
                    url: bgImg0,
                    altText: "elegant sandal"
                }
            ]
        },
        {
            _id: "9",
            name: "Classic Loafer",
            price: 150,
            images: [
                {
                    url: bgImg0,
                    altText: "classic loafer"
                }
            ]
        },
        {
            _id: "10",
            name: "Sporty Sneaker",
            price: 80,
            images: [
                {
                    url: bgImg0,
                    altText: "sporty sneaker"
                }
            ]
        },
    ];

    // Ref for the scrollable container
    const scrollContainerRef = React.useRef(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -scrollContainerRef.current.offsetWidth / 2, // Scroll by half the container width
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: scrollContainerRef.current.offsetWidth / 2, // Scroll by half the container width
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Header and Scroll Buttons */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
                        Explore New Arrivals
                    </h2>
                    <p className="text-lg text-gray-600">Discover the latest styles off the runway</p>
                </div>
                {/* Scroll Buttons - now directly controlling the scroll container */}
                <div className="hidden md:flex space-x-4 mt-6 md:mt-0"> {/* Hide on mobile, show on md+ */}
                    <button
                        onClick={scrollLeft}
                        className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-300"
                    >
                        <FiChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={scrollRight}
                        className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-300"
                    >
                        <FiChevronRight className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Scroll Content (Product Cards) */}
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto pb-4 space-x-6 scrollbar-hide snap-x snap-mandatory"
            >
                {newArrivals.map((product) => (
                    <div
                        key={product._id}
                        className="flex-none w-64 sm:w-72 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 snap-center"
                    >
                        <Link to={`/product/${product._id}`} className="block">
                            <img
                                src={product.images[0]?.url}
                                alt={product.images[0]?.altText || product.name}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                        </Link>
                        <div className="p-4">
                            <Link to={`/product/${product._id}`} className="block">
                                <h4 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                                    {product.name}
                                </h4>
                            </Link>
                            <p className="text-xl font-bold text-gray-900">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Optional: Navigation buttons positioned absolutely for smaller screens */}
            <div className="md:hidden absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-2">
                <button
                    onClick={scrollLeft}
                    className="p-2 rounded-full bg-gray-800 text-white opacity-70 hover:opacity-100 focus:outline-none z-10"
                >
                    <FiChevronLeft className="h-5 w-5" />
                </button>
                <button
                    onClick={scrollRight}
                    className="p-2 rounded-full bg-gray-800 text-white opacity-70 hover:opacity-100 focus:outline-none z-10"
                >
                    <FiChevronRight className="h-5 w-5" />
                </button>
            </div>
        </section>
    );
}

export default NewArrivals;