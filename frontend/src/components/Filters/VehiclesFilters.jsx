import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { filterProducts, resetProducts } from "../../features/productSlice";
import { toast } from 'react-toastify';

const VehiclesFilters = (props) => {
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
    minPrice: '',
    maxPrice: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleApplyFilters = () => {
    dispatch(filterProducts(filters));
  };

  return (
    <div className="p-6 bg-gray-50 w-4/12 h-screen rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 pb-3">Filters</h2>
      <h4 className="text-lg font-md border-b pb-4 border-gray-300 text-gray-500 mb-3">{props.category} | {props.subCategory}</h4>

      <div className="mb-6 mt-14 border-b border-gray-300 pb-5">
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

export default VehiclesFilters;