import login from '../images/login.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";



function Signup() {
    const navigate = useNavigate()

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [phoneNo, setPhone] = useState('');

    const handleApi = (e) => {
        e.preventDefault();
        
        const url = 'http://localhost:4000/signup';
        const data = { username, email, phoneNo, password };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert(res.data.message);
                    navigate("/login");
                }
            })
            .catch((err) => {
                alert(err);
            })
    }

    return (
        <div class="bg-slate-800 text-white dark:bg-gray-900">
            <div class="flex justify-center h-screen">
                <div class="flex">
                    <img src={login} className='min-w-4xl'></img>
                </div>

                <div class="flex bg-slate-800 items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                    <div class="flex-1">
                        <div class="text-center">
                            <h2 class="text-4xl font-bold text-white text-center text-gray-700 dark:text-white">SIGN IN</h2>

                            <p class="mt-3 text-gray-500 text-white dark:text-gray-300">Sign in to create your account</p>
                        </div>

                        <div class="mt-8">
                            <form>
                                <div>
                                    <label for="username" class="block text-white mb-2 text-sm text-gray-600 dark:text-gray-200">Username</label>
                                    <input type="text" value={username} name="username" id="username" placeholder="username" 
                                        onChange={(e) => { setusername(e.target.value) }}
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div>
                                    <label for="email" class="block mb-2 mt-6 text-sm text-white text-gray-600 dark:text-gray-200">Email Address</label>
                                    <input type="email" value={email} name="email" id="email" placeholder="example@example.com" 
                                        onChange={(e) => { setemail(e.target.value) }}
                                        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div>
                                    <label for="phoneNo" class="block mb-2 mt-6 text-sm text-white text-gray-600 dark:text-gray-200">Mobile Number</label>
                                    <input type="number" value={phoneNo} name="phoneNo" id="phoneNo" placeholder="123xxxxxxx" 
                                        onChange={(e) => { setPhone(e.target.value) }}
                                        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div class="mt-6">
                                    <div class="flex justify-between mb-2">
                                        <label for="password" class="text-sm text-white text-gray-600 dark:text-gray-200">Password</label>
                                        {/* <a href="#" class="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a> */}
                                    </div>

                                    <input type="password" value={password} name="password" id="password" placeholder="Your Password" 
                                        onChange={(e) => { setpassword(e.target.value) }}
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div class="mt-6">
                                    <button
                                        onClick={handleApi}
                                        class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                        Sign in
                                    </button>
                                </div>

                            </form>

                            <p className="mt-6 text-sm text-center text-gray-400">Already have an account? <Link to="/login" className='text-blue-600'>Log in</Link>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;