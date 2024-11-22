import * as React from 'react';
import './index.css';
import reactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import ErrorPage from './components/error-page';
import Home from './components/Home';
import Login from './components/login';
import Signup from './components/signup';
import AddProductMenu from './components/AddProductMenu';
import Cars from './components/templates/Cars';
import Properties from './components/templates/Properties';
import Mobiles from './components/templates/Mobiles';
import Jobs from './components/templates/Jobs';
import Bikes from './components/templates/Bikes';
import ElectronicsAppliances from './components/templates/ElectricalAppliances';
import CommercialVehicals from './components/templates/CommercialVehicles';
import Furniture from './components/templates/Furniture';
import Fashion from './components/templates/Fashion';
import Books from './components/templates/Books';
import Pets from './components/templates/Pets';
import Services from './components/templates/Services';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import CategoryList from './components/CategoryList';
import ChatCard from './components/ChatCard';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
    errorElement: <ErrorPage />,
  }, 
  {
    path: "about",
    element: <div>about</div>,
  },
  {
    path: "/login",
    element: (<Login />),
  }, 
  {
    path: "/signup",
    element: (<Signup />),
  },
  {
    path: "/addProduct",
    element: (<AddProductMenu />),
  },
  {
    path: "/addProduct/Cars/Cars",
    element: (<Cars />),
  },
  {
    path: "/addProduct/Properties/For Sale Houses and Apartments",
    element: (<Properties />),
  },
  {
    path: "/addProduct/Mobiles/Mobile Phones",
    element: (<Mobiles />),
  },
  {
    path: "/addProduct/Jobs/Data entry and Bank Office",
    element: (<Jobs />),
  },
  {
    path: "/addProduct/Bikes/Motorcycles",
    element: (<Bikes />),
  },
  {
    path: "/addProduct/Electronics and Appliances/Tvs Video and Audio",
    element: (<ElectronicsAppliances />),
  },
  {
    path: "/addProduct/Commercial Vehicals and Spares/Commercial and Other Vehicles",
    element: (<CommercialVehicals />),
  },
  {
    path: "/addProduct/Furniture/Sofa and Dining",
    element: (<Furniture />),
  },
  {
    path: "/addProduct/Fashion/Men",
    element: (<Fashion />),
  },
  {
    path: "/addProduct/Books Sports and Hobbies/Books",
    element: (<Books />),
  },
  {
    path: "/addProduct/Pets/Fishes and Aquarium",
    element: (<Pets />),
  },
  {
    path: "/addProduct/Services/Education and Classes",
    element: (<Services />),
  },
  {
    path: "/Cart",
    element: (<Cart />),
  },
  {
    path: "/ProductDetail/:productId",
    element: (<ProductDetails />),
  },
  {
    path: "/CategoryList/:category",
    element: (<CategoryList />),
  },
  {
    path: "/Chat", 
    element: (<ChatCard />),
  }
]);

reactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
