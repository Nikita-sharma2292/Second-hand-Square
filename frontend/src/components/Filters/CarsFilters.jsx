import { transform } from "framer-motion";
import AddProductMenu from "../AddProductMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CarsFilters({handleFilter}) {
  const navigate = useNavigate()

  const [Brand, setBrand] = useState([]);
  const [Year, setYear] = useState([]);
  const [Fuel, setFuel] = useState([]);
  const [Transmission, setTransmission] = useState([]);
  const [KM, setKM] = useState([]);
  const [Owners, setOwners] = useState([]);
  const [Price, setPrice] = useState([]);

  function handleBrandChange(e) {
    if (e.target.checked) {
      setBrand([...Brand, e.target.value]);
    } else {
      setBrand(Brand.filter((item) => item !== e.target.value));
    }
  }

  function handleYearChange(e) {
    if (e.target.checked) {
      setYear([...Year, e.target.value]);
    } else {
      setYear(Year.filter((item) => item !== e.target.value));
    }
  }

  function handleFuelChange(e) {
    if (e.target.checked) {
      setFuel([...Fuel, e.target.value]);
    } else {
      setFuel(Fuel.filter((item) => item !== e.target.value));
    }
  }

  function handleTransmissionChange(e) {
    if (e.target.checked) {
      setTransmission([...Transmission, e.target.value]);
    } else {
      setTransmission(Transmission.filter((item) => item !== e.target.value));
    }
  }

  function handleKMChange(e) {
    if (e.target.checked) {
      setKM([...KM, e.target.value]);
    } else {
      setKM(KM.filter((item) => item !== e.target.value));
    }
  }

  function handleOwnersChange(e) {
    if (e.target.checked) {
      setOwners([...Owners, e.target.value]);
    } else {
      setOwners(Owners.filter((item) => item !== e.target.value));
    }
  }

  function handlePriceChange(e) {
    if (e.target.checked) {
      setPrice([...Price, e.target.value]);
    } else {
      setPrice(Price.filter((item) => item !== e.target.value));
    }
  }

  return (
    <div className="flex bg-white border border-4 rounded-lg shadow flex-row w-80 h-screen overflow-auto">
      <div className="bg-white w-full">

        <div class="flex p-5 border-b border-gray-300 shadow rounded-t">
          <h3 class="text-xl font-semibold">
            Filters
          </h3>
        </div>
        <div class="flex flex-col p-5 border-b border-gray-300 shadow rounded-t">
          <h2 class="text-l font-semibold mb-2">
            Selected Category
          </h2>
          <h2 class="text-sm text-gray-400">
            Cars / Cars
          </h2>
        </div>
        <div className="mt-5">
          <label for="brand" class="text-xl p-5 font-semibold">
            Brand
          </label>
          <ul class="space-y-2 p-5 text-sm" aria-labelledby="dropdownDefault">
            <li class="flex items-center">
              <input id="Maruti" type="checkbox" value="Maruti Suzuki" onChange={handleBrandChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Maruti" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Maruti Suzuki
              </label>
            </li>

            <li class="flex items-center">
              <input id="Hyundai" type="checkbox" value="Hyundai Creta" onChange={handleBrandChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Hyundai" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Hyundai
              </label>
            </li>

            <li class="flex items-center">
              <input id="Mahindra" type="checkbox" value="Mahindra" onChange={handleBrandChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Mahindra" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Mahindra
              </label>
            </li>

            <li class="flex items-center">
              <input id="Honda" type="checkbox" value="Honda Amaze" onChange={handleBrandChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Honda" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Honda
              </label>
            </li>

            <li class="flex items-center">
              <input id="Tata" type="checkbox" value="Tata" onChange={handleBrandChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Tata" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Tata
              </label>
            </li>

            <li class="flex items-center">
              <input id="Toyota" type="checkbox" value="Toyota" onChange={handleBrandChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Toyota" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Toyota
              </label>
            </li>

            <li class="flex items-center">
              <input id="Ford" type="checkbox" value="Ford" onChange={handleBrandChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Ford" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Ford
              </label>
            </li>
          </ul>
        </div>

        <div className="mt-5 ">
          <label for="budget" class="text-xl p-5 font-semibold">
            Budget
          </label>
          <ul class="space-y-2 p-5 text-sm" aria-labelledby="dropdownDefault">
            <li class="flex items-center">
              <input id="Below1Lac" type="checkbox" value="100000" onChange={handlePriceChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Below1Lac" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Below 1 Lac
              </label>
            </li>

            <li class="flex items-center">
              <input id="Below2Lac" type="checkbox" value="200000" onChange={handlePriceChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Below2Lac" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Below 2 Lac
              </label>
            </li>

            <li class="flex items-center">
              <input id="Below3Lac" type="checkbox" value="300000" onChange={handlePriceChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Below3Lac" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Below 3 Lac
              </label>
            </li>

            <li class="flex items-center">
              <input id="Below5Lac" type="checkbox" value="500000" onChange={handlePriceChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Below5Lac" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Below 5 Lac
              </label>
            </li>

            <li class="flex items-center">
              <input id="Tata" type="checkbox" value="10000000" onChange={handlePriceChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Tata" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                5 Lac and Above
              </label>
            </li>
          </ul>
        </div>

        <div className="mt-5">
          <label for="Year" class="text-xl p-5 font-semibold">
            Year
          </label>
          <ul class="space-y-2 p-5 text-sm" aria-labelledby="dropdownDefault">
            <li class="flex items-center">
              <input id="Under3Years" type="checkbox" value="3" onChange={handleYearChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Under3Years" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Under 3 Years
              </label>
            </li>

            <li class="flex items-center">
              <input id="Under5Years" type="checkbox" value="5" onChange={handleYearChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Under5Years" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                under 5 Years
              </label>
            </li>

            <li class="flex items-center">
              <input id="Under7Years" type="checkbox" value="7" onChange={handleYearChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Under7Years" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Under 7 Years
              </label>
            </li>

            <li class="flex items-center">
              <input id="7YearAbove" type="checkbox" value="20" onChange={handleYearChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="7YearAbove" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                7 Years and Above
              </label>
            </li>
          </ul>
        </div>

        <div className="mt-5 ">
          <label for="budget" class="text-xl p-5 font-semibold">
            No. of Owners
          </label>
          <ul class="space-y-2 p-5 text-sm" aria-labelledby="dropdownDefault">
            <li class="flex items-center">
              <input id="First" type="checkbox" value="1st" onChange={handleOwnersChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="First" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                First
              </label>
            </li>

            <li class="flex items-center">
              <input id="Second" type="checkbox" value="2nd" onChange={handleOwnersChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Second" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Second
              </label>
            </li>

            <li class="flex items-center">
              <input id="Third" type="checkbox" value="3rd" onChange={handleOwnersChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Third" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Third
              </label>
            </li>

            <li class="flex items-center">
              <input id="Fourth" type="checkbox" value="4th" onChange={handleOwnersChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Fourth" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Fourth
              </label>
            </li>

            <li class="flex items-center">
              <input id="MoreThanFour" type="checkbox" value="4+" onChange={handleOwnersChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="MoreThanFour" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                More than Four
              </label>
            </li>
          </ul>
        </div>

        <div className="mt-5 ">
          <label for="KMDriven" class="text-xl p-5 font-semibold">
            KM Driven
          </label>
          <ul class="space-y-2 p-5 text-sm" aria-labelledby="dropdownDefault">
            <li class="flex items-center">
              <input id="Below25000km" type="checkbox" value="25000" onChange={handleKMChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Below25000km" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Below 25000 km
              </label>
            </li>

            <li class="flex items-center">
              <input id="Below50000km" type="checkbox" value="50000" onChange={handleKMChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Below50000km" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Below 50000 km
              </label>
            </li>

            <li class="flex items-center">
              <input id="Below75000km" type="checkbox" value="75000" onChange={handleKMChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Below75000km" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Below 75000 km
              </label>
            </li>

            <li class="flex items-center">
              <input id="Below100000km" type="checkbox" value="100000" onChange={handleKMChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Below100000km" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Below 100000 km
              </label>
            </li>

            <li class="flex items-center">
              <input id="100000Above" type="checkbox" value="500000" onChange={handleKMChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="100000Above" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                100000 km and Above
              </label>
            </li>
          </ul>
        </div>

        <div className="mt-5 ">
          <label for="Fuel" class="text-xl p-5 font-semibold">
            Fuel
          </label>
          <ul class="space-y-2 p-5 text-sm" aria-labelledby="dropdownDefault">
            <li class="flex items-center">
              <input id="Petrol" type="checkbox" value="Petrol" onChange={handleFuelChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Petrol" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Petrol
              </label>
            </li>

            <li class="flex items-center">
              <input id="Diesel" type="checkbox" value="Diesel" onChange={handleFuelChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Diesel" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Diesel
              </label>
            </li>

            <li class="flex items-center">
              <input id="LPG" type="checkbox" value="LPG" onChange={handleFuelChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="LPG" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                LPG
              </label>
            </li>

            <li class="flex items-center">
              <input id="CNGandHybrids" type="checkbox" value="CNG & Hybrids" onChange={handleFuelChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="CNGandHybrids" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                CNG and Hybrids
              </label>
            </li>

            <li class="flex items-center">
              <input id="Electric" type="checkbox" value="Electric" onChange={handleFuelChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Electric" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Electric
              </label>
            </li>
          </ul>
        </div>

        <div className="mt-5 ">
          <label for="Transmission" class="text-xl p-5 font-semibold">
            Transmission
          </label>
          <ul class="space-y-2 p-5 text-sm" aria-labelledby="dropdownDefault">
            <li class="flex items-center">
              <input id="Automatic" type="checkbox" value="Automatic" onChange={handleTransmissionChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Automatic" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Automatic
              </label>
            </li>

            <li class="flex items-center">
              <input id="Manual" type="checkbox" value="Manual" onChange={handleTransmissionChange}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="Manual" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Manual
              </label>
            </li>
          </ul>
        </div>

        <div class="p-6 border-t border-gray-300 shadow rounded-b">
          <button onClick={() => handleFilter && handleFilter({Brand, Year, Fuel, Transmission, KM, Owners, Price})} class="text-white bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:ring-cyan-200 text-xl rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Filter</button>
        </div>

      </div>
    </div>
  )
}

export default CarsFilters;