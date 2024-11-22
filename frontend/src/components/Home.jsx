import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import axios from "axios";
import SubHeader from "./SubHeader";

function Home() {
    const navigate = useNavigate();

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

    const handlesearch = (value) => {
        console.log(value);
        setSearch(value);
    }

    const handleClick = () => {
        console.log(products)
        console.log(search)
        let filteredProducts = products.filter((item) => {
            if(item.Brand?.toLowerCase().includes(search.toLowerCase()) || item.Price?.toLowerCase().includes(search.toLowerCase())
                || item.Title?.toLowerCase().includes(search.toLowerCase()) || item.Description?.toLowerCase().includes(search.toLowerCase())
                || item.Category?.toLowerCase().includes(search.toLowerCase()) || item.SubCategory?.toLowerCase().includes(search.toLowerCase()))
                return item;
        })
        setFiltered(filteredProducts);
        console.log(filtered);
        setIsFiltered(true);
    }

    const handleCategory = (category) => {
        navigate('/CategoryList/'+category.menuItem);
    }

    const handleCarousel = (category) => {
        console.log(category.subText);
        navigate('/CategoryList/'+category.subText);
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

    return (
        <div className="flex flex-col">
            <div>
                <Header search={search} handlesearch={handlesearch} handleClick={handleClick}/>
            </div>
            <div>
                <SubHeader handleCategory={handleCategory}/>
            </div>
            
            <div className="bg-gray-200 h-screen">
                <ProductList handleCategory={handleCarousel} products={products} filteredProducts={filtered} isFiltered={isFiltered} handleCart={handleCart} handleProduct={handleProduct}/>
            </div>
            
        </div>
    )
}

export default Home;