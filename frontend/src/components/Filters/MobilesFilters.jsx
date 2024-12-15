import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { filterProducts, resetProducts } from "../../features/productSlice";
import { toast } from 'react-toastify';

const MobilesFilters = (props) => {
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
    PhysicalCondition: [],
    RAM: [],
    Storage: [],
    Charger: '',
    Network: [],
    Receipt: '',
    BoxWithIMEI: '',
  });

  const filterOptions = {
    "Mobile Phones": {
      Brand: [
        { value: 'iphone', label: 'iPhone' },
        { value: 'vivo', label: 'Vivo' },
        { value: 'samsung', label: 'Samsung' },
        { value: 'mi', label: 'Mi' },
        { value: 'oppo', label: 'Oppo' },
        { value: 'realme', label: 'Realme' },
        { value: '', label: 'Others' },
      ],
      Year: [
        { value: '1', label: 'Under 1 Year' },
        { value: '2', label: 'Under 2 Years' },
        { value: '3', label: 'Under 3 Years' },
        { value: '10', label: '3+ Years' },
      ],
      PhysicalCondition: [
        { value: 'superb | no damage', label: 'Superb | No Damage' },
        { value: 'good | minor damage', label: 'Good | Minor Damage' },
        { value: 'fair | major damage', label: 'Fair | Major Damage' },
        { value: 'poor | screen damage', label: 'Poor | Screen Damage' },
      ],
      RAM: [
        { value: 'upto 2 gb', label: 'Upto 2 GB' },
        { value: '4 gb', label: '4 GB' },
        { value: '6 gb', label: '6 GB' },
        { value: '8 gb', label: '8 GB' },
        { value: '10 gb', label: '10 GB' },
        { value: '12 gb & above', label: '12 GB & Above' },
      ],
      Storage: [
        { value: 'upto 3.9 gb', label: 'Upto 3.9 GB' },
        { value: '4 gb', label: '4 GB' },
        { value: '8 gb', label: '8 GB' },
        { value: '16 gb', label: '16 GB' },
        { value: '32 gb', label: '32 GB' },
        { value: '64 gb', label: '64 GB' },
        { value: '128 gb', label: '128 GB' },
        { value: '256 gb', label: '256 GB' },
        { value: '512 gb & above', label: '512 GB & Above' },
      ],
      Network: [
        { value: '2g', label: '2G' },
        { value: '3g', label: '3G' },
        { value: '4g', label: '4G' },
        { value: '5g', label: '5G' },
      ],
      Charger: [
        { value: 'available', label: 'Available' },
        { value: 'not available', label: 'Not Available' },
      ],
      Receipt: [
        { value: 'available', label: 'Available' },
        { value: 'not available', label: 'Not Available' },
      ],
      BoxWithIMEI: [
        { value: 'available', label: 'Available' },
        { value: 'not available', label: 'Not Available' },
      ],
      include: ['Brand', 'Price', 'Year', 'PhysicalCondition', 'RAM', 'Storage', 'Network', 'Charger', 'Receipt', 'BoxWithIMEI'],
    },
    Accessories: {
      Type: [
        { value: 'mobile', label: 'Mobile' },
        { value: 'tablets', label: 'Tablets' },
      ],
      include: ['Price', 'Type'],
    },
    Tablets: {
      Type: [
        { value: 'samsung', label: 'Samsung' },
        { value: 'ipad', label: 'iPads' },
        { value: 'others', label: 'Others' },
      ],
      include: ['Price', 'Type'],
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

      {/* Render filters dynamically */}
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

      {currentFilters.include?.includes('PhysicalCondition') && currentFilters.PhysicalCondition && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Physical Condition</h3>
          <div className="flex flex-wrap gap-3">
            {currentFilters.PhysicalCondition.map((condition) => (
              <label
                key={condition.value}
                className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
              >
                <input
                  type="checkbox"
                  value={condition.value}
                  checked={filters.PhysicalCondition.includes(condition.value)}
                  onChange={() => handleCheckboxChange('PhysicalCondition', condition.value)}
                  className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
                />
                {condition.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {currentFilters.include?.includes('RAM') && currentFilters.RAM && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">RAM Installed</h3>
          <div className="flex flex-wrap gap-3">
            {currentFilters.RAM.map((RAM) => (
              <label
                key={RAM.value}
                className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
              >
                <input
                  type="checkbox"
                  value={RAM.value}
                  checked={filters.RAM.includes(RAM.value)}
                  onChange={() => handleCheckboxChange('RAM', RAM.value)}
                  className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
                />
                {RAM.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {currentFilters.include?.includes('Storage') && currentFilters.Storage && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Storage</h3>
          <div className="flex flex-wrap gap-3">
            {currentFilters.Storage.map((Storage) => (
              <label
                key={Storage.value}
                className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
              >
                <input
                  type="checkbox"
                  value={Storage.value}
                  checked={filters.Storage.includes(Storage.value)}
                  onChange={() => handleCheckboxChange('Storage', Storage.value)}
                  className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
                />
                {Storage.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {currentFilters.include?.includes('Network') && currentFilters.Network && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Network</h3>
          <div className="flex flex-wrap gap-3">
            {currentFilters.Network.map((Network) => (
              <label
                key={Network.value}
                className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
              >
                <input
                  type="checkbox"
                  value={Network.value}
                  checked={filters.Network.includes(Network.value)}
                  onChange={() => handleCheckboxChange('Network', Network.value)}
                  className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
                />
                {Network.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {currentFilters.include?.includes('Charger') && currentFilters.Charger && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Charger Available</h3>
          <div className="flex flex-wrap gap-3">
            {currentFilters.Charger.map((Charger) => (
              <label
                key={Charger.value}
                className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
              >
                <input
                  type="radio"
                  name="Charger"
                  value={Charger.value}
                  checked={filters.Charger === Charger.value}
                  onChange={() => handleRadioChange('Charger', Charger.value)}
                  className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
                />
                {Charger.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {currentFilters.include?.includes('Receipt') && currentFilters.Receipt && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Receipt Available</h3>
          <div className="flex flex-wrap gap-3">
            {currentFilters.Receipt.map((Receipt) => (
              <label
                key={Receipt.value}
                className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
              >
                <input
                  type="radio"
                  name="Receipt"
                  value={Receipt.value}
                  checked={filters.Receipt === Receipt.value}
                  onChange={() => handleRadioChange('Receipt', Receipt.value)}
                  className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
                />
                {Receipt.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {currentFilters.include?.includes('BoxWithIMEI') && currentFilters.BoxWithIMEI && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Box With IMEI Available</h3>
          <div className="flex flex-wrap gap-3">
            {currentFilters.BoxWithIMEI.map((BoxWithIMEI) => (
              <label
                key={BoxWithIMEI.value}
                className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
              >
                <input
                  type="radio"
                  name="BoxWithIMEI"
                  value={BoxWithIMEI.value}
                  checked={filters.BoxWithIMEI === BoxWithIMEI.value}
                  onChange={() => handleRadioChange('BoxWithIMEI', BoxWithIMEI.value)}
                  className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
                />
                {BoxWithIMEI.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Add other filter types as per filterOptions */}

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

export default MobilesFilters;
