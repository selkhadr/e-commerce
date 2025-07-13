import { useState } from "react";
import { useDispatch } from "react-redux";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { fetchProductsByFilters, setFilters } from "../redux/slices/productsSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setSearchTerm("");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({search: searchTerm}));
    dispatch(fetchProductsByFilters({search:searchTerm}));
    navigate(`/collections/all?search=${searchTerm}`);
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center">
      {isOpen ? (
        // Modified: Position and background for open search bar
        <div className="fixed top-0 left-0 w-full bg-white bg-opacity-95 p-6 z-40 transition-all duration-7000"> 
          <form onSubmit={handleSearch} className="container mx-auto flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus={isOpen} 
              disabled={!isOpen} 
              className="flex-grow p-2 border border-gray-600 rounded-md focus:outline-none"
            />

            <button
              type="submit"
              className="p-2 text-white bg-gray-800 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <HiMagnifyingGlass className="h-5 w-5" />
            </button>

            {/* Toggle/Close Button */}
            <button
              type="button"
              onClick={handleSearchToggle}
              className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <HiMiniXMark className="h-5 w-5" />
            </button>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleSearchToggle}
          className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <HiMagnifyingGlass className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;