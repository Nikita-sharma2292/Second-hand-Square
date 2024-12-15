import { useEffect, useState } from "react";
import Header from "./Header";
import ProductList from "./ProductList";
import SubHeader from "./SubHeader";
import Banner from "./Banner";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, resetProducts } from "../features/productSlice";
import { toast } from "react-toastify";

function Home() {
    const [allproducts, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, message, isSuccess, products } = useSelector(state => state.products);

    

    return ( 
        <div className="flex flex-col">
            <div>
                <Header/>
            </div>
            <div>
                <SubHeader/>
            </div>
            <div>
                <Banner/>
            </div>
            
            <div className="bg-gray-200 h-screen">
                <ProductList/>
            </div>
            
        </div>
    )
}

export default Home;