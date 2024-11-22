import login from '../images/login.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import Header from './Header';
import SubHeader from './SubHeader';

function Login() {
    const navigate = useNavigate();

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [msg, setmsg] = useState('');

    const handleApi = (e) => {
        e.preventDefault();
        const url = "http://localhost:4000/login";
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    setmsg(res.data.message);
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        localStorage.setItem('phone', res.data.phone);
                        navigate("/");
                    }
                }
            })
            .catch((err) => {
                alert(err);
            })
    }

    return (
        <div class="bg-slate-800 dark:bg-gray-900">
            <div class="flex justify-center h-screen">
                <div class="flex">
                    <img src={login} className='min-w-4xl'></img>
                </div>

                <div class="flex bg-slate-800 items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                    <div class="flex-1">
                        <div class="text-center">
                            <h2 class="text-4xl font-bold text-center text-white dark:text-white">LOG IN</h2>

                            <p class="mt-3 text-white dark:text-gray-300">Log in to access your account</p>
                        </div>

                        <div class="mt-8">
                            <form>
                                <div>
                                    <label for="username" class="block mb-2 text-sm text-white dark:text-gray-200">Username</label>
                                    <input type="text" value={username} name="username" id="username" placeholder="username" 
                                        onChange={(e) => { setusername(e.target.value) }}
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div class="mt-6">
                                    <div class="flex justify-between mb-2">
                                        <label for="password" class="text-sm text-white dark:text-gray-200">Password</label>
                                        {/* <a href="#" class="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a> */}
                                    </div>

                                    <input type="password" value={password} name="password" id="password" placeholder="Your Password"
                                        onChange={(e) => { setpassword(e.target.value) }} 
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div class="mt-6">
                                    <button
                                        onClick={handleApi}
                                        class="w-full px-4 py-2 tracking-wide bg-blue-500 hover:bg-blue-400 text-teal-800 transition-colors duration-200 transform text-white rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                        Log in
                                    </button>
                                </div>

                            </form>

                            <p className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <Link to="/signup" className='text-blue-400'>Sign in</Link>.</p>
                            <p class="text-center mt-3 text-gray-500 dark:text-gray-300">{msg}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;