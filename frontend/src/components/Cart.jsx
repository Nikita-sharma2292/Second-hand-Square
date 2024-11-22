import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SubHeader from "./SubHeader";

function Cart() {
    const navigate = useNavigate();

    const [CartProducts, setCartProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [])

    useEffect(() => {
        const url='http://localhost:4000/Cart'
        let data = {userId : localStorage.getItem('userId')}
        axios.post(url, data)
        .then((res) => {
            console.log(res.data.products[0].likedProducts);
            if(res.data.products){
                setCartProducts(res.data.products[0].likedProducts)
            }
        })
        .catch((err) => {
            // console.log(err);
            alert('server error');
        })
    }, [refresh])

    const handleProduct = (id) => {
        navigate('/ProductDetail/'+id)
    }

    const handleDelete = (id) => {
        const url='http://localhost:4000/Cart/Delete'
        let user = localStorage.getItem('userId');
        let data = {productId : id, userId : user}
        
        axios.post(url, data)
        .then((res) => {
            if (res.data.message){
                alert('Deleted successfully')
                setRefresh(!refresh);
            }
        })
        .catch((err) => {
            alert('server error');
        })
        navigate('/Cart');
    }

    return (
        <>
            <Header/>
            <SubHeader/>
            <div class="h-screen bg-gray-300 pt-8">
            <div class="mx-auto ml-7 mr-7 w-5xl justify-center px-6 md:flex md:space-x-10 xl:px-0">
                 <div class="rounded-lg md:w-2/3">

                     {CartProducts && CartProducts.length > 0 &&
                         CartProducts.map((item, index) => {

                             return (
                                 <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-xl sm:flex sm:justify-start">
                                     <img src={'http://localhost:4000/' + item.Images} alt="product-image" class="border h-32 min-w-60 object-cover border-gray-300 rounded-lg sm:w-40" />
                                     <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                         <div class="mt-5 ml-5 sm:mt-0">
                                             <h2 class="text-lg font-bold text-gray-900">{item.Category} | {item.SubCategory}</h2>
                                             <p class="mt-1 text-xs text-gray-700">{item.Title}</p>
                                             <h2 class="text-xl font-bold text-slate-800 mt-10">Rs. {item.Price}</h2>
                                         </div>
                                         <div class="mt-4 flex flex-col justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                             <button className="border border-slate-800 bg-slate-500 text-white rounded-3xl p-2" onClick={() => handleDelete(item._id)}>Remove</button>
                                             <button className="border border-slate-800 bg-slate-700 text-white rounded-3xl p-2" onClick={() => handleProduct(item._id)}>Buy Now</button>
                                         </div>
                                     </div>
                                 </div>
                             )
                         })}
                 </div>
             </div>
         </div>
        </>
    )
}

export default Cart;