import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { filterProducts, resetProducts } from "../../features/productSlice";
import { toast } from 'react-toastify';

const JobsFilters = (props) => {
  const dispatch = useDispatch();

  const { isError, message, isSuccess, isFiltered } = useSelector(state => state.products);

  useEffect(() => {
    if (isError)
      toast.error(message);

    if (isSuccess && isFiltered)
      toast.success("Filters applied");

    dispatch(resetProducts());
  }, [isError, isSuccess, message])

  const [filters, setFilters] = useState({
    Type: [],
    SalaryPeriod: [],
  });

  const filterOptions = {
    Type: [
      { value: 'full-time', label: 'Full-time' },
      { value: 'part-time', label: 'Part-time' },
      { value: 'contract', label: 'Contract' },
      { value: 'temporary', label: 'Temporary' },
    ],
    SalaryPeriod: [
      { value: 'hourly', label: 'Hourly' },
      { value: 'monthly', label: 'Monthly' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'yearly', label: 'Yearly' },
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

  const handleApplyFilters = () => {
    dispatch(filterProducts(filters));
  };

  return (
    <div className="p-6 bg-gray-50 w-4/12 h-screen auto rounded-lg shadow-md overflow-auto">
      <h2 className="text-3xl font-bold text-gray-800 pb-3">Filters</h2>
      <h4 className="text-lg font-md border-b pb-4 border-gray-300 text-gray-500 mb-3">{props.category} | {props.subCategory}</h4>

      {/* Job Type Filter */}
      <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Position Type</h3>
        <div className="flex flex-wrap gap-3">
          {filterOptions.Type.map((type) => (
            <label
              key={type.value}
              className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
            >
              <input
                type="checkbox"
                value={type.value}
                checked={filters.Type.includes(type.value)}
                onChange={() => handleCheckboxChange('Type', type.value)}
                className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
              />
              {type.label}
            </label>
          ))}
        </div>
      </div>

      {/* Salary Period Filter */}
      <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Salary Period</h3>
        <div className="flex flex-wrap gap-3">
          {filterOptions.SalaryPeriod.map((period) => (
            <label
              key={period.value}
              className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
            >
              <input
                type="checkbox"
                value={period.value}
                checked={filters.SalaryPeriod.includes(period.value)}
                onChange={() => handleCheckboxChange('SalaryPeriod', period.value)}
                className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
              />
              {period.label}
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

export default JobsFilters;
