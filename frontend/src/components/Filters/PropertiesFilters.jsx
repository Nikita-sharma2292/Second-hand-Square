import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { filterProducts, resetProducts } from "../../features/productSlice";
import { toast } from 'react-toastify';

const PropertiesFilters = (props) => {
  const dispatch = useDispatch();

  const { isError, message, isSuccess, isFiltered } = useSelector(state => state.products);

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess && isFiltered) toast.success("Filters applied");

    dispatch(resetProducts());
  }, [isError, isSuccess, message]);

  const [filters, setFilters] = useState({
    Type: [],
    Area: '',
    minPrice: '',
    maxPrice: '',
    Furnishing: [],
    ProjectStatus: [],
    ListedBy: [],
    BHK: '',
    Bathrooms: '',
    BaclelorsAllowed: '',
    CarParking: '',
  });

  const filterOptions = {
    "For Sale Houses and Apartments": {
      Type: [
        { value: 'flats / apartments', label: 'Flats / Apartments' },
        { value: 'independent / builder floors', label: 'Independent / Builder Floors' },
        { value: 'house & villa', label: 'House & Villa' },
        { value: 'farm houses', label: 'Farm Houses' },
      ],
      BHK: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '4+' },
      ],
      Bathrooms: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '4+' },
      ],
      Furnishing: [
        { value: 'furnished', label: 'Furnished' },
        { value: 'semi-furnished', label: 'Semi-Furnished' },
        { value: 'unfurnished', label: 'Unfurnished' },
      ],
      ProjectStatus: [
        { value: 'new launch', label: 'New Launch' },
        { value: 'ready to move', label: 'Ready to Move' },
        { value: 'under construction', label: 'Under Construction' },
      ],
      ListedBy: [
        { value: 'builder', label: 'Builder' },
        { value: 'dealer', label: 'Dealer' },
        { value: 'owner', label: 'Owner' },
      ],
      CarParking: [
        { value: '0', label: '0' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '3+' },
      ],
      include: ['ListedBy', 'ProjectStatus', 'Furnishing', 'Bathrooms', 'BHK', 'Type', 'Price', 'CarParking', 'Area'],
    },
    "For Rent Houses and Apartments": {
      Type: [
        { value: 'flats / apartments', label: 'Flats / Apartments' },
        { value: 'independent / builder floors', label: 'Independent / Builder Floors' },
        { value: 'house & villa', label: 'House & Villa' },
        { value: 'farm houses', label: 'Farm Houses' },
      ],
      BHK: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '4+' },
      ],
      Bathrooms: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '4+' },
      ],
      Furnishing: [
        { value: 'furnished', label: 'Furnished' },
        { value: 'semi-furnished', label: 'Semi-Furnished' },
        { value: 'unfurnished', label: 'Unfurnished' },
      ],
      ProjectStatus: [
        { value: 'new Launch', label: 'New Launch' },
        { value: 'ready to Move', label: 'Ready to Move' },
        { value: 'under construction', label: 'Under Construction' },
      ],
      ListedBy: [
        { value: 'builder', label: 'Builder' },
        { value: 'dealer', label: 'Dealer' },
        { value: 'owner', label: 'Owner' },
      ],
      BaclelorsAllowed: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
      CarParking: [
        { value: '0', label: '0' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '3+' },
      ],
      include: ['ListedBy', 'ProjectStatus', 'Furnishing', 'Bathrooms', 'BHK', 'Type', 'Price', 'BachelorsAllowed', 'CarParking', 'Area'],
    },
    "Land and Plots": {
      Type: [
        { value: 'for rent', label: 'For Rent' },
        { value: 'for sale', label: 'For Sale' },
      ],
      ListedBy: [
        { value: 'builder', label: 'Builder' },
        { value: 'dealer', label: 'Dealer' },
        { value: 'owner', label: 'Owner' },
      ],
      include: ['Price', 'Type', 'ListedBy', 'Area'],
    },
    "PG and Guest Houses": {
      Type: [
        { value: 'guest houses', label: 'Guest Houses' },
        { value: 'pg', label: 'PG' },
        { value: 'Rommate', label: 'Rommate' },
      ],
      CarParking: [
        { value: '0', label: '0' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '3+' },
      ],
      Furnishing: [
        { value: 'furnished', label: 'Furnished' },
        { value: 'semi-furnished', label: 'Semi-Furnished' },
        { value: 'unfurnished', label: 'Unfurnished' },
      ],
      ListedBy: [
        { value: 'builder', label: 'Builder' },
        { value: 'dealer', label: 'Dealer' },
        { value: 'owner', label: 'Owner' },
      ],
      include: ['Price', 'Type', 'Furnishing', 'ListedBy', 'CarParking'],
    },
    "For Rent:Shops and Offices": {
      CarParking: [
        { value: '0', label: '0' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '3+' },
      ],
      Furnishing: [
        { value: 'furnished', label: 'Furnished' },
        { value: 'semi-furnished', label: 'Semi-Furnished' },
        { value: 'unfurnished', label: 'Unfurnished' },
      ],
      ProjectStatus: [
        { value: 'new Launch', label: 'New Launch' },
        { value: 'ready to Move', label: 'Ready to Move' },
        { value: 'under construction', label: 'Under Construction' },
      ],
      ListedBy: [
        { value: 'builder', label: 'Builder' },
        { value: 'dealer', label: 'Dealer' },
        { value: 'owner', label: 'Owner' },
      ],
      include: ['Price', 'CarParking', 'Furnishing', 'ListedBy', 'ProjectStatus', 'Area'],
    },
    "For Sale:Shops and Offices": {
      CarParking: [
        { value: '0', label: '0' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '3+' },
      ],
      Furnishing: [
        { value: 'furnished', label: 'Furnished' },
        { value: 'semi-furnished', label: 'Semi-Furnished' },
        { value: 'unfurnished', label: 'Unfurnished' },
      ],
      ProjectStatus: [
        { value: 'new Launch', label: 'New Launch' },
        { value: 'ready to Move', label: 'Ready to Move' },
        { value: 'under construction', label: 'Under Construction' },
      ],
      ListedBy: [
        { value: 'builder', label: 'Builder' },
        { value: 'dealer', label: 'Dealer' },
        { value: 'owner', label: 'Owner' },
      ],
      include: ['Price', 'CarParking', 'Furnishing', 'ListedBy', 'ProjectStatus', 'Area'],
    }
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
    console.log(filters);
    dispatch(filterProducts(filters));
  };

  return (
    <div className="p-6 bg-gray-50 w-4/12 h-screen rounded-lg shadow-md overflow-auto">
      <h2 className="text-3xl font-bold text-gray-800 pb-3">Filters</h2>
      <h4 className="text-lg font-md border-b pb-4 border-gray-300 text-gray-500 mb-3">
        {props.category} | {props.subCategory}
      </h4>

      {/* Render filters dynamically */}
      {currentFilters.include?.includes('Type') && currentFilters.Type && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Type</h3>
          <div className="flex flex-wrap gap-3">
            {currentFilters.Type.map((Type) => (
              <label
                key={Type.value}
                className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
              >
                <input
                  type="checkbox"
                  value={Type.value}
                  checked={filters.Type.includes(Type.value)}
                  onChange={() => handleCheckboxChange('Type', Type.value)}
                  className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
                />
                {Type.label}
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

      {currentFilters.include?.includes('Furnishing') && currentFilters.Furnishing && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Type</h3>
          <div className="flex flex-wrap gap-3">
            {currentFilters.Furnishing.map((Furnishing) => (
              <label
                key={Furnishing.value}
                className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
              >
                <input
                  type="checkbox"
                  value={Furnishing.value}
                  checked={filters.Furnishing.includes(Furnishing.value)}
                  onChange={() => handleCheckboxChange('Furnishing', Furnishing.value)}
                  className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
                />
                {Furnishing.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {currentFilters.include?.includes('CarParking') && currentFilters.CarParking && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Car Parking</h3>
          <div className="flex flex-wrap gap-3">
            {currentFilters.CarParking.map((CarParking) => (
              <label
                key={CarParking.value}
                className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
              >
                <input
                  type="radio"
                  name="CarParking"
                  value={CarParking.value}
                  checked={filters.CarParking === CarParking.value}
                  onChange={() => handleRadioChange('CarParking', CarParking.value)}
                  className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
                />
                {CarParking.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {currentFilters.include?.includes('ProjectStatus') && currentFilters.ProjectStatus && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Project Status</h3>
          <div className="flex flex-wrap gap-3">
            {currentFilters.ProjectStatus.map((ProjectStatus) => (
              <label
                key={ProjectStatus.value}
                className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
              >
                <input
                  type="checkbox"
                  value={ProjectStatus.value}
                  checked={filters.ProjectStatus.includes(ProjectStatus.value)}
                  onChange={() => handleCheckboxChange('ProjectStatus', ProjectStatus.value)}
                  className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
                />
                {ProjectStatus.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {currentFilters.include?.includes('Area') && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Area (Sq Ft)</h3>
          <div className="flex gap-4">
            <input
              type="number"
              name="Area"
              value={filters.Area}
              onChange={handleInputChange}
              placeholder="Build-up area"
              className="w-1/2 p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      )}

      {currentFilters.include?.includes('ListedBy') && currentFilters.ListedBy && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Listed By</h3>
          <div className="flex flex-wrap gap-3">
            {currentFilters.ListedBy.map((ListedBy) => (
              <label
                key={ListedBy.value}
                className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
              >
                <input
                  type="checkbox"
                  value={ListedBy.value}
                  checked={filters.ListedBy.includes(ListedBy.value)}
                  onChange={() => handleCheckboxChange('ListedBy', ListedBy.value)}
                  className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
                />
                {ListedBy.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {currentFilters.include?.includes('BHK') && currentFilters.BHK && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">BHK</h3>
          <div className="flex flex-wrap gap-3">
            {currentFilters.BHK.map((BHK) => (
              <label
                key={BHK.value}
                className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
              >
                <input
                  type="radio"
                  name="BHK"
                  value={BHK.value}
                  checked={filters.BHK === BHK.value}
                  onChange={() => handleRadioChange('BHK', BHK.value)}
                  className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
                />
                {BHK.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {currentFilters.include?.includes('Bathrooms') && currentFilters.Bathrooms && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Bathrooms</h3>
          <div className="flex flex-wrap gap-3">
            {currentFilters.Bathrooms.map((Bathrooms) => (
              <label
                key={Bathrooms.value}
                className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
              >
                <input
                  type="radio"
                  name="Bathrooms"
                  value={Bathrooms.value}
                  checked={filters.Bathrooms === Bathrooms.value}
                  onChange={() => handleRadioChange('Bathrooms', Bathrooms.value)}
                  className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
                />
                {Bathrooms.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {currentFilters.include?.includes('BaclelorsAllowed') && currentFilters.BaclelorsAllowed && (
        <div className="mb-6 mt-6 border-b border-gray-300 pb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Baclelors Allowed</h3>
          <div className="flex flex-wrap gap-3">
            {currentFilters.BaclelorsAllowed.map((BaclelorsAllowed) => (
              <label
                key={BaclelorsAllowed.value}
                className="flex items-center gap-2 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:border-gray-500"
              >
                <input
                  type="radio"
                  name="BaclelorsAllowed"
                  value={BaclelorsAllowed.value}
                  checked={filters.BaclelorsAllowed === BaclelorsAllowed.value}
                  onChange={() => handleRadioChange('BaclelorsAllowed', BaclelorsAllowed.value)}
                  className="w-3 h-3 text-slate-800 focus:ring-slate-500 border-slate-800 rounded"
                />
                {BaclelorsAllowed.label}
              </label>
            ))}
          </div>
        </div>
      )}

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

export default PropertiesFilters;
