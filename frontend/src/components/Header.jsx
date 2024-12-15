import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { searchProducts, resetProducts } from "../features/productSlice";
import { toast } from "react-toastify";
import { logout, reset } from "../features/authSlice";

function Header() {
    const [search, setsearch] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, isSuccess, isSearched, message, searchedProducts } = useSelector(state => state.products);
    const { token } = useSelector(state => state.auth);
    const isLogoutSuccess = useSelector(state => state.auth.isSuccess);
    const isLogoutError = useSelector(state => state.auth.isError);

    const handleClick = () => {
        dispatch(searchProducts(search));
    };

    useEffect(() => {
        if (isLogoutError && token) {
            toast.error(message);
        }
        if(isError && !isSearched)
            toast.error(message);

        if (isSearched && isSuccess && searchedProducts.length > 0) {
            toast.success("Search successful");
        }

        if (isLogoutSuccess && token=='') {
            toast("User logged out!");
            // navigate('/');
        }

        dispatch(reset());
        dispatch(resetProducts());
    }, [isError, isSearched, isSuccess, message, isLogoutSuccess, isLogoutError])

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <header className="border-b mt-2 font-sans min-h-[60px] px-10 py-3 relative">
            <div className="flex justify-between items-center">
                {/* Left: Post Add Button */}
                <div onClick={() => navigate('/addProduct')} class='max-lg:border-b ml-10 max-lg:py-2'>
                    <button className='w-28 h-14 p-3 rounded-2xl bg-slate-800 text-white text-gray-600 font-semibold hover:bg-slate-700 text-[18px]'>
                        Post Add</button>
                </div>

                {/* Center: Navigation Links and Search */}
                <div className="flex items-center space-x-10 w-full justify-center">
                    {/* Navigation Links */}
                    <ul className="flex space-x-10">
                        <li>
                            <Link to="/" className="text-gray-800 font-bold text-[17px]">
                                Home
                            </Link>
                        </li>
                        <li>
                            {!token ? (
                                <Link to="/login" className="text-gray-800 font-bold text-[17px]">
                                    Login
                                </Link>
                            ) : (
                                <button
                                    className="text-gray-800 font-bold text-[17px]"
                                    onClick={() => handleLogout()}
                                >
                                    Logout
                                </button>
                            )}
                        </li>
                        <li>
                            <Link to="/signup" className="text-gray-800 font-bold text-[17px]">
                                Signup
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Right: Cart and Profile Icons */}
                <div className="flex items-center space-x-10">
                    {/* Profile Icon */}
                    <Link to='/Profile'>
                        <div className="relative cursor-pointer">
                            <FaUserCircle size={40} className="text-slate-800 hover:text-slate-700" />
                        </div>
                    </Link>

                    {/* Cart Icon */}
                    <Link to="/cart">
                        <div className="relative cursor-pointer pr-5">
                            <FaShoppingCart size={40} className="text-slate-800 hover:text-slate-700" />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Search Area */}
            <div className="bg-gray-200 border border-gray-300 hover:border-gray-500 focus-within:border-blue-500 flex px-6 rounded-full h-9 w-2/4 mt-3 mx-auto max-lg:mt-6">
                <div onClick={() => handleClick()} className="mt-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 192.904 192.904"
                        width="16px"
                        className="fill-gray-600 mr-3 rotate-90"
                    >
                        <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                    </svg>
                </div>
                <div className="mt-1">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                        placeholder="Search..."
                        className="w-full outline-none bg-transparent text-gray-600 font-semibold text-[15px]"
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;
