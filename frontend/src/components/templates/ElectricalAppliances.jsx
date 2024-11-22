import { transform } from "framer-motion";
import AddProductMenu from "../AddProductMenu";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ElectronicsAppliances() {
    const navigate = useNavigate()

    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState("");
    const [Images, setImages] = useState("");

    const handleApi = () => {
        const formData = new FormData();
        formData.append('Title', Title)
        formData.append('Description', Description)
        formData.append('Price', Price)
        formData.append('Images', Images)
        formData.append('Category', 'Electronics & Appliances')
        formData.append('SubCategory', 'Tvs Video and Audio')
        
        const url = "http://localhost:4000/addProduct/Electronics%20and%20Appliances/Tvs%20Video%20and%20Audio";
        axios.post(url, formData)
        .then(() => {
            
        })
        .catch(() => {

        })
        navigate('/');
    }

    return (
        <div className="flex flex-row">
            <AddProductMenu />
            <div className="md:ml-96 sm:ml-10 bg-white border border-4 rounded-lg shadow w-full m-10">

                <div class="flex p-5 border-b border-gray-300 shadow rounded-t">
                    <h3 class="text-xl font-semibold">
                        Post Your Add
                    </h3>
                </div>
                <div class="flex flex-col p-5 border-b border-gray-300 shadow rounded-t">
                    <h2 class="text-l font-semibold mb-2">
                        Selected Category
                    </h2>
                    <h2 class="text-sm text-gray-400">
                        Electricals and Appliances / TVs Video and Audio
                    </h2>
                </div>

                <div class="p-6 space-y-6">
                    <form action="#">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                <label for="title" class="text-sm font-medium text-gray-900 block mb-2">Add Title</label>
                                <input type="text" value={Title} name="title" id="title" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Key features (e.g. brand, model, type)" required=""
                                onChange={(e) => {setTitle(e.target.value)}}></input>
                            </div>
                            <div class="col-span-full">
                                <label for="product-details" class="text-sm font-medium text-gray-900 block mb-2">Description</label>
                                <textarea type="text" id="product-details" name="description" value={Description} rows="6" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Includes features, condition and reason for selling"
                                required="" onChange={(e) => {setDescription(e.target.value)}}></textarea>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="p-5 border-t border-gray-300 shadow rounded-t">
                    <div className="max-w-[32rem]">
                        <label for="price" class="text-xl font-medium text-gray-900 block mb-2">Set a price</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                                </svg>
                            </div>
                            <input type="number" id="price" value={Price} class="block p-2.5 z-20 ps-10 bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Enter amount" required onChange={(e) => {setPrice(e.target.value)}}/>
                        </div>
                    </div>
                </div>

                <div class="p-5 border-t border-gray-300 shadow rounded-t">
                    <label for="images" class="text-xl font-medium text-gray-900 block mb-2">Upload Images</label>
                    <input type="file" name="images" onChange={(e) => {setImages(e.target.files[0])}}></input>
                </div>

                <div class="p-6 border-t border-gray-300 shadow rounded-b">
                    <button onClick={handleApi} class="text-white bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:ring-cyan-200 text-xl rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Post Add</button>
                </div>

            </div>
        </div>
    )
}

export default ElectronicsAppliances;