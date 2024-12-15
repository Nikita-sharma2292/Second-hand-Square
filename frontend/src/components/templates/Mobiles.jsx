import AddProductMenu from "../AddProductMenu";
import Header from "../Header";
import SubHeader from "../SubHeader";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { addProduct, resetProducts } from "../../features/productSlice";

function Mobiles() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm();
    const category = 'Mobiles';
    const { subCategory } = useParams();

    const { isError, isSuccess, message } = useSelector(state => state.products);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            toast("Product added successfully.");
            navigate('/');
        }
        dispatch(resetProducts());
    }, [isError, isSuccess, message])

    const submit = (data) => {
        const Images = data.Images ? Array.from(data.Images) : [];

        if (Images.length > 10) {
            toast.error("You can upload a maximum of 10 images.");
            return;
        }

        const formData = {
            ...data,
            category,
            subCategory,
            Images,
        };

        dispatch(addProduct(formData));
    };

    if(subCategory=="Mobile Phones"){
        return (
            <div className="flex flex-row">
                <AddProductMenu />
                <div className="md:ml-96 sm:ml-10 bg-white border border-4 rounded-lg shadow w-full m-10">
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="flex p-5 border-b border-gray-300 shadow rounded-t">
                            <h3 className="text-xl font-semibold">Post Your Add</h3>
                        </div>

                        <div className="flex flex-col p-5 border-b border-gray-300 shadow rounded-t">
                            <h2 className="text-l font-semibold mb-2">Selected Category</h2>
                            <h2 className="text-sm text-gray-400">{category} / {subCategory}</h2>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Brand" className="text-sm font-medium text-gray-900 block mb-2">Brand</label>
                                    <select
                                        name="Brand"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('Brand', {
                                            required: { value: true, message: "Brand is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="iPhone">iPhone</option>
                                        <option value="Samsung">Samsung</option>
                                        <option value="Mi">Mi</option>
                                        <option value="Vivo">Vivo</option>
                                        <option value="Oppo">Oppo</option>
                                        <option value="Realme">Realme</option>
                                    </select>
                                    {errors.Brand && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Brand.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Year" className="text-sm font-medium text-gray-900 block mb-2">Year</label>
                                    <input
                                        type="text"
                                        name="Year"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Year:"
                                        {...register('Year', {
                                            required: { value: true, message: "Year is required" },
                                        })}
                                    />
                                    {errors.Year && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Year.message}</p>
                                    )}
                                </div>
                                
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="PhysicalCondition" className="text-sm font-medium text-gray-900 block mb-2">Physical Condition</label>
                                    <select
                                        name="PhysicalCondition"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('PhysicalCondition', {
                                            required: { value: true, message: "Physical Condition is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="Superb | No Damage">Superb | No Damage</option>
                                        <option value="Good | Minor Damage">Good | Minor Damage</option>
                                        <option value="Fair | Major Damage">Fair | Major Damage</option>
                                        <option value="Poor | Screen Damage">Poor | Screen Damage</option>
                                    </select>
                                    {errors.PhysicalCondition && (
                                        <p className="text-red-500 text-sm mt-1">{errors.PhysicalCondition.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="RAM" className="text-sm font-medium text-gray-900 block mb-2">Installed RAM Size</label>
                                    <select
                                        name="RAM"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('RAM', {
                                            required: { value: true, message: "RAM size is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="upto 2 GB">upto 2 GB</option>
                                        <option value="2 GB">2 GB</option>
                                        <option value="4 GB">4 GB</option>
                                        <option value="6 GB">6 GB</option>
                                        <option value="8 GB">8 GB</option>
                                        <option value="10 GB">10 GB</option>
                                        <option value="12 GB & above">12 GB & above</option>
                                    </select>
                                    {errors.RAM && (
                                        <p className="text-red-500 text-sm mt-1">{errors.RAM.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Storage" className="text-sm font-medium text-gray-900 block mb-2">Storage Capacity</label>
                                    <select
                                        name="Storage"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('Storage', {
                                            required: { value: true, message: "Storage capacity is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="upto 3.9 GB">upto 3.9 GB</option>
                                        <option value="4 GB">4 GB</option>
                                        <option value="8 GB">8 GB</option>
                                        <option value="16 GB">16 GB</option>
                                        <option value="32 GB">32 GB</option>
                                        <option value="64 GB">64 GB</option>
                                        <option value="128 GB">128 GB</option>
                                        <option value="256 GB">256 GB</option>
                                        <option value="512 GB & above">512 GB & above</option>
                                    </select>
                                    {errors.Storage && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Storage.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Network" className="text-sm font-medium text-gray-900 block mb-2">Network</label>
                                    <select
                                        name="Network"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('Network', {
                                            required: { value: true, message: "Network is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="2G">2G</option>
                                        <option value="3G">3G</option>
                                        <option value="4G">4G</option>
                                        <option value="5G">5G</option>
                                    </select>
                                    {errors.Network && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Network.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Charger" className="text-sm font-medium text-gray-900 block mb-2">Charger</label>
                                    <select
                                        name="Charger"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('Charger', {
                                            required: { value: true, message: "Charger is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="Available">Available</option>
                                        <option value="Not Available">Not Available</option>
                                    </select>
                                    {errors.Charger && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Charger.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Receipt" className="text-sm font-medium text-gray-900 block mb-2">Original Receipt</label>
                                    <select
                                        name="Receipt"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('Receipt', {
                                            required: { value: true, message: "Receipt is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="Available">Available</option>
                                        <option value="Not Available">Not Available</option>
                                    </select>
                                    {errors.Receipt && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Receipt.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="BoxWithIMEI" className="text-sm font-medium text-gray-900 block mb-2">Box With IMEI</label>
                                    <select
                                        name="BoxWithIMEI"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('BoxWithIMEI', {
                                            required: { value: true, message: "Box With IMEI is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="Available">Available</option>
                                        <option value="Not Available">Not Available</option>
                                    </select>
                                    {errors.BoxWithIMEI && (
                                        <p className="text-red-500 text-sm mt-1">{errors.BoxWithIMEI.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Title" className="text-sm font-medium text-gray-900 block mb-2">Title</label>
                                    <input
                                        type="text"
                                        name="Title"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Title:"
                                        {...register('Title', {
                                            required: { value: true, message: "Title is required" },
                                        })}
                                    />
                                    {errors.Title && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Title.message}</p>
                                    )}
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="Description" className="text-sm font-medium text-gray-900 block mb-2">Description</label>
                                    <textarea
                                        type="text"
                                        name="Description"
                                        rows="6"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                                        placeholder="Includes features, condition and reason for selling"
                                        {...register('Description', {
                                            required: { value: true, message: "Description is required" },
                                        })}
                                    ></textarea>
                                    {errors.Description && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Description.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-5 border-t border-gray-300 shadow rounded-t">
                            <label htmlFor="Price" className="text-xl font-medium text-gray-900 block mb-2">Set a price</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="number"
                                    name="Price"
                                    className="block p-2.5 z-20 ps-10 bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                                    placeholder="Enter amount"
                                    {...register('Price', {
                                        required: { value: true, message: "Price is required" },
                                    })}
                                />
                                {errors.Price && (
                                    <p className="text-red-500 text-sm mt-1">{errors.Price.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="p-5 border-t border-gray-300 shadow rounded-t">
                            <label htmlFor="Images" className="text-xl font-medium text-gray-900 block mb-2">Upload Images</label>
                            <input
                                type="file"
                                name="Images"
                                multiple
                                accept="Images/*"
                                className="block w-fit text-sm text-gray-500 bg-gray-50 border border-gray-300 cursor-pointer focus:outline-none focus:ring-cyan-600 focus:border-cyan-600"
                                {...register('Images', {
                                    required: { value: true, message: "Images are required" },
                                    validate: (value) => {
                                        if (value.length > 10) {
                                            return "You can upload a maximum of 10 images.";
                                        }
                                        return true;
                                    },
                                })}
                            />
                            {errors.Images && (
                                <p className="text-red-500 text-sm mt-1">{errors.Images.message}</p>
                            )}
                        </div>

                        <div className="p-6 border-t border-gray-300 shadow rounded-b">
                            <button
                                className="text-white bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:ring-cyan-200 text-xl rounded-lg text-sm px-5 py-2.5 text-center"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Posting..." : "POST ADD"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    else if(subCategory=="Accessories"){
        return (
            <div className="flex flex-row">
                <AddProductMenu />
                <div className="md:ml-96 sm:ml-10 bg-white border border-4 rounded-lg shadow w-full m-10">
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="flex p-5 border-b border-gray-300 shadow rounded-t">
                            <h3 className="text-xl font-semibold">Post Your Add</h3>
                        </div>
    
                        <div className="flex flex-col p-5 border-b border-gray-300 shadow rounded-t">
                            <h2 className="text-l font-semibold mb-2">Selected Category</h2>
                            <h2 className="text-sm text-gray-400">{category} / {subCategory}</h2>
                        </div>
    
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Type" className="text-sm font-medium text-gray-900 block mb-2">Type</label>
                                    <select
                                        name="Type"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('Type', {
                                            required: { value: true, message: "Type is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="Mobile">Mobile</option>
                                        <option value="Tablets">Tablets</option>
                                    </select>
                                    {errors.Type && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Type.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Title" className="text-sm font-medium text-gray-900 block mb-2">Title</label>
                                    <input
                                        type="text"
                                        name="Title"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Title:"
                                        {...register('Title', {
                                            required: { value: true, message: "Title is required" },
                                        })}
                                    />
                                    {errors.Title && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Title.message}</p>
                                    )}
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="Description" className="text-sm font-medium text-gray-900 block mb-2">Description</label>
                                    <textarea
                                        type="text"
                                        name="Description"
                                        rows="6"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                                        placeholder="Includes features, condition and reason for selling"
                                        {...register('Description', {
                                            required: { value: true, message: "Description is required" },
                                        })}
                                    ></textarea>
                                    {errors.Description && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Description.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
    
                        <div className="p-5 border-t border-gray-300 shadow rounded-t">
                            <label htmlFor="Price" className="text-xl font-medium text-gray-900 block mb-2">Set a price</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="number"
                                    name="Price"
                                    className="block p-2.5 z-20 ps-10 bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                                    placeholder="Enter amount"
                                    {...register('Price', {
                                        required: { value: true, message: "Price is required" },
                                    })}
                                />
                                {errors.Price && (
                                    <p className="text-red-500 text-sm mt-1">{errors.Price.message}</p>
                                )}
                            </div>
                        </div>
    
                        <div className="p-5 border-t border-gray-300 shadow rounded-t">
                            <label htmlFor="Images" className="text-xl font-medium text-gray-900 block mb-2">Upload Images</label>
                            <input
                                type="file"
                                name="Images"
                                multiple
                                accept="Images/*"
                                className="block w-fit text-sm text-gray-500 bg-gray-50 border border-gray-300 cursor-pointer focus:outline-none focus:ring-cyan-600 focus:border-cyan-600"
                                {...register('Images', {
                                    required: { value: true, message: "Images are required" },
                                    validate: (value) => {
                                        if (value.length > 10) {
                                            return "You can upload a maximum of 10 images.";
                                        }
                                        return true;
                                    },
                                })}
                            />
                            {errors.Images && (
                                <p className="text-red-500 text-sm mt-1">{errors.Images.message}</p>
                            )}
                        </div>
    
                        <div className="p-6 border-t border-gray-300 shadow rounded-b">
                            <button
                                className="text-white bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:ring-cyan-200 text-xl rounded-lg text-sm px-5 py-2.5 text-center"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Posting..." : "POST ADD"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    else{
        return (
            <div className="flex flex-row">
                <AddProductMenu />
                <div className="md:ml-96 sm:ml-10 bg-white border border-4 rounded-lg shadow w-full m-10">
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="flex p-5 border-b border-gray-300 shadow rounded-t">
                            <h3 className="text-xl font-semibold">Post Your Add</h3>
                        </div>
    
                        <div className="flex flex-col p-5 border-b border-gray-300 shadow rounded-t">
                            <h2 className="text-l font-semibold mb-2">Selected Category</h2>
                            <h2 className="text-sm text-gray-400">{category} / {subCategory}</h2>
                        </div>
    
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Type" className="text-sm font-medium text-gray-900 block mb-2">Type</label>
                                    <select
                                        name="Type"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('Type', {
                                            required: { value: true, message: "Type is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="iPads">iPads</option>
                                        <option value="Samsung">Samsung</option>
                                        <option value="Other Tablets">Other Tablets</option>
                                    </select>
                                    {errors.Type && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Type.message}</p>
                                    )}
                                </div>
                                
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Title" className="text-sm font-medium text-gray-900 block mb-2">Title</label>
                                    <input
                                        type="text"
                                        name="Title"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Title:"
                                        {...register('Title', {
                                            required: { value: true, message: "Title is required" },
                                        })}
                                    />
                                    {errors.Title && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Title.message}</p>
                                    )}
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="Description" className="text-sm font-medium text-gray-900 block mb-2">Description</label>
                                    <textarea
                                        type="text"
                                        name="Description"
                                        rows="6"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                                        placeholder="Includes features, condition and reason for selling"
                                        {...register('Description', {
                                            required: { value: true, message: "Description is required" },
                                        })}
                                    ></textarea>
                                    {errors.Description && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Description.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
    
                        <div className="p-5 border-t border-gray-300 shadow rounded-t">
                            <label htmlFor="Price" className="text-xl font-medium text-gray-900 block mb-2">Set a price</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="number"
                                    name="Price"
                                    className="block p-2.5 z-20 ps-10 bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                                    placeholder="Enter amount"
                                    {...register('Price', {
                                        required: { value: true, message: "Price is required" },
                                    })}
                                />
                                {errors.Price && (
                                    <p className="text-red-500 text-sm mt-1">{errors.Price.message}</p>
                                )}
                            </div>
                        </div>
    
                        <div className="p-5 border-t border-gray-300 shadow rounded-t">
                            <label htmlFor="Images" className="text-xl font-medium text-gray-900 block mb-2">Upload Images</label>
                            <input
                                type="file"
                                name="Images"
                                multiple
                                accept="Images/*"
                                className="block w-fit text-sm text-gray-500 bg-gray-50 border border-gray-300 cursor-pointer focus:outline-none focus:ring-cyan-600 focus:border-cyan-600"
                                {...register('Images', {
                                    required: { value: true, message: "Images are required" },
                                    validate: (value) => {
                                        if (value.length > 10) {
                                            return "You can upload a maximum of 10 images.";
                                        }
                                        return true;
                                    },
                                })}
                            />
                            {errors.Images && (
                                <p className="text-red-500 text-sm mt-1">{errors.Images.message}</p>
                            )}
                        </div>
    
                        <div className="p-6 border-t border-gray-300 shadow rounded-b">
                            <button
                                className="text-white bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:ring-cyan-200 text-xl rounded-lg text-sm px-5 py-2.5 text-center"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Posting..." : "POST ADD"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Mobiles;
