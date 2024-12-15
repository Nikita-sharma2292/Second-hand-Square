import Dashboard from "./Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { deleteAccount, updateProfile, reset, changePassword } from "../features/authSlice";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, isSuccess, message, user } = useSelector(state => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            if (!user) {
                toast.success("Account deleted successfully!");
            } else {
                toast.success("Password updated successfully!");
            }
            navigate('/');
        }

        dispatch(reset());
    }, [isError, isSuccess, message, user, dispatch, navigate]);

    const submit = (data) => {
        dispatch(changePassword(data));
    };

    const handleDelete = () => {
        dispatch(deleteAccount());
    };

    return (
        <div className="flex h-screen">
            <Dashboard />
            <div className="bg-slate-800 min-h-screen w-3/4 flex justify-center items-center relative">
                <div className="absolute flex flex-row m-10 inset-0 bg-white bg-opacity-50 rounded-3xl backdrop-blur-md">
                    <div className="relative m-10 bg-white rounded-3xl shadow-md p-6 z-10 max-w-lg w-full">
                        {user ? (
                            <>
                                <div className="flex flex-col items-center">
                                    <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-16 w-16 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.9 0-7 3.1-7 7 0 .6.4 1 1 1h12c.6 0 1-.4 1-1 0-3.9-3.1-7-7-7z"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-3xl font-semibold">{user.fullName}</h2>
                                    <p className="text-gray-500 pt-2 text-md">
                                        <span className="font-semibold">Member since:</span> {user.createdAt.slice(0, 4)}
                                    </p>
                                </div>
                                <div className="mt-4 p-8 border-solid border-t pt-4">
                                    <div className="mt-2 space-y-4">
                                        <div className="flex justify-between text-gray-600 text-md">
                                            <span className="font-semibold">Username:</span>
                                            <span>{user.userName}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600 text-md">
                                            <span className="font-semibold">Full Name:</span>
                                            <span>{user.fullName}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600 text-md">
                                            <span className="font-semibold">Email:</span>
                                            <span>{user.email}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600 text-md">
                                            <span className="font-semibold">Phone Number:</span>
                                            <span>+91 {user.phone}</span>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={handleDelete} className='max-lg:border-b flex justify-center max-lg:py-2'>
                                    <button className='w-fit h-14 p-3 flex justify-center rounded-2xl bg-slate-800 text-white text-gray-600 font-semibold hover:bg-slate-700 text-[18px]'>
                                        Delete Profile
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold text-slate-800">Login to get profile</h2>
                            </div>
                        )}
                    </div>
                    <div className="relative m-10 bg-white rounded-3xl shadow-md p-6 z-10 max-w-lg w-full">
                        <h2 className="text-2xl text-slate-800 font-semibold mb-8">Change Password</h2>
                        <form onSubmit={handleSubmit(submit)} className="space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="oldPassword" className="font-semibold mb-2 text-gray-600">Old Password</label>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    placeholder="Enter your old password"
                                    {...register('oldPassword', {
                                        required: { value: true, message: "Old Password is required" },
                                    })}
                                    className={`border border-gray-300 rounded-md p-2
                                    ${errors.oldPassword ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500"}`}
                                />
                                {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword.message}</p>}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="newPassword" className="font-semibold mb-2 text-gray-600">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder="Enter your new password"
                                    {...register('newPassword', {
                                        required: { value: true, message: "New Password is required" },
                                    })}
                                    className={`border border-gray-300 rounded-md p-2
                                        ${errors.newPassword ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500"}`}
                                />
                                {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="w-fit p-4 bg-slate-800 text-lg text-white py-2 rounded-md font-semibold hover:bg-slate-700"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfile;
