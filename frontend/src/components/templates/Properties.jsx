import AddProductMenu from "../AddProductMenu";
import Header from "../Header";
import SubHeader from "../SubHeader";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { addProduct, resetProducts } from "../../features/productSlice";

function Properties() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm();
    const category = 'Properties';
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

    if(subCategory == "For Sale Houses and Apartments"){
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
                                        <option value="Flats / Apartments">Flats / Apartments</option>
                                        <option value="Independent / Builder Floors">Independent / Builder Floors</option>
                                        <option value="Farm House">Farm House</option>
                                        <option value="House & Villa">House & Villa</option>
                                    </select>
                                    {errors.Type && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Type.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="BHK" className="text-sm font-medium text-gray-900 block mb-2">BHK</label>
                                    <select
                                        name="BHK"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('BHK', {
                                            required: { value: true, message: "BHK is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="4+">4+</option>
                                    </select>
                                    {errors.BHK && (
                                        <p className="text-red-500 text-sm mt-1">{errors.BHK.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Bathrooms" className="text-sm font-medium text-gray-900 block mb-2">Bathrooms</label>
                                    <select
                                        name="Type"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('Bathrooms', {
                                            required: { value: true, message: "Bathrooms is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="4+">4+</option>
                                    </select>
                                    {errors.Bathrooms && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Bathrooms.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Furnishing" className="text-sm font-medium text-gray-900 block mb-2">Furnishing</label>
                                    <select
                                        name="Furnishing"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('Furnishing', {
                                            required: { value: true, message: "Furnishing status is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="Furnished">Furnished</option>
                                        <option value="Semi-Furnished">Semi-Furnished</option>
                                        <option value="Unfurnished">Unfurnished</option>
                                    </select>
                                    {errors.Furnishing && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Furnishing.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="ProjectStatus" className="text-sm font-medium text-gray-900 block mb-2">Project Status</label>
                                    <select
                                        name="ProjectStatus"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('ProjectStatus', {
                                            required: { value: true, message: "Project Status is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="New Launch">New Launch</option>
                                        <option value="Ready to Move">Ready to Move</option>
                                        <option value="Under Construction">Under Construction</option>
                                    </select>
                                    {errors.ProjectStatus && (
                                        <p className="text-red-500 text-sm mt-1">{errors.ProjectStatus.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="ListedBy" className="text-sm font-medium text-gray-900 block mb-2">Listed By</label>
                                    <select
                                        name="ListedBy"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('ListedBy', {
                                            required: { value: true, message: "Listed By is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="Builder">Builder</option>
                                        <option value="Dealer">Dealer</option>
                                        <option value="Owner">Owner</option>
                                    </select>
                                    {errors.ListedBy && (
                                        <p className="text-red-500 text-sm mt-1">{errors.ListedBy.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Area" className="text-sm font-medium text-gray-900 block mb-2">Area</label>
                                    <input
                                        type="text"
                                        name="Area"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Area:"
                                        {...register('Area', {
                                            required: { value: true, message: "Area is required" },
                                        })}
                                    />
                                    {errors.Area && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Area.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Maintenance" className="text-sm font-medium text-gray-900 block mb-2">Maintenance (Monthly)</label>
                                    <input
                                        type="text"
                                        name="Maintenance"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Maintenance amount:"
                                        {...register('Maintenance', {
                                            required: { value: true, message: "Maintenance is required" },
                                        })}
                                    />
                                    {errors.Maintenance && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Maintenance.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Floors" className="text-sm font-medium text-gray-900 block mb-2">Total Floors</label>
                                    <input
                                        type="text"
                                        name="Floors"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Total Floors:"
                                        {...register('Floors', {
                                            required: { value: true, message: "Floors is required" },
                                        })}
                                    />
                                    {errors.Floors && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Floors.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="FloorNo" className="text-sm font-medium text-gray-900 block mb-2">Floor No</label>
                                    <input
                                        type="text"
                                        name="FloorNo"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Floor No:"
                                        {...register('FloorNo', {
                                            required: { value: true, message: "Floor No is required" },
                                        })}
                                    />
                                    {errors.FloorNo && (
                                        <p className="text-red-500 text-sm mt-1">{errors.FloorNo.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="CarParking" className="text-sm font-medium text-gray-900 block mb-2">Car Parking</label>
                                    <select
                                        name="CarParking"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('CarParking', {
                                            required: { value: true, message: "Car Parking is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="3+">3+</option>
                                    </select>
                                    {errors.CarParking && (
                                        <p className="text-red-500 text-sm mt-1">{errors.CarParking.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="ProjectName" className="text-sm font-medium text-gray-900 block mb-2">Project Name</label>
                                    <input
                                        type="text"
                                        name="ProjectName"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Project Name:"
                                        {...register('ProjectName', {
                                            required: { value: true, message: "Project Name is required" },
                                        })}
                                    />
                                    {errors.ProjectName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.ProjectName.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Facing" className="text-sm font-medium text-gray-900 block mb-2">Facing</label>
                                    <input
                                        type="text"
                                        name="Facing"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Facing:"
                                        {...register('Facing', {
                                            required: { value: true, message: "Facing is required" },
                                        })}
                                    />
                                    {errors.Facing && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Facing.message}</p>
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
    else if(subCategory == "For Rent Houses and Apartments"){
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
                                        <option value="Flats / Apartments">Flats / Apartments</option>
                                        <option value="Independent / Builder Floors">Independent / Builder Floors</option>
                                        <option value="Farm House">Farm House</option>
                                        <option value="House & Villa">House & Villa</option>
                                    </select>
                                    {errors.Type && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Type.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="BHK" className="text-sm font-medium text-gray-900 block mb-2">BHK</label>
                                    <select
                                        name="BHK"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('BHK', {
                                            required: { value: true, message: "BHK is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="4+">4+</option>
                                    </select>
                                    {errors.BHK && (
                                        <p className="text-red-500 text-sm mt-1">{errors.BHK.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Bathrooms" className="text-sm font-medium text-gray-900 block mb-2">Bathrooms</label>
                                    <select
                                        name="Type"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('Bathrooms', {
                                            required: { value: true, message: "Bathrooms is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="4+">4+</option>
                                    </select>
                                    {errors.Bathrooms && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Bathrooms.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Furnishing" className="text-sm font-medium text-gray-900 block mb-2">Furnishing</label>
                                    <select
                                        name="Furnishing"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('Furnishing', {
                                            required: { value: true, message: "Furnishing status is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="Furnished">Furnished</option>
                                        <option value="Semi-Furnished">Semi-Furnished</option>
                                        <option value="Unfurnished">Unfurnished</option>
                                    </select>
                                    {errors.Furnishing && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Furnishing.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="ProjectStatus" className="text-sm font-medium text-gray-900 block mb-2">Project Status</label>
                                    <select
                                        name="ProjectStatus"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('ProjectStatus', {
                                            required: { value: true, message: "Project Status is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="New Launch">New Launch</option>
                                        <option value="Ready to Move">Ready to Move</option>
                                        <option value="Under Construction">Under Construction</option>
                                    </select>
                                    {errors.ProjectStatus && (
                                        <p className="text-red-500 text-sm mt-1">{errors.ProjectStatus.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="ListedBy" className="text-sm font-medium text-gray-900 block mb-2">Listed By</label>
                                    <select
                                        name="ListedBy"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('ListedBy', {
                                            required: { value: true, message: "Listed By is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="Builder">Builder</option>
                                        <option value="Dealer">Dealer</option>
                                        <option value="Owner">Owner</option>
                                    </select>
                                    {errors.ListedBy && (
                                        <p className="text-red-500 text-sm mt-1">{errors.ListedBy.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Area" className="text-sm font-medium text-gray-900 block mb-2">Area</label>
                                    <input
                                        type="text"
                                        name="Area"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Area:"
                                        {...register('Area', {
                                            required: { value: true, message: "Area is required" },
                                        })}
                                    />
                                    {errors.Area && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Area.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Maintenance" className="text-sm font-medium text-gray-900 block mb-2">Maintenance (Monthly)</label>
                                    <input
                                        type="text"
                                        name="Maintenance"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Maintenance amount:"
                                        {...register('Maintenance', {
                                            required: { value: true, message: "Maintenance is required" },
                                        })}
                                    />
                                    {errors.Maintenance && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Maintenance.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Floors" className="text-sm font-medium text-gray-900 block mb-2">Total Floors</label>
                                    <input
                                        type="text"
                                        name="Floors"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Total Floors:"
                                        {...register('Floors', {
                                            required: { value: true, message: "Floors is required" },
                                        })}
                                    />
                                    {errors.Floors && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Floors.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="FloorNo" className="text-sm font-medium text-gray-900 block mb-2">Floor No</label>
                                    <input
                                        type="text"
                                        name="FloorNo"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Floor No:"
                                        {...register('FloorNo', {
                                            required: { value: true, message: "Floor No is required" },
                                        })}
                                    />
                                    {errors.FloorNo && (
                                        <p className="text-red-500 text-sm mt-1">{errors.FloorNo.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="CarParking" className="text-sm font-medium text-gray-900 block mb-2">Car Parking</label>
                                    <select
                                        name="CarParking"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('CarParking', {
                                            required: { value: true, message: "Car Parking is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="3+">3+</option>
                                    </select>
                                    {errors.CarParking && (
                                        <p className="text-red-500 text-sm mt-1">{errors.CarParking.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="BaclelorsAllowed" className="text-sm font-medium text-gray-900 block mb-2">Baclelors Allowed</label>
                                    <select
                                        name="BaclelorsAllowed"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('BaclelorsAllowed', {
                                            required: { value: true, message: "Baclelors Allowed is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                    {errors.BaclelorsAllowed && (
                                        <p className="text-red-500 text-sm mt-1">{errors.BaclelorsAllowed.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="ProjectName" className="text-sm font-medium text-gray-900 block mb-2">Project Name</label>
                                    <input
                                        type="text"
                                        name="ProjectName"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Project Name:"
                                        {...register('ProjectName', {
                                            required: { value: true, message: "Project Name is required" },
                                        })}
                                    />
                                    {errors.ProjectName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.ProjectName.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Facing" className="text-sm font-medium text-gray-900 block mb-2">Facing</label>
                                    <input
                                        type="text"
                                        name="Facing"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Facing:"
                                        {...register('Facing', {
                                            required: { value: true, message: "Facing is required" },
                                        })}
                                    />
                                    {errors.Facing && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Facing.message}</p>
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
    else if(subCategory == "Land and Plots"){
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
                                        <option value="For Rent">For Rent</option>
                                        <option value="For Sale">For Sale</option>
                                    </select>
                                    {errors.Type && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Type.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="ListedBy" className="text-sm font-medium text-gray-900 block mb-2">Listed By</label>
                                    <select
                                        name="ListedBy"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('ListedBy', {
                                            required: { value: true, message: "Listed By is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="Builder">Builder</option>
                                        <option value="Dealer">Dealer</option>
                                        <option value="Owner">Owner</option>
                                    </select>
                                    {errors.ListedBy && (
                                        <p className="text-red-500 text-sm mt-1">{errors.ListedBy.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Area" className="text-sm font-medium text-gray-900 block mb-2">Area</label>
                                    <input
                                        type="text"
                                        name="Area"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Area:"
                                        {...register('Area', {
                                            required: { value: true, message: "Area is required" },
                                        })}
                                    />
                                    {errors.Area && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Area.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Length" className="text-sm font-medium text-gray-900 block mb-2">Length</label>
                                    <input
                                        type="text"
                                        name="Length"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Length:"
                                        {...register('Length', {
                                            required: { value: true, message: "Length is required" },
                                        })}
                                    />
                                    {errors.Length && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Length.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Breadth" className="text-sm font-medium text-gray-900 block mb-2">Breadth</label>
                                    <input
                                        type="text"
                                        name="Breadth"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Breadth:"
                                        {...register('Breadth', {
                                            required: { value: true, message: "Breadth is required" },
                                        })}
                                    />
                                    {errors.Breadth && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Breadth.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Facing" className="text-sm font-medium text-gray-900 block mb-2">Facing</label>
                                    <select
                                        name="Facing"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('Facing', {
                                            required: { value: true, message: "Facing is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="North">North</option>
                                        <option value="East">East</option>
                                        <option value="South">South</option>
                                        <option value="West">West</option>
                                        <option value="North-East">North-East</option>
                                        <option value="North-West">North-West</option>
                                        <option value="South-East">South-East</option>
                                        <option value="South-West">South-West</option>
                                    </select>
                                    {errors.Facing && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Facing.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="ProjectName" className="text-sm font-medium text-gray-900 block mb-2">Project Name</label>
                                    <input
                                        type="text"
                                        name="ProjectName"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Project Name:"
                                        {...register('ProjectName', {
                                            required: { value: true, message: "Project Name is required" },
                                        })}
                                    />
                                    {errors.ProjectName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.ProjectName.message}</p>
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
    else if(subCategory == "For Rent Shops and Offices"){
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
                                    <label htmlFor="Furnishing" className="text-sm font-medium text-gray-900 block mb-2">Furnishing</label>
                                    <select
                                        name="Furnishing"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('Furnishing', {
                                            required: { value: true, message: "Furnishing status is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="Furnished">Furnished</option>
                                        <option value="Semi-Furnished">Semi-Furnished</option>
                                        <option value="Unfurnished">Unfurnished</option>
                                    </select>
                                    {errors.Furnishing && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Furnishing.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="ListedBy" className="text-sm font-medium text-gray-900 block mb-2">Listed By</label>
                                    <select
                                        name="ListedBy"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('ListedBy', {
                                            required: { value: true, message: "Listed By is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="Builder">Builder</option>
                                        <option value="Dealer">Dealer</option>
                                        <option value="Owner">Owner</option>
                                    </select>
                                    {errors.ListedBy && (
                                        <p className="text-red-500 text-sm mt-1">{errors.ListedBy.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Area" className="text-sm font-medium text-gray-900 block mb-2">Area</label>
                                    <input
                                        type="text"
                                        name="Area"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Area:"
                                        {...register('Area', {
                                            required: { value: true, message: "Area is required" },
                                        })}
                                    />
                                    {errors.Area && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Area.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Maintenance" className="text-sm font-medium text-gray-900 block mb-2">Maintenance (Monthly)</label>
                                    <input
                                        type="text"
                                        name="Maintenance"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Maintenance amount:"
                                        {...register('Maintenance', {
                                            required: { value: true, message: "Maintenance is required" },
                                        })}
                                    />
                                    {errors.Maintenance && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Maintenance.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="CarParking" className="text-sm font-medium text-gray-900 block mb-2">Car Parking</label>
                                    <select
                                        name="CarParking"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('CarParking', {
                                            required: { value: true, message: "Car Parking is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="3+">3+</option>
                                    </select>
                                    {errors.CarParking && (
                                        <p className="text-red-500 text-sm mt-1">{errors.CarParking.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Washrooms" className="text-sm font-medium text-gray-900 block mb-2">Washrooms</label>
                                    <input
                                        type="text"
                                        name="Washrooms"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Washrooms:"
                                        {...register('Washrooms', {
                                            required: { value: true, message: "Washrooms is required" },
                                        })}
                                    />
                                    {errors.Washrooms && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Washrooms.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="ProjectName" className="text-sm font-medium text-gray-900 block mb-2">Project Name</label>
                                    <input
                                        type="text"
                                        name="ProjectName"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Project Name:"
                                        {...register('ProjectName', {
                                            required: { value: true, message: "Project Name is required" },
                                        })}
                                    />
                                    {errors.ProjectName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.ProjectName.message}</p>
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
    else if(subCategory == "For Sale:Shops and Offices"){
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
                                    <label htmlFor="Furnishing" className="text-sm font-medium text-gray-900 block mb-2">Furnishing</label>
                                    <select
                                        name="Furnishing"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('Furnishing', {
                                            required: { value: true, message: "Furnishing status is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="Furnished">Furnished</option>
                                        <option value="Semi-Furnished">Semi-Furnished</option>
                                        <option value="Unfurnished">Unfurnished</option>
                                    </select>
                                    {errors.Furnishing && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Furnishing.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="ProjectStatus" className="text-sm font-medium text-gray-900 block mb-2">Project Status</label>
                                    <select
                                        name="ProjectStatus"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('ProjectStatus', {
                                            required: { value: true, message: "Project Status is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="New Launch">New Launch</option>
                                        <option value="Ready to Move">Ready to Move</option>
                                        <option value="Under Construction">Under Construction</option>
                                    </select>
                                    {errors.ProjectStatus && (
                                        <p className="text-red-500 text-sm mt-1">{errors.ProjectStatus.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="ListedBy" className="text-sm font-medium text-gray-900 block mb-2">Listed By</label>
                                    <select
                                        name="ListedBy"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('ListedBy', {
                                            required: { value: true, message: "Listed By is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="Builder">Builder</option>
                                        <option value="Dealer">Dealer</option>
                                        <option value="Owner">Owner</option>
                                    </select>
                                    {errors.ListedBy && (
                                        <p className="text-red-500 text-sm mt-1">{errors.ListedBy.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Area" className="text-sm font-medium text-gray-900 block mb-2">Area</label>
                                    <input
                                        type="text"
                                        name="Area"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Area:"
                                        {...register('Area', {
                                            required: { value: true, message: "Area is required" },
                                        })}
                                    />
                                    {errors.Area && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Area.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Maintenance" className="text-sm font-medium text-gray-900 block mb-2">Maintenance (Monthly)</label>
                                    <input
                                        type="text"
                                        name="Maintenance"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Maintenance amount:"
                                        {...register('Maintenance', {
                                            required: { value: true, message: "Maintenance is required" },
                                        })}
                                    />
                                    {errors.Maintenance && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Maintenance.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="CarParking" className="text-sm font-medium text-gray-900 block mb-2">Car Parking</label>
                                    <select
                                        name="CarParking"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('CarParking', {
                                            required: { value: true, message: "Car Parking is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="3+">3+</option>
                                    </select>
                                    {errors.CarParking && (
                                        <p className="text-red-500 text-sm mt-1">{errors.CarParking.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Washrooms" className="text-sm font-medium text-gray-900 block mb-2">Washrooms</label>
                                    <input
                                        type="text"
                                        name="Washrooms"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Washrooms:"
                                        {...register('Washrooms', {
                                            required: { value: true, message: "Washrooms is required" },
                                        })}
                                    />
                                    {errors.Washrooms && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Washrooms.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="ProjectName" className="text-sm font-medium text-gray-900 block mb-2">Project Name</label>
                                    <input
                                        type="text"
                                        name="ProjectName"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Enter Project Name:"
                                        {...register('ProjectName', {
                                            required: { value: true, message: "Project Name is required" },
                                        })}
                                    />
                                    {errors.ProjectName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.ProjectName.message}</p>
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
                                        <option value="Guest Houses">Guest Houses</option>
                                        <option value="PG">PG</option>
                                        <option value="Rommate">Rommate</option>
                                    </select>
                                    {errors.Type && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Type.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Furnishing" className="text-sm font-medium text-gray-900 block mb-2">Furnishing</label>
                                    <select
                                        name="Furnishing"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('Furnishing', {
                                            required: { value: true, message: "Furnishing status is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="Furnished">Furnished</option>
                                        <option value="Semi-Furnished">Semi-Furnished</option>
                                        <option value="Unfurnished">Unfurnished</option>
                                    </select>
                                    {errors.Furnishing && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Furnishing.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="ListedBy" className="text-sm font-medium text-gray-900 block mb-2">Listed By</label>
                                    <select
                                        name="ListedBy"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('ListedBy', {
                                            required: { value: true, message: "Listed By is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="Builder">Builder</option>
                                        <option value="Dealer">Dealer</option>
                                        <option value="Owner">Owner</option>
                                    </select>
                                    {errors.ListedBy && (
                                        <p className="text-red-500 text-sm mt-1">{errors.ListedBy.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="CarParking" className="text-sm font-medium text-gray-900 block mb-2">Car Parking</label>
                                    <select
                                        name="CarParking"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('CarParking', {
                                            required: { value: true, message: "Car Parking is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="3+">3+</option>
                                    </select>
                                    {errors.CarParking && (
                                        <p className="text-red-500 text-sm mt-1">{errors.CarParking.message}</p>
                                    )}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="MealsIncluded" className="text-sm font-medium text-gray-900 block mb-2">Meals Included</label>
                                    <select
                                        name="MealsIncluded"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        {...register('MealsIncluded', {
                                            required: { value: true, message: "Meals Included is required" },
                                        })}
                                    >
                                        <option value=""></option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                    {errors.MealsIncluded && (
                                        <p className="text-red-500 text-sm mt-1">{errors.MealsIncluded.message}</p>
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

export default Properties;
