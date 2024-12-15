import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import Home from "./components/Home.jsx";
import Cart from "./components/Cart.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import ChatCard from "./components/ChatCard.jsx";
import AddProductMenu from './components/AddProductMenu.jsx';
import Cars from "./components/templates/Cars.jsx";
import Pets from "./components/templates/Pets.jsx";
import Books from "./components/templates/Books.jsx";
import Fashion from "./components/templates/Fashion.jsx";
import Furniture from "./components/templates/Furniture.jsx";
import CommercialVehicles from "./components/templates/CommercialVehicles.jsx";
import Bikes from "./components/templates/Bikes.jsx";
import Properties from "./components/templates/Properties.jsx";
import ElectronicsAppliances from "./components/templates/ElectricalAppliances.jsx";
import Mobiles from "./components/templates/Mobiles.jsx";
import Jobs from "./components/templates/Jobs.jsx";
import CategoryList from "./components/CategoryList.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./components/Profile.jsx";
import UpdateProfile from "./components/UpdateProfile.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import MyAdds from "./components/MyAdds.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "/Cart",
    element: (<Cart />),
  },
  {
    path: "/ProductDetail/:id",
    element: (<ProductDetails />),
  },
  {
    path: "/Chat",
    element: (<ChatCard />),
  }, 
  {
    path: "/addProduct",
    element: (<AddProductMenu />),
  },
  {
    path: "/addProduct/Cars/:subCategory",
    element: (<Cars />),
  },
  {
    path: "/addProduct/Pets/:subCategory",
    element: (<Pets />),
  },
  {
    path: "/addProduct/Books Sports and Hobbies/:subCategory",
    element: (<Books />),
  },
  {
    path: "/addProduct/Fashion/:subCategory",
    element: (<Fashion />),
  },
  {
    path: "/addProduct/Furniture/:subCategory",
    element: (<Furniture />),
  },
  {
    path: "/addProduct/Commercial Vehicals and Spares/:subCategory",
    element: (<CommercialVehicles />),
  },
  {
    path: "/addProduct/Bikes/:subCategory",
    element: (<Bikes />),
  },
  {
    path: "/addProduct/Properties/:subCategory",
    element: (<Properties />),
  },
  {
    path: "/addProduct/Electronics and Appliances/:subCategory",
    element: (<ElectronicsAppliances />),
  },
  {
    path: "/addProduct/Mobiles/:subCategory",
    element: (<Mobiles />),
  },
  {
    path: "/addProduct/Jobs/:subCategory",
    element: (<Jobs />),
  },
  {
    path: "/CategoryList/:category/:subCategory",
    element: (<CategoryList />),
  },
  {
    path: "/profile",
    element: (<Profile />),
  },
  {
    path: "/update",
    element: <UpdateProfile />,
  },
  {
    path: "/changePassword",
    element: <ChangePassword />,
  },
  {
    path: "/MyAdds",
    element: <MyAdds />,
  }
]);

function App() {
  return (
    <>
      {/* <Header /> */}
      <RouterProvider router={router}>
      </RouterProvider>
      <ToastContainer position="top-right"/>
    </>
  );
}

export default App;
