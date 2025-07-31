import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterSidebar from "../Products/FilterSidebar"; // Assuming these components exist
import SortOptions from "../Products/SortOptions"; // Assuming these components exist
import ProductGrid from "../Products/ProductGrid"; // Assuming these components exist
import { FaFilter } from "react-icons/fa"; // Assuming you have react-icons installed
import { useParams, useSearchParams } from "react-router-dom";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

// Placeholder images for demonstration. In a real app, import your actual images.

function CollectionPage() {

  const {collection}=useParams();
  const {searchParams}=useSearchParams();
  const dispatch = useDispatch();
  const {products,loading,error}=useSelector((state)=>state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(()=>{
    dispatch(fetchProductsByFilters({collection,...queryParams}));
  },[dispatch,collection,searchParams]);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Filter Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-40 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-200"
        aria-label="Toggle Filter Sidebar"
      >
        <FaFilter className="text-xl" />
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 transform transition-transform h-full overflow-y-auto duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:w-64 md:flex-shrink-0 md:shadow-none md:border-r md:border-gray-200
        `}
      >
        <div className="p-4">
          <FilterSidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-3">All Collections</h2>
        <div className="mb-6">
          <SortOptions />
        </div>
        <div>
          <ProductGrid products={products} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}



export default CollectionPage;