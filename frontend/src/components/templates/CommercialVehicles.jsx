import AddProductMenu from "../AddProductMenu";
import Header from "../Header";
import SubHeader from "../SubHeader";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { addProduct, resetProducts } from "../../features/productSlice";

function CommercialVehicles() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm();
    const category = 'Commercial Vehicals and Spares';
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

    if (subCategory == "Commercial and Other Vehicles") {
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
                                        <option value="Auto-rickshaws & E-rickshaws">Auto-rickshaws & E-rickshaws</option>
                                        <option value="Buses">Buses</option>
                                        <option value="Trucks">Trucks</option>
                                        <option value="Heavy Machinery">Heavy Machinery</option>
                                        <option value="Modified Jeeps">Modified Jeeps</option>
                                        <option value="Pick-up vans / Pick-up trucks">Pick-up vans / Pick-up trucks</option>
                                        <option value="Scrap Cars">Scrap Cars</option>
                                        <option value="Taxi Cabs">Taxi Cabs</option>
                                        <option value="Tractors">Tractors</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    {errors.Type && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Type.message}</p>
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
                                    <label htmlFor="KMdriven" className="text-sm font-medium text-gray-900 block mb-2">KM driven</label>
                                    <input
                                        type="text"
                                        name="KMdriven"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter KM driven:"
                                        {...register('KMdriven', {
                                            required: { value: true, message: "KM driven is required" },
                                        })}
                                    />
                                    {errors.KMdriven && (
                                        <p className="text-red-500 text-sm mt-1">{errors.KMdriven.message}</p>
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
                                        <option value="Wheels & Tyre">Wheels & Tyres</option>
                                        <option value="Audio & Other Accessories">Audio & Other Accessories</option>
                                        <option value="Other Spare Parts">Other Spare Parts</option>
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

export default CommercialVehicles;
