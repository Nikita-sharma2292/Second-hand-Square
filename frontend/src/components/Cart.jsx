import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import SubHeader from "./SubHeader";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetProducts } from "../features/productSlice";
import { toast } from "react-toastify";
import { deleteFromCart, getCart, reset } from "../features/authSlice";

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [CartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const { isError, isSuccess, message, cart, isCart } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getCart());
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isCart) {
            toast("Item removed from cart.");
        }
        if (isSuccess) {
            setCartProducts(cart);
        }

        dispatch(reset());
    }, [isError, isSuccess, isCart, cart, message, dispatch]);

    useEffect(() => {
        const total = CartProducts.reduce((acc, item) => acc + Number(item.Price), 0);
        const items = CartProducts.length;
        setTotalPrice(total);
        setTotalItems(items);
    }, [CartProducts]);

    const handleProduct = (id) => {
        navigate('/ProductDetail/',id)
    };

    const handleDelete = (id) => {
        dispatch(deleteFromCart({ id }));
    };

    return (
        <>
            <Header />
            <SubHeader />
            <div className="h-cover bg-gray-300 pt-8 pb-10">
                <div className="mx-auto ml-7 mr-7 w-5xl flex justify-center px-6 md:flex md:space-x-10 xl:px-0">
                    {/* Cart Items Section */}
                    <div className="rounded-lg md:w-2/3">
                        {CartProducts && CartProducts.length > 0 ? (
                            CartProducts.map((item) => (
                                <div
                                    key={item._id}
                                    className="duration-500 hover:scale-105 justify-between mb-6 rounded-lg bg-white p-6 shadow-xl sm:flex sm:justify-start"
                                >
                                    <img
                                        src={item.Images[0]}
                                        alt="product-image"
                                        className="border h-32 min-w-60 object-cover border-gray-300 rounded-lg sm:w-40"
                                    />
                                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div className="mt-5 ml-5 sm:mt-0">
                                            <h2 className="text-lg font-bold text-gray-900">
                                                {item.category} | {item.subCategory}
                                            </h2>
                                            <p className="mt-1 text-xs text-gray-700">{item.Title}</p>
                                            <h2 className="text-xl font-bold text-slate-800 mt-10">
                                                Rs. {item.Price}
                                            </h2>
                                        </div>
                                        <div className="mt-4 flex flex-col justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                            <button
                                                className="border border-slate-800 text-black rounded-3xl p-2"
                                                onClick={() => handleDelete(item._id)}
                                            >
                                                Remove
                                            </button>
                                            <button
                                                className="border duration-500 hover:scale-110 border-slate-700 bg-slate-700 text-white rounded-3xl p-2"
                                                onClick={() => handleProduct(item._id)}
                                            >
                                                Buy Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-700">Your cart is empty.</p>
                        )}
                    </div>

                    {/* Checkout Summary Section */}
                    <div className="rounded-lg h-fit md:w-1/5 bg-white p-6 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-900">Cart Summary</h2>
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-700">Total Items:</span>
                                <span className="font-semibold">{totalItems}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-700">Total Price:</span>
                                <span className="font-semibold">Rs. {totalPrice.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
