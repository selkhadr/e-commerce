import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function FilterSidebar() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  // Static filter options
  const categories = ["Top Wear", "Bottom Wear", "Footwear", "Accessories"];
  const colors = ["red", "blue", "black", "yellow", "green", "gray", "purple", "white", "orange"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const materials = ["Cotton", "Polyester", "Wool", "Denim", "Leather"];
  const brands = ["LV", "ChicStyle", "UrbanThreads", "SportyGear", "ClassicWear"];
  const genders = ["Men", "Women", "Unisex"];

  // Effect to synchronize filters with URL search parameters
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(',') : [],
      material: params.material ? params.material.split(',') : [],
      brand: params.brand ? params.brand.split(',') : [],
      minPrice: parseInt(params.minPrice) || 0,
      maxPrice: parseInt(params.maxPrice) || 100,
    });
  }, [searchParams]);

  // Effect to update URL search parameters when filters change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    
    for (const key in filters) {
      const value = filters[key];
      if (Array.isArray(value) && value.length > 0) {
        newSearchParams.set(key, value.join(','));
      } else if (typeof value === 'string' && value !== "") {
        newSearchParams.set(key, value);
      } else if (typeof value === 'number') {
        // Always include price values, even if they're defaults
        if (key === 'minPrice' && value !== 0) {
          newSearchParams.set(key, String(value));
        } else if (key === 'maxPrice' && value !== 100) {
          newSearchParams.set(key, String(value));
        }
      }
    }
    setSearchParams(newSearchParams, { replace: true });
  }, [filters, setSearchParams]);

  // Handler for all filter changes (radio, checkbox, text)
  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newFilter = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilter[name] = [...(newFilter[name] || []), value];
      } else {
        newFilter[name] = newFilter[name].filter((item) => item !== value);
      }
    } else {
      newFilter[name] = value;
    }
    setFilters(newFilter);
    console.log(newFilter);
  };

  // Handler for color button clicks
  const handleColorChange = (color) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      color: prevFilters.color === color ? "" : color
    }));
  };

  // Fixed price change handler
  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value);
    const newFilter = {
      ...filters,
      maxPrice: newPrice
    };
    setFilters(newFilter);
    console.log("Price changed:", newFilter);
  };

  return (
    <div className="w-full md:w-64 p-4 bg-white rounded-lg shadow-md font-sans flex flex-col space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Filters</h3>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="block text-lg font-semibold text-gray-700">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center">
            <input
              type="radio"
              id={`category-${category}`}
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={handleFilterChange}
              className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 rounded-full"
            />
            <label htmlFor={`category-${category}`} className="ml-2 text-gray-600 text-base cursor-pointer">
              {category}
            </label>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="space-y-2">
        <label className="block text-lg font-semibold text-gray-700">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center">
            <input
              type="radio"
              id={`gender-${gender}`}
              name="gender"
              value={gender}
              checked={filters.gender === gender}
              onChange={handleFilterChange}
              className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 rounded-full"
            />
            <label htmlFor={`gender-${gender}`} className="ml-2 text-gray-600 text-base cursor-pointer">
              {gender}
            </label>
          </div>
        ))}
      </div>

      {/* Color Filter */}
      <div className="space-y-2">
        <label className="block text-lg font-semibold text-gray-700">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ease-in-out
                ${filters.color === color ? 'ring-2 ring-blue-500 ring-offset-2' : 'border-gray-300 hover:border-blue-400'}`}
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            >
              {filters.color === color && (
                <span className="text-white text-xs font-bold flex items-center justify-center h-full">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="space-y-2">
        <label className="block text-lg font-semibold text-gray-700">Size</label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {sizes.map((size) => (
            <div key={size} className="flex items-center">
              <input
                type="checkbox"
                id={`size-${size}`}
                name="size"
                value={size}
                checked={filters.size.includes(size)}
                onChange={handleFilterChange}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 rounded"
              />
              <label htmlFor={`size-${size}`} className="ml-2 text-gray-600 text-base cursor-pointer">
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Material Filter */}
      <div className="space-y-2">
        <label className="block text-lg font-semibold text-gray-700">Material</label>
        <div className="grid grid-cols-2 gap-2">
          {materials.map((material) => (
            <div key={material} className="flex items-center">
              <input
                type="checkbox"
                id={`material-${material}`}
                name="material"
                value={material}
                checked={filters.material.includes(material)}
                onChange={handleFilterChange}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 rounded"
              />
              <label htmlFor={`material-${material}`} className="ml-2 text-gray-600 text-base cursor-pointer">
                {material}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="space-y-2">
        <label className="block text-lg font-semibold text-gray-700">Brand</label>
        <div className="grid grid-cols-2 gap-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center">
              <input
                type="checkbox"
                id={`brand-${brand}`}
                name="brand"
                value={brand}
                checked={filters.brand.includes(brand)}
                onChange={handleFilterChange}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 rounded"
              />
              <label htmlFor={`brand-${brand}`} className="ml-2 text-gray-600 text-base cursor-pointer">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input 
          type="range"
          name="maxPrice"
          min={0}
          max={100}
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer" 
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>${filters.minPrice}</span>
          <span>${filters.maxPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;