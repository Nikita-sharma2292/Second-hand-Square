import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { filterProducts, resetProducts } from "../../features/productSlice";
import { toast } from 'react-toastify';

const BikesFilters = (props) => {
  const dispatch = useDispatch();

  const { isError, message, isSuccess, isFiltered } = useSelector(state => state.products);

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess && isFiltered) toast.success("Filters applied");

    dispatch(resetProducts());
  }, [isError, isSuccess, message]);

  const [filters, setFilters] = useState({
    Brand: [],
    minPrice: '',
    maxPrice: '',
    Year: '',
    KMdriven: '',
  });

  const filterOptions = {
    Motorcycles: {
      Brand: [
        { value: 'royal enfield', label: 'Royal Enfield' },
        { value: 'ktm', label: 'KTM' },
        { value: 'bajaj', label: 'Bajaj' },
        { value: 'yamaha', label: 'Yamaha' },
        { value: 'hero', label: 'Hero' },
      ],
      Year: [
        { value: '3', label: 'Under 3 Years' },
        { value: '5', label: 'Under 5 Years' },
        { value: '7', label: 'Under 7 Years' },
        { value: '30', label: '7 Years and above' },
      ],
      KMdriven: [
        { value: '10000', label: 'Below 10000 km' },
        { value: '20000', label: 'Below 20000 km' },
        { value: '30000', label: 'Below 30000 km' },
        { value: '3000000', label: '30000 km and Above' }
      ],
      include: ['Brand', 'KMdriven', 'Year', 'Price'],
    },
    Scooters: {
      Brand: [
        { value: 'honda', label: 'Honda' },
        { value: 'vespa', label: 'Vespa' },
        { value: 'tvs', label: 'TVS' },
        { value: 'suzuki', label: 'Suzuki' },
      ],
      Year: [
        { value: '3', label: 'Under 3 Years' },
        { value: '5', label: 'Under 5 Years' },
        { value: '7', label: 'Under 7 Years' },
        { value: '30', label: '7 Years and above' },
      ],
      KMdriven: [
        { value: '10000', label: 'Below 10000 km' },
        { value: '20000', label: 'Below 20000 km' },
        { value: '30000', label: 'Below 30000 km' },
        { value: '3000000', label: '30000 km and Above' }
      ],
      include: ['Brand', 'KMdriven', 'Year', 'Price'],
    },
    "Spare Parts": {
      include: ['Price'],
    },
    Bicycles: {
      Brand: [
        { value: 'adrenix', label: 'Adrenix' },
        { value: 'atlas', label: 'Atlas' },
        { value: 'bsa', label: 'BSA' },
        { value: 'btwin', label: 'BTwin' },
        { value: 'hero', label: 'Hero' },
        { value: 'leader', label: 'Leader' },
        { value: 'montra', label: 'Montra' },
        { value: '', label: 'Other Brands' },
      ],
      include: ['Brand', 'Price'],
    },
  };

  const currentFilters = filterOptions[props.subCategory] || {};

  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category] === value ? '' : value,
    }));
  };

  const handleApplyFilters = () => {
    dispatch(filterProducts(filters));
  };

  return (
    <div className="p-6 bg-gray-50 w-4/12 h-screen rounded-lg shadow-md overflow-auto">
      <h2 className="text-3xl font-bold text-gray-800 pb-3">Filters</h2>
      <h4 className="text-lg font-md border-b pb-4 border-gray-300 text-gray-500 mb-3">
        {props.category} | {props.subCategory}
      </h4>

      {/* Conditionally Render Filters */}
      {currentFilters.include?.includes('Brand') && currentFilters.Brand && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Brand</h3>
          <div className="flex flex-wrap gap-3">
            {currentFilters.Brand.map((brand) => (
              <label
                key={brand.value}
                className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
              >
                <input
                  type="checkbox"
                  value={brand.value}
                  checked={filters.Brand.includes(brand.value)}
                  onChange={() => handleCheckboxChange('Brand', brand.value)}
                  className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
                />
                {brand.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {currentFilters.include?.includes('Price') && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Price Range</h3>
          <div className="flex gap-4">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleInputChange}
              placeholder="Min Price"
              className="w-1/2 p-2 border border-gray-300 rounded-lg"
            />
            <h3 className="text-lg font-md mt-1 text-gray-800">to</h3>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleInputChange}
              placeholder="Max Price"
              className="w-1/2 p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      )}

      {currentFilters.include?.includes('Year') && currentFilters.Year && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Year</h3>
          <div className="flex flex-wrap gap-3">
            {currentFilters.Year.map((year) => (
              <label
                key={year.value}
                className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
              >
                <input
                  type="radio"
                  name="Year"
                  value={year.value}
                  checked={filters.Year === year.value}
                  onChange={() => handleRadioChange('Year', year.value)}
                  className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
                />
                {year.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {currentFilters.include?.includes('KMdriven') && currentFilters.KMdriven && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">KM Driven</h3>
          <div className="flex flex-wrap gap-3">
            {currentFilters.KMdriven.map((km) => (
              <label
                key={km.value}
                className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
              >
                <input
                  type="radio"
                  name="KMdriven"
                  value={km.value}
                  checked={filters.KMdriven === km.value}
                  onChange={() => handleRadioChange('KMdriven', km.value)}
                  className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
                />
                {km.label}
              </label>
            ))}
          </div>
        </div>
      )}


      {/* Apply Filters Button */}
      <div className="flex justify-center">
        <button
          className="w-fit bg-slate-800 mb-6 text-xl text-white py-4 px-6 rounded-lg font-semibold hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default BikesFilters;
