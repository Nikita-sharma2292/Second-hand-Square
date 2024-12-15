import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { filterProducts, resetProducts } from "../../features/productSlice";
import { toast } from 'react-toastify';

const CarsFilters = (props) => {
  const dispatch = useDispatch();

  const { isError, message, isSuccess, isFiltered } = useSelector(state => state.products);

  useEffect(() => {
    if (isError)
      toast.error(message);

    if(isSuccess && isFiltered)
      toast.success("Filters applied");

    dispatch(resetProducts());
  }, [isError, isSuccess, message])

  const [filters, setFilters] = useState({
    Brand: [],
    Fuel: [],
    minPrice: '',
    maxPrice: '',
    Year: '',
    KMdriven: '',
    Transmission: '',
    NoOfOwners: []
  });

  const filterOptions = {
    Brand: [
      { value: 'maruti', label: 'Maruti' },
      { value: 'hyundai', label: 'Hyundai' },
      { value: 'mahindra', label: 'Mahindra' },
      { value: 'honda', label: 'Honda' },
      { value: 'tata', label: 'Tata' },
      { value: 'toyota', label: 'Toyota' },
      { value: 'ford', label: 'Ford' },
    ],
    Fuel: [
      { value: 'petrol', label: 'Petrol' },
      { value: 'diesel', label: 'Diesel' },
      { value: 'cng', label: 'CNG' },
      { value: 'cng and hybrids', label: 'CNG and Hybrids' },
      { value: 'electric', label: 'Electric' },
    ],
    Year: [
      { value: '3', label: 'Under 3 Years' },
      { value: '5', label: 'Under 5 Years' },
      { value: '7', label: 'Under 7 Years' },
      { value: '30', label: '7 Years and above' },
    ],
    KMdriven: [
      { value: '25000', label: 'Below 25000 km' },
      { value: '50000', label: 'Below 50000 km' },
      { value: '75000', label: 'Below 75000 km' },
      { value: '100000', label: 'Below 100000 km' },
      { value: '1000000', label: '100000 km and Above'}
    ],
    Transmission: [
      { value: 'manual', label: 'Manual' },
      { value: 'automatic', label: 'Automatic' },
    ],
    NoOfOwners: [
      { value: '1st', label: 'First Owner' },
      { value: '2nd', label: 'Second Owner' },
      { value: '3rd', label: 'Third Owner' },
      { value: '4th', label: 'Fourth Owner' },
      { value: '4+', label: 'Above Fourth' },
    ],
  };

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
    <div className="p-6 bg-gray-50 w-4/12 h-screen auto rounded-lg shadow-md overflow-auto">
      <h2 className="text-3xl font-bold text-gray-800 pb-3">Filters</h2>
      <h4 className="text-lg font-md border-b pb-4 border-gray-300 text-gray-500 mb-3">{props.category} | {props.subCategory}</h4>

      {/* Brand Filter */}
      <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Brand</h3>
        <div className="flex flex-wrap gap-3">
          {filterOptions.Brand.map((brand) => (
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

      <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Fuel</h3>
        <div className="flex flex-wrap gap-3">
          {filterOptions.Fuel.map((fuel) => (
            <label
              key={fuel.value}
              className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
            >
              <input
                type="checkbox"
                value={fuel.value}
                checked={filters.Fuel.includes(fuel.value)}
                onChange={() => handleCheckboxChange('Fuel', fuel.value)}
                className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
              />
              {fuel.label}
            </label>
          ))}
        </div>
      </div>

      {/* Budget Filter */}
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

      {/* Year Filter */}
      <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Year</h3>
        <div className="flex flex-wrap gap-3">
          {filterOptions.Year.map((year) => (
            <label
              key={year.value}
              className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
            >
              <input
                type="radio"
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

      {/* KM Driven Filter */}
      <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">KM Driven</h3>
        <div className="flex flex-wrap gap-3">
          {filterOptions.KMdriven.map((range) => (
            <label
              key={range.value}
              className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
            >
              <input
                type="radio"
                value={range.value}
                checked={filters.KMdriven === range.value}
                onChange={() => handleRadioChange('KMdriven', range.value)}
                className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>

      {/* Transmission Filter */}
      <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Transmission</h3>
        <div className="flex flex-wrap gap-3">
          {filterOptions.Transmission.map((type) => (
            <label
              key={type.value}
              className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
            >
              <input
                type="radio"
                value={type.value}
                checked={filters.Transmission === type.value}
                onChange={() => handleRadioChange('Transmission', type.value)}
                className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
              />
              {type.label}
            </label>
          ))}
        </div>
      </div>

      {/* Owners Filter */}
      <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Number of Owners</h3>
        <div className="flex flex-wrap gap-3">
          {filterOptions.NoOfOwners.map((owner) => (
            <label
              key={owner.value}
              className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
            >
              <input
                type="checkbox"
                value={owner.value}
                checked={filters.NoOfOwners.includes(owner.value)}
                onChange={() => handleCheckboxChange('NoOfOwners', owner.value)}
                className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
              />
              {owner.label}
            </label>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}

      <div className='flex justify-center'>
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

export default CarsFilters;
