import Carousel from "./Carousel";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { getAllProducts, resetProducts } from "../features/productSlice";
import { toast } from "react-toastify";
import { addToCart, reset } from "../features/authSlice";

function ProductList() {
    const [allproducts, setProducts] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, message, isSuccess, products, isSearched, searchedProducts} = useSelector(state => state.products);
    const {cart, isCart, token, user} = useSelector(state => state.auth);
    const isCartError = useSelector(state => state.auth.isError);
    const cartMessage = useSelector(state=> state.auth.message);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [])

    useEffect(() => {
        if (isError || isCartError) {
            toast.error(message);
        }

        if(isCart){
            toast(cartMessage);
            dispatch(reset());
        }

        if (isSuccess) {
            if (isSearched) {
                if(searchedProducts.length==0)  toast.error("No such item exists");
                else    setProducts(searchedProducts);
            } else {
                setProducts(products);
            }
        }
        

        dispatch(resetProducts());
    }, [isError, isSuccess, message, products, navigate, dispatch, cart, isCart, allproducts])

    return (
        <div className="bg-gray-200 h-cover pb-10">
            <div>
                <Carousel />
            </div>
            <section
                class="w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-5 md:grid-cols-2 justify-items-center justify-center gap-y-8 gap-x-8 mt-10 mb-5">

                {allproducts && allproducts.length > 0 &&
                    allproducts.map((item) => {

                        return (
                            <div key={item._id} onClick={()=>navigate(`/ProductDetail/${item._id}`)} class="w-60 h-96 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                    <div>
                                        <img src={item.Images[0]}
                                            alt="Product" class="h-60 w-60 object-cover rounded-t-xl" />
                                    </div>
                                    <div class="px-4 py-3 w-60">
                                        <span class="text-gray-400 mr-3 uppercase text-xs">{item.category} | {item.subCategory}</span>
                                        <p class="text-md mt-3 font-bold text-black truncate block capitalize">{item.Title}</p>
                                        <div class="flex items-center">
                                            <p class="text-lg font-semibold text-black cursor-auto my-3">{item.Price}</p>

                                            <div class="ml-auto" onClick={()=>dispatch(addToCart({'id': item._id}))}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                    fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd"
                                                        d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                                    <path
                                                        d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        )

                    })}
            </section>
        </div>
    )
}

export default ProductList;