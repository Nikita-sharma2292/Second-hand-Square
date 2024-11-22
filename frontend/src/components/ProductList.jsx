import Carousel from "./Carousel";
import CarsFilters from "./Filters/CarsFilters";

function ProductList({ handleFilter, handleCategory, products, filteredProducts, isFiltered, handleCart, handleProduct }) {
    if (!isFiltered) {
        return (
            <div className="bg-gray-200">
                <div>
                    <Carousel handleCategory={handleCategory}/>
                </div>
                <section id="Projects"
                    class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">

                    {products && products.length > 0 &&
                        products.map((item, index) => {

                            return (
                                <div onClick={() => handleProduct && handleProduct(item._id)} key={item._id} class="w-60 h-96 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                    <a href="#">
                                        <img src={'http://localhost:4000/' + item.Images}
                                            alt="Product" class="h-60 w-60 object-cover rounded-t-xl" />
                                        <div class="px-4 py-3 w-60">
                                            <span class="text-gray-400 mr-3 uppercase text-xs">{item.Category} | {item.SubCategory}</span>
                                            <p class="text-md mt-3 font-bold text-black truncate block capitalize">{item.Title}</p>
                                            <div class="flex items-center">
                                                <p class="text-lg font-semibold text-black cursor-auto my-3">{item.Price}</p>

                                                <div class="ml-auto"><svg onClick={() => handleCart && handleCart(item._id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                    fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd"
                                                        d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                                    <path
                                                        d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                                </svg></div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )

                        })}
                </section>
            </div>
        )
    }
    else {
        return (
            <div className="flex flex-row">
                <CarsFilters handleFilter={handleFilter}/>
                <section id="Projects"
                    class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">

                    {filteredProducts && filteredProducts.length > 0 &&
                        filteredProducts.map((item, index) => {

                            return (
                                <div onClick={() => handleProduct && handleProduct(item._id)} key={item._id} class="w-60 h-96 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                    <a href="#">
                                        <img src={'http://localhost:4000/' + item.Images}
                                            alt="Product" class="h-60 w-60 object-cover rounded-t-xl" />
                                        <div class="px-4 py-3 w-60">
                                            <span class="text-gray-400 mr-3 uppercase text-xs">{item.Brand}</span>
                                            <p class="text-lg font-bold text-black truncate block capitalize">{item.Title}</p>
                                            <div class="flex items-center">
                                                <p class="text-lg font-semibold text-black cursor-auto my-3">{item.Price}</p>

                                                <div class="ml-auto"><svg onClick={() => handleCart && handleCart(item._id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                    fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd"
                                                        d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                                    <path
                                                        d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                                </svg></div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )

                        })}
                </section>
            </div>
        )
    }
}

export default ProductList;