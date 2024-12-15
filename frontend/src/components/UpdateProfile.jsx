import Dashboard from "./Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { deleteAccount, updateProfile, reset } from "../features/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, isSuccess, message, user } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        fullName: "",
        userName: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName,
                userName: user.userName,
                email: user.email,
                phone: user.phone,
            });
        }
    }, [user]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            if(!user)
                toast.success("Account deleted successfully!");
            else
                toast.success("Profile updated successfully!");
            navigate('/'); 
        }

        dispatch(reset());
    }, [isError, isSuccess, message, user, dispatch, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(formData));
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
                    <h2 className="text-2xl text-slate-800 font-semibold mb-8">Update Profile</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="fullName" className="font-semibold text-gray-600">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="userName" className="font-semibold text-gray-600">Username</label>
                                <input
                                    type="text"
                                    id="userName"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="font-semibold text-gray-600">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="phone" className="font-semibold text-gray-600">Phone Number</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md p-2"
                                />
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
