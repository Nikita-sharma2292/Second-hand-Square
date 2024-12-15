import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { getProductById, resetProducts } from "../features/productSlice";
import { addToCart, reset } from "../features/authSlice";
import { toast } from "react-toastify";
import Header from "./Header";
import SubHeader from "./SubHeader";

function ProductDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ProductDetails, setProductDetails] = useState([]);

    const { isError, isSuccess, message, product } = useSelector(state => state.products);
    const { cart, isCart, token } = useSelector(state => state.auth);
    const isCartError = useSelector(state => state.auth.isError);
    const cartMessage = useSelector(state => state.auth.message);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getProductById(id));
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if(isCartError){
            toast.error(cartMessage);
        }
        if (isCart) {
            toast.success(cartMessage);
        }
        if(isSuccess){
            setProductDetails(product);
        }

        dispatch(reset());
        dispatch(resetProducts());
    }, [isError, isSuccess, message, isCartError, cartMessage, product, cart, isCart, dispatch]);

    const handleCart = (id) => {
        dispatch(addToCart({ id }));
    }

    const excludeFields = ['Title', 'Price', 'owner', 'Images', 'createdAt', 'updatedAt', '__v', '_id', 'Description', 'subCategory'];

    const fieldLabels = {
        category: "Category",
        Brand: "Brand",
        Year: "Year Brought",
        Fuel: "Fuel Type",
        Transmission: "Transmission Type",
        KMdriven: "KM's Used",
        NoOfOwners: "No of previous owners",
        Description: "Description",
        Type: "Type",
        BHK: "Bedrooms",
        Bathrooms: "Bathrooms",
        Furnishing: "Furnishing",
        ProjectStatus: "Status",
        ListedBy: "Listed By",
        Area: "Built Up Area",
        Maintenance: "Maintenance",
        Floors: "Total Floors",
        FloorNo: "Floor Number",
        CarParking: "Car Parking",
        Facing: "Facing",
        ProjectName: "Project Name",
        BaclelorsAllowed: "Baclelors Allowed",
        Breadth: "Breadth",
        Length: "Length",
        Washrooms: "Washrooms",
        MealsIncluded: "Meals Included",
        PhysicalCondition: "Physical Condition",
        RAM: "RAM",
        Storage: "Storage",
        Network: "Network",
        Charger: "Charger Available",
        Receipt: "Receipt Available",
        BoxWithIMEI: "Box With IMEI available",
        SalaryPeriod: "Salary Period",
        Position: "Position",
        SalaryFrom: "Salary From",
        SalaryTo: "Salary To"
    };

    const renderProductFields = (ProductDetails) => {
        return Object.entries(ProductDetails)
            .filter(([key, value]) => value && !excludeFields.includes(key)) // Exclude empty values and specified fields
            .map(([key, value]) => (
                <li key={key} className="text-sm">
                    {fieldLabels[key] || key} <span className="ml-4 float-right">{value}</span>
                </li>
            ));
    };    

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === ProductDetails.Images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? ProductDetails.Images.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [ProductDetails]);

    return (
        <>
            <Header />
            <SubHeader />
            <div className="font-[sans-serif] bg-white">
                <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
                    <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                        <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                            <div className="px-4 py-10 flex flex-row justify-center rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                                {ProductDetails.Images && ProductDetails.Images.length > 1 && (
                                    <button
                                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
                                        onClick={prevImage}
                                    >
                                        &lt;
                                    </button>
                                )}

                                <img
                                    src={ProductDetails.Images?.[currentImageIndex]}
                                    alt="Product"
                                    className="h-96 w-4/5 rounded object-fit"
                                />

                                {ProductDetails.Images && ProductDetails.Images.length > 1 && (
                                    <button
                                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
                                        onClick={nextImage}
                                    >
                                        &gt;
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold text-[#333]">{ProductDetails.Title}</h2>
                            <div className="flex flex-wrap gap-4 mt-6">
                                <p className="text-[#333] text-4xl font-bold">Rs. {ProductDetails.Price}</p>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-10 mb-20">
                                <button
                                    type="button"
                                    className="min-w-[200px] px-4 py-3 bg-slate-800 hover:bg-slate-600 text-white text-sm font-bold rounded"
                                    onClick={() => navigate('/Chat')}
                                >
                                    Chat now
                                </button>
                                <button
                                    type="button"
                                    className="min-w-[200px] px-4 py-2.5 border border-slate-800 bg-transparent hover:bg-slate-800 hover:text-white text-[#333] text-sm font-bold rounded"
                                    onClick={() => handleCart(ProductDetails._id)}
                                >
                                    Add to cart
                                </button>
                            </div>
                            <div className="pb-5 pt-5 border border-solid border-t-2 border-b-2 border-l-0 border-r-0 border-gray-300 mt-10">
                                <label class="text-2xl font-bold ">Contact Details:</label>
                                <ul class="mt-6 space-y-4 text-[#333]">
                                    <li class="text-lg">Seller's Name <span class="ml-4 float-right">{ProductDetails.owner?.fullName || "N/A"}</span></li>
                                    <li class="text-lg">Email Id <span class="ml-4 float-right">{ProductDetails.owner?.email || "N/A"}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Product Information and Description */}
                    <div className="mt-4 shadow-[3px_3px_15px_-5px_rgba(6,81,237,0.3)] w-full p-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-[#333]">Product Information</h3>
                            <ul className="mt-6 space-y-6 text-[#333]">
                                {renderProductFields(ProductDetails)}
                            </ul>
                        </div>

                        <div className="bg-gray-100 h-fit p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-[#333]">Description</h3>
                            <p className="mt-6 text-[#333] text-m leading-7">{ProductDetails.Description || "No description provided."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetails;
