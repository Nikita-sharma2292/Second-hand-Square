import loginImage from '../images/loginImage.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { toast } from "react-toastify";
import { loginUser, reset } from "../features/authSlice";

function Login() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, message, isSuccess, user, token } = useSelector(state => state.auth);

    useEffect(() => {
        if (isError) toast.error(message);
        if (isSuccess) {
            toast.success("Logged in successfully");
            navigate('/');
        }
        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch]);

    const submit = (data) => {
        dispatch(loginUser(data));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple to-lilac">
            <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
                {/* Left Section */}
                <div className="hidden lg:block w-1/2">
                    <img src={loginImage} alt="Login Illustration" className="h-full w-full object-cover" />
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Welcome Back</h2>
                    <p className="text-gray-500 text-center mt-2">Log in to your account</p>
                    
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(submit)}>
                        {/* Username */}
                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-600">Username</label>
                            <input
                                name="userName"
                                type="text"
                                placeholder="Enter your username"
                                {...register('userName', {
                                    required: { value: true, message: "Username is required" },
                                    minLength: { value: 5, message: "Minimum length is 5" },
                                })}
                                className={`w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 ${
                                    errors.userName ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500"
                                }`}
                            />
                            {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register('email', {
                                    required: { value: true, message: "Email is required" },
                                })}
                                className={`w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 ${
                                    errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500"
                                }`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                {...register('password', {
                                    required: { value: true, message: "Password is required" },
                                })}
                                className={`w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 ${
                                    errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500"
                                }`}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className={`w-full py-3 px-6 text-white bg-gradient-to-r from-purple to-lilac rounded-lg hover:from-purple-800 hover:to-lilac-200 focus:outline-none focus:ring-4 focus:ring-purple-300 ${
                                    isSubmitting ? "opacity-50" : ""
                                }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Logging In..." : "Log In"}
                            </button>
                        </div>
                    </form>

                    {/* Signup Link */}
                    <p className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account? <Link to="/signup" className="text-purple-900 font-semibold hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
