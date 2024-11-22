import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "./Header";
import SubHeader from "./SubHeader";

function ProductDetails() {
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [user, setUser] = useState([]);

    const p = useParams();
    console.log(p.productId);

    useEffect(() => {
        const url = 'http://localhost:4000/get-products/' + p.productId;
        axios.get(url)
            .then((res) => {
                console.log(res);
                if (res.data.products)
                    setProduct(res.data.products)
            })
            .catch((err) => {
                alert('server error');
            })
    }, [])

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const url = 'http://localhost:4000/User'
        const data = { userId }
        axios.post(url, data)
            .then((res) => {
                if (res.data.message)
                    setUser(res.data.user)
            })
            .catch((err) => {
                alert('server error');
            })
    }, [])

    const handleChat = () => {
        navigate('/Chat');
    }

    const handleCart = (productId) => {
        let userId = localStorage.getItem('userId')
        console.log('userid', 'productid', productId, userId)
        const url = 'http://localhost:4000/Cart'
        const data = { userId, productId }
        axios.put(url, data)
            .then((res) => {
                if (res.data.message)
                    alert('liked')
            })
            .catch((err) => {
                alert('server error');
            })
        navigate('/Cart');
    }

    if (product.Category == 'Cars') {
        return (
            <>
                <Header />
                <SubHeader />
                <div class="font-[sans-serif] bg-white">
                    <div class="p-6 lg:max-w-7xl max-w-4xl mx-auto">
                        <div class="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                            <div class="lg:col-span-3 w-full lg:sticky top-0 text-center">
                                <div class="px-4 py-10 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                                    <img src={"http://localhost:4000/" + product.Images} alt="Product" class="h-96 w-4/5 rounded object-cover" />
                                </div>
                            </div>
                            <div class="lg:col-span-2">
                                <h2 class="text-2xl font-extrabold text-[#333]">{product.Title}</h2>
                                <div class="flex flex-wrap gap-4 mt-6">
                                    <p class="text-[#333] text-4xl font-bold">Rs. {product.Price}</p>
                                </div>

                                <div class="flex flex-wrap gap-4 mt-10">
                                    <button type="button" class="min-w-[200px] px-4 py-3 bg-slate-800 hover:bg-slate-600 text-white text-sm font-bold rounded" onClick={() => handleChat()}>Chat now</button>
                                    <button type="button" class="min-w-[200px] px-4 py-2.5 border border-slate-800 bg-transparent hover:bg-slate-800 hover:text-white text-[#333] text-sm font-bold rounded" onClick={() => handleCart(product._id)}>Add to cart</button>
                                </div>

                                <div className="pb-5 pt-5 border border-solid border-t-2 border-b-2 border-l-0 border-r-0 border-gray-300 mt-10">
                                    <label class="text-2xl font-bold ">Contact Details:</label>
                                    <ul class="mt-6 space-y-4 text-[#333]">
                                        <li class="text-lg">Seller's Name <span class="ml-4 float-right">{user.username}</span></li>
                                        <li class="text-lg">Email Id <span class="ml-4 float-right">{user.email}</span></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                        <div class="mt-16 shadow-[3px_3px_15px_-5px_rgba(6,81,237,0.3)] w-1/2 p-6">
                            <h3 class="text-2xl font-bold text-[#333]">Product information</h3>
                            <ul class="mt-6 space-y-6 text-[#333]">
                                <li class="text-sm">Brand <span class="ml-4 float-right">{product.Brand}</span></li>
                                <li class="text-sm">Year brought <span class="ml-4 float-right">{product.Year}</span></li>
                                <li class="text-sm">Fuel type <span class="ml-4 float-right">{product.Fuel}</span></li>
                                <li class="text-sm">Transmission type <span class="ml-4 float-right">{product.Transmission}</span></li>
                                <li class="text-sm">KM's used <span class="ml-4 float-right">{product.KM}</span></li>
                                <li class="text-sm">Owner type <span class="ml-4 float-right">{product.Owner}</span></li>
                                <li class="text-sm">{product.Description} </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else if (product.Category == 'Furniture') {
        return (
            <>
                <Header />
                <SubHeader />
                <div class="font-[sans-serif] bg-white">
                    <div class="p-6 lg:max-w-7xl max-w-4xl mx-auto">
                        <div class="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                            <div class="lg:col-span-3 w-full lg:sticky top-0 text-center">
                                <div class="px-4 py-10 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                                    <img src={"http://localhost:4000/" + product.Images} alt="Product" class="h-96 w-4/5 rounded object-cover" />
                                </div>
                            </div>
                            <div class="lg:col-span-2">
                                <h2 class="text-2xl font-extrabold text-[#333]">{product.Title}</h2>
                                <div class="flex flex-wrap gap-4 mt-6">
                                    <p class="text-[#333] text-4xl font-bold">Rs. {product.Price}</p>
                                </div>

                                <div class="mt-10">
                                    <h3 class="text-lg text-gray-600">{product.Description}</h3>
                                </div>

                                <div class="flex flex-wrap gap-4 mt-10">
                                    <button type="button" class="min-w-[200px] px-4 py-3 bg-slate-800 hover:bg-slate-600 text-white text-sm font-bold rounded" onClick={() => handleChat()}>Chat now</button>
                                    <button type="button" class="min-w-[200px] px-4 py-2.5 border border-slate-800 bg-transparent hover:bg-slate-800 hover:text-white text-[#333] text-sm font-bold rounded" onClick={() => handleCart(product._id)}>Add to cart</button>
                                </div>

                                <div className="pb-5 pt-5 border border-solid border-t-2 border-b-2 border-l-0 border-r-0 border-gray-300 mt-10">
                                    <label class="text-2xl font-bold ">Contact Details:</label>
                                    <ul class="mt-6 space-y-4 text-[#333]">
                                        <li class="text-lg">Seller's Name <span class="ml-4 float-right">{user.username}</span></li>
                                        <li class="text-lg">Email Id <span class="ml-4 float-right">{user.email}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else if (product.Category == 'Properties') {
        return (
            <>
                <Header />
                <SubHeader />
                <div class="font-[sans-serif] bg-white">
                    <div class="p-6 lg:max-w-7xl max-w-4xl mx-auto">
                        <div class="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                            <div class="lg:col-span-3 w-full lg:sticky top-0 text-center">
                                <div class="px-4 py-10 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                                    <img src={"http://localhost:4000/" + product.Images} alt="Product" class="h-96 w-4/5 rounded object-cover" />
                                </div>
                            </div>
                            <div class="lg:col-span-2">
                                <h2 class="text-2xl font-extrabold text-[#333]">{product.Title}</h2>
                                <div class="flex flex-wrap gap-4 mt-6">
                                    <p class="text-[#333] text-4xl font-bold">Rs. {product.Price}</p>
                                </div>

                                <div class="mt-10">
                                    <h3 class="text-lg text-gray-600">{product.Description}</h3>
                                </div>

                                <div class="flex flex-wrap gap-4 mt-10">
                                    <button type="button" class="min-w-[200px] px-4 py-3 bg-slate-800 hover:bg-slate-600 text-white text-sm font-bold rounded" onClick={() => handleChat()}>Chat now</button>
                                    <button type="button" class="min-w-[200px] px-4 py-2.5 border border-slate-800 bg-transparent hover:bg-slate-800 hover:text-white text-[#333] text-sm font-bold rounded" onClick={() => handleCart(product._id)}>Add to cart</button>
                                </div>

                                <div className="pb-5 pt-5 border border-solid border-t-2 border-b-2 border-l-0 border-r-0 border-gray-300 mt-10">
                                    <label class="text-2xl font-bold ">Contact Details:</label>
                                    <ul class="mt-6 space-y-4 text-[#333]">
                                        <li class="text-lg">Seller's Name <span class="ml-4 float-right">{user.username}</span></li>
                                        <li class="text-lg">Email Id <span class="ml-4 float-right">{user.email}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="mt-16 shadow-[3px_3px_15px_-5px_rgba(6,81,237,0.3)] w-1/2 p-6">
                            <h3 class="text-2xl font-bold text-[#333]">Product information</h3>
                            <ul class="mt-6 space-y-6 text-[#333]">
                                <li class="text-sm">Type <span class="ml-4 float-right">{product.Type}</span></li>
                                <li class="text-sm">Bedrooms <span class="ml-4 float-right">{product.Bedrooms}</span></li>
                                <li class="text-sm">Bathrooms <span class="ml-4 float-right">{product.Bathrooms}</span></li>
                                <li class="text-sm">Furnishing <span class="ml-4 float-right">{product.Furnishing}</span></li>
                                <li class="text-sm">Status <span class="ml-4 float-right">{product.Status}</span></li>
                                <li class="text-sm">Listed By <span class="ml-4 float-right">{product.ListedBy}</span></li>
                                <li class="text-sm">BuiltUp Area <span class="ml-4 float-right">{product.BuiltUpArea}</span></li>
                                <li class="text-sm">Carpet Area <span class="ml-4 float-right">{product.CarpetArea}</span></li>
                                <li class="text-sm">Maintenance <span class="ml-4 float-right">{product.Maintenance}</span></li>
                                <li class="text-sm">Total Floors <span class="ml-4 float-right">{product.TotalFloors}</span></li>
                                <li class="text-sm">Floor No <span class="ml-4 float-right">{product.FloorNo}</span></li>
                                <li class="text-sm">Car Parking <span class="ml-4 float-right">{product.CarParking}</span></li>
                                <li class="text-sm">Facing <span class="ml-4 float-right">{product.Facing}</span></li>
                                <li class="text-sm">Project Name <span class="ml-4 float-right">{product.ProjectName}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else if (product.Category == 'Mobiles') {
        return (
            <>
                <Header />
                <SubHeader />
                <div class="font-[sans-serif] bg-white">
                    <div class="p-6 lg:max-w-7xl max-w-4xl mx-auto">
                        <div class="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                            <div class="lg:col-span-3 w-full lg:sticky top-0 text-center">
                                <div class="px-4 py-10 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                                    <img src={"http://localhost:4000/" + product.Images} alt="Product" class="h-96  w-4/5 rounded object-cover" />
                                </div>
                            </div>
                            <div class="lg:col-span-2">
                                <h2 class="text-2xl font-extrabold text-[#333]">{product.Title}</h2>
                                <div class="flex flex-wrap gap-4 mt-6">
                                    <p class="text-[#333] text-4xl font-bold">Rs. {product.Price}</p>
                                </div>

                                <div class="mt-10">
                                    <h3 class="text-lg text-gray-600">{product.Description}</h3>
                                </div>

                                <div class="flex flex-wrap gap-4 mt-10">
                                    <button type="button" class="min-w-[200px] px-4 py-3 bg-slate-800 hover:bg-slate-600 text-white text-sm font-bold rounded" onClick={() => handleChat()}>Chat now</button>
                                    <button type="button" class="min-w-[200px] px-4 py-2.5 border border-slate-800 bg-transparent hover:bg-slate-800 hover:text-white text-[#333] text-sm font-bold rounded" onClick={() => handleCart(product._id)}>Add to cart</button>
                                </div>

                                <div className="pb-5 pt-5 border border-solid border-t-2 border-b-2 border-l-0 border-r-0 border-gray-300 mt-10">
                                    <label class="text-2xl font-bold ">Contact Details:</label>
                                    <ul class="mt-6 space-y-4 text-[#333]">
                                        <li class="text-lg">Seller's Name <span class="ml-4 float-right">{user.username}</span></li>
                                        <li class="text-lg">Email Id <span class="ml-4 float-right">{user.email}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="mt-16 shadow-[3px_3px_15px_-5px_rgba(6,81,237,0.3)] w-1/2 p-6">
                            <h3 class="text-2xl font-bold text-[#333]">Product information</h3>
                            <ul class="mt-6 space-y-6 text-[#333]">
                                <li class="text-sm">Brand <span class="ml-4 float-right">{product.Brand}</span></li>
                                <li class="text-sm">{product.Description} </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else if (product.Category == 'Properties') {
        return (
            <>
                <Header />
                <SubHeader />
                <div class="font-[sans-serif] bg-white">
                    <div class="p-6 lg:max-w-7xl max-w-4xl mx-auto">
                        <div class="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                            <div class="lg:col-span-3 w-full lg:sticky top-0 text-center">
                                <div class="px-4 py-10 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                                    <img src={"http://localhost:4000/" + product.Images} alt="Product" class="h-96 w-4/5 rounded object-cover" />
                                </div>
                            </div>
                            <div class="lg:col-span-2">
                                <h2 class="text-2xl font-extrabold text-[#333]">{product.Title}</h2>
                                <div class="flex flex-wrap gap-4 mt-6">
                                    <p class="text-[#333] text-4xl font-bold">Rs. {product.Price}</p>
                                </div>

                                <div class="mt-10">
                                    <h3 class="text-lg text-gray-600">{product.Description}</h3>
                                </div>

                                <div class="flex flex-wrap gap-4 mt-10">
                                    <button type="button" class="min-w-[200px] px-4 py-3 bg-slate-800 hover:bg-slate-600 text-white text-sm font-bold rounded" onClick={() => handleChat()}>Chat now</button>
                                    <button type="button" class="min-w-[200px] px-4 py-2.5 border border-slate-800 bg-transparent hover:bg-slate-800 hover:text-white text-[#333] text-sm font-bold rounded" onClick={() => handleCart(product._id)}>Add to cart</button>
                                </div>

                                <div className="pb-5 pt-5 border border-solid border-t-2 border-b-2 border-l-0 border-r-0 border-gray-300 mt-10">
                                    <label class="text-2xl font-bold ">Contact Details:</label>
                                    <ul class="mt-6 space-y-4 text-[#333]">
                                        <li class="text-lg">Seller's Name <span class="ml-4 float-right">{user.username}</span></li>
                                        <li class="text-lg">Email Id <span class="ml-4 float-right">{user.email}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="mt-16 shadow-[3px_3px_15px_-5px_rgba(6,81,237,0.3)] w-1/2 p-6">
                            <h3 class="text-2xl font-bold text-[#333]">Product information</h3>
                            <ul class="mt-6 space-y-6 text-[#333]">
                                <li class="text-sm">Type <span class="ml-4 float-right">{product.Type}</span></li>
                                <li class="text-sm">Bedrooms <span class="ml-4 float-right">{product.Bedrooms}</span></li>
                                <li class="text-sm">Bathrooms <span class="ml-4 float-right">{product.Bathrooms}</span></li>
                                <li class="text-sm">Furnishing <span class="ml-4 float-right">{product.Furnishing}</span></li>
                                <li class="text-sm">Status <span class="ml-4 float-right">{product.Status}</span></li>
                                <li class="text-sm">Listed By <span class="ml-4 float-right">{product.ListedBy}</span></li>
                                <li class="text-sm">BuiltUp Area <span class="ml-4 float-right">{product.BuiltUpArea}</span></li>
                                <li class="text-sm">Carpet Area <span class="ml-4 float-right">{product.CarpetArea}</span></li>
                                <li class="text-sm">Maintenance <span class="ml-4 float-right">{product.Maintenance}</span></li>
                                <li class="text-sm">Total Floors <span class="ml-4 float-right">{product.TotalFloors}</span></li>
                                <li class="text-sm">Floor No <span class="ml-4 float-right">{product.FloorNo}</span></li>
                                <li class="text-sm">Car Parking <span class="ml-4 float-right">{product.CarParking}</span></li>
                                <li class="text-sm">Facing <span class="ml-4 float-right">{product.Facing}</span></li>
                                <li class="text-sm">Project Name <span class="ml-4 float-right">{product.ProjectName}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else if (product.Category == 'Electronics & Appliances') {
        return (
            <>
                <Header />
                <SubHeader />
                <div class="font-[sans-serif] bg-white">
                    <div class="p-6 lg:max-w-7xl max-w-4xl mx-auto">
                        <div class="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                            <div class="lg:col-span-3 w-full lg:sticky top-0 text-center">
                                <div class="px-4 py-10 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                                    <img src={"http://localhost:4000/" + product.Images} alt="Product" class="h-96 w-4/5 rounded object-cover" />
                                </div>
                            </div>
                            <div class="lg:col-span-2">
                                <h2 class="text-2xl font-extrabold text-[#333]">{product.Title}</h2>
                                <div class="flex flex-wrap gap-4 mt-6">
                                    <p class="text-[#333] text-4xl font-bold">Rs. {product.Price}</p>
                                </div>

                                <div class="mt-10">
                                    <h3 class="text-lg text-gray-600">{product.Description}</h3>
                                </div>

                                <div class="flex flex-wrap gap-4 mt-10">
                                    <button type="button" class="min-w-[200px] px-4 py-3 bg-slate-800 hover:bg-slate-600 text-white text-sm font-bold rounded" onClick={() => handleChat()}>Chat now</button>
                                    <button type="button" class="min-w-[200px] px-4 py-2.5 border border-slate-800 bg-transparent hover:bg-slate-800 hover:text-white text-[#333] text-sm font-bold rounded" onClick={() => handleCart(product._id)}>Add to cart</button>
                                </div>

                                <div className="pb-5 pt-5 border border-solid border-t-2 border-b-2 border-l-0 border-r-0 border-gray-300 mt-10">
                                    <label class="text-2xl font-bold ">Contact Details:</label>
                                    <ul class="mt-6 space-y-4 text-[#333]">
                                        <li class="text-lg">Seller's Name <span class="ml-4 float-right">{user.username}</span></li>
                                        <li class="text-lg">Email Id <span class="ml-4 float-right">{user.email}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ProductDetails;