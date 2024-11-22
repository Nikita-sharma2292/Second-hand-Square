import { useEffect, useState } from "react";
import Header from "./Header";
import {useParams, useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import axios from "axios";
import SubHeader from "./SubHeader";

function CategoryList () {
    const navigate = useNavigate();
    const p = useParams();
    const category = p.category; 

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [])

    useEffect(() => {
        const url='http://localhost:4000/get-products'
        axios.get(url)
        .then((res) => {
            if(res.data.products)
                setProducts(res.data.products)
        })
        .catch((err) => {
            alert('server error');
        })
    }, [])

    useEffect(() => {
        console.log(category)
        let filteredProducts = products.filter((item) => {
            if(item.SubCategory.includes(category))
                return item;
        })
        setFiltered(filteredProducts);
        setIsFiltered(true);
        
        console.log(filteredProducts);
    },[products, category])

    const handlesearch = (value) => {
        console.log(value);
        setSearch(value);
    }

    const handleClick = () => {
        console.log(products)
        console.log(search)
        let filteredProducts = products.filter((item) => {
            if(item.Brand?.toLowerCase().includes(search.toLowerCase()) 
                || item.Title?.toLowerCase().includes(search.toLowerCase()) || item.Description?.toLowerCase().includes(search.toLowerCase())
                || item.Category?.toLowerCase().includes(search.toLowerCase()) || item.SubCategory?.toLowerCase().includes(search.toLowerCase()) || item.Price?.toLowerCase().includes(search.toLowerCase()))
                return item;
        })
        setFiltered(filteredProducts);
        console.log(filtered);
        setIsFiltered(true);
    }

    const handleCategory = (category) => {
        navigate('/CategoryList/'+category);
    }

    const handleCart = (productId) => {
        let userId = localStorage.getItem('userId')
        console.log('userid', 'productid', productId, userId)
        const url='http://localhost:4000/Cart'
        const data={userId, productId}
        axios.put(url, data)
        .then((res) => {
            if(res.data.message)
                alert('liked')
        })
        .catch((err) => {
            alert('server error');
        })
    }

    const handleProduct = (id) => {
        navigate('/ProductDetail/'+id)
    }

    const handleFilter = (data) => {
        console.log(data.KM);
        
        let filteredProducts = products.filter((item) => {
            if((item.Category == 'Cars'))
                if(((2024-item.Year?.toLowerCase()) <= data.Year[0]?.toLowerCase()) || (item.Price?.toLowerCase() <= data.Price[0]?.toLowerCase()) ||
                   (data.Brand.includes(item.Brand)) || (data.Transmission.includes(item.Transmission)) || ((data.Owners.includes(item.Owners))) ||
                   (data.Fuel.includes(item.Fuel)) || (item.KM?.toLowerCase() <= data.KM[0]?.toLowerCase()))
                return item;
        }) 

        setFiltered(filteredProducts);
        console.log(filtered);
        setIsFiltered(true);
        // navigate('/');
    }

    return (
        <div className="flex flex-col">
            <div>
                <Header search={search} handlesearch={handlesearch} handleClick={handleClick}/>
            </div>
            <div>
                <SubHeader handleCategory={handleCategory}/>
            </div>
            {/* <div className="flex flex-row bg-gray-200">
            <div className="border border-black w-[30%] mt-10 mb-10 ml-8 rounded-2xl bg-white"><div><CarsFilters /></div></div> */}
            <div className="bg-gray-200 h-screen">
                <ProductList handleFilter={handleFilter} products={products} filteredProducts={filtered} isFiltered={isFiltered} handleCart={handleCart} handleProduct={handleProduct}/>
            </div>
            {/* </div> */}
        </div>
    );
}

export default CategoryList;