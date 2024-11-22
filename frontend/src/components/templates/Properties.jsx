import { transform } from "framer-motion";
import AddProductMenu from "../AddProductMenu";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Properties() {
    const navigate = useNavigate()

    const [Type, setType] = useState("");
    const [Bedrooms, setBedrooms] = useState("");
    const [Bathrooms, setBathrooms] = useState("");
    const [Furnishing, setFurnishing] = useState("");
    const [Status, setStatus] = useState("");
    const [ListedBy, setListedBy] = useState("");
    const [BuiltUpArea, setBuiltUpArea] = useState("");
    const [CarpetArea, setCarpetArea] = useState("");
    const [Maintenance, setMaintenance] = useState("");
    const [TotalFloors, setTotalFloors] = useState("");
    const [FloorNo, setFloorNo] = useState("");
    const [CarParking, setCarParking] = useState("");
    const [Facing, setFacing] = useState("");
    const [ProjectName, setProjectName] = useState("");
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState("");
    const [Images, setImages] = useState("");

    const handleApi = () => {
        const formData = new FormData();
        formData.append('Type', Type)
        formData.append('Bedrooms', Bedrooms)
        formData.append('Bathrooms', Bathrooms)
        formData.append('Furnishing', Furnishing)
        formData.append('Status', Status)
        formData.append('ListedBy', ListedBy)
        formData.append('BuiltUpArea', BuiltUpArea)
        formData.append('CarpetArea', CarpetArea)
        formData.append('Maintenance', Maintenance)
        formData.append('TotalFloors', TotalFloors)
        formData.append('FloorNo', FloorNo)
        formData.append('CarParking', CarParking)
        formData.append('Facing', Facing)
        formData.append('ProjectName', ProjectName)
        formData.append('Title', Title)
        formData.append('Description', Description)
        formData.append('Price', Price)
        formData.append('Images', Images)
        formData.append('Category', 'Properties')
        formData.append('SubCategory', 'For Sale Houses and Apartments')

        const url = "http://localhost:4000/addProduct/Properties/For%20Sale%20Houses%20and%20Apartments";
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
                        Properties / For Sale Houses and Apartments
                    </h2>
                </div>

                <div class="p-6 space-y-6">
                    <form action="#">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                <label for="type" class="text-sm font-medium text-gray-900 block mb-2">Type</label>
                                <select id="type" value={Type} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" onChange={(e) => { setType(e.target.value) }}>
                                    <option selected>Select Type</option>
                                    <option value="Apartments">Apartments</option>
                                    <option value="Builder Floors">Builder Floors</option>
                                    <option value="Farm Houses">Farm Houses</option>
                                    <option value="Houses & Villas">Houses & Villas</option>
                                </select>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="bedrooms" class="text-sm font-medium text-gray-900 block mb-2">Bedrooms</label>
                                <select id="bedrooms" value={Bedrooms} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" onChange={(e) => { setBedrooms(e.target.value) }}>
                                    <option selected>No. of bedrooms</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="4+">4+</option>
                                </select>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="bathrooms" class="text-sm font-medium text-gray-900 block mb-2">Bathrooms</label>
                                <select id="bathrooms" value={Bathrooms} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" onChange={(e) => { setBathrooms(e.target.value) }}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="4+">4+</option>
                                </select>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="furnishing" class="text-sm font-medium text-gray-900 block mb-2">Furnishing</label>
                                <select id="furnishing" value={Furnishing} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" onChange={(e) => { setFurnishing(e.target.value) }}>
                                    <option selected>Select Furnishing Type</option>
                                    <option value="Furnished">Furnished</option>
                                    <option value="Semi-Furnished">Semi-Furnished</option>
                                    <option value="Unfurnished">Unfurnished</option>
                                </select>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="Status" class="text-sm font-medium text-gray-900 block mb-2">Construction Status</label>
                                <select id="Status" value={Status} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" onChange={(e) => { setStatus(e.target.value) }}>
                                    <option selected>Select Construction Status</option>
                                    <option value="New Launch">New Launch</option>
                                    <option value="Ready to move">Ready to move</option>
                                    <option value="Under Construction">Under Construction</option>
                                </select>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="ListedBy" class="text-sm font-medium text-gray-900 block mb-2">Listed By</label>
                                <select id="ListedBy" value={ListedBy} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" onChange={(e) => { setListedBy(e.target.value) }}>
                                    <option selected>Listed By</option>
                                    <option value="Builder">Builder</option>
                                    <option value="Dealer">Dealer</option>
                                    <option value="Owner">Owner</option>
                                </select>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="BuiltUpArea" class="text-sm font-medium text-gray-900 block mb-2">Builtup Area (ft2)</label>
                                <input type="text" name="BuiltUpArea" id="BuiltUpArea" value={BuiltUpArea} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Ford Aspire”" required=""
                                    onChange={(e) => { setBuiltUpArea(e.target.value) }}></input>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="CarpetArea" class="text-sm font-medium text-gray-900 block mb-2">Carpet Area</label>
                                <input type="text" name="CarpetArea" id="CarpetArea" value={CarpetArea} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="2017" required=""
                                    onChange={(e) => { setCarpetArea(e.target.value) }}></input>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="Maintenance" class="text-sm font-medium text-gray-900 block mb-2">Maintenance (Monthly)</label>
                                <input type="text" name="Maintenance" id="Maintenance" value={Maintenance} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="2017" required=""
                                    onChange={(e) => { setMaintenance(e.target.value) }}></input>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="TotalFloors" class="text-sm font-medium text-gray-900 block mb-2">Total Floors</label>
                                <input type="text" name="TotalFloors" id="TotalFloors" value={TotalFloors} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="2017" required=""
                                    onChange={(e) => { setTotalFloors(e.target.value) }}></input>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="FloorNo" class="text-sm font-medium text-gray-900 block mb-2">Floor No</label>
                                <input type="text" name="FloorNo" id="FloorNo" value={FloorNo} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="2017" required=""
                                    onChange={(e) => { setFloorNo(e.target.value) }}></input>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="CarParking" class="text-sm font-medium text-gray-900 block mb-2">Car Parking</label>
                                <select id="CarParking" value={CarParking} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" onChange={(e) => { setCarParking(e.target.value) }}>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="3+">3+</option>
                                </select>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="Facing" class="text-sm font-medium text-gray-900 block mb-2">Facing</label>
                                <input type="text" name="Facing" id="Facing" value={Facing} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="2017" required=""
                                    onChange={(e) => { setFacing(e.target.value) }}></input>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="ProjectName" class="text-sm font-medium text-gray-900 block mb-2">Project Name</label>
                                <input type="text" name="ProjectName" id="ProjectName" value={ProjectName} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="2017" required=""
                                    onChange={(e) => { setProjectName(e.target.value) }}></input>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="title" class="text-sm font-medium text-gray-900 block mb-2">Add Title</label>
                                <input type="text" value={Title} name="title" id="title" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Key features (e.g. brand, model, type)" required=""
                                    onChange={(e) => { setTitle(e.target.value) }}></input>
                            </div>
                            <div class="col-span-full">
                                <label for="product-details" class="text-sm font-medium text-gray-900 block mb-2">Description</label>
                                <textarea type="text" id="product-details" name="description" value={Description} rows="6" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Includes features, condition and reason for selling"
                                    required="" onChange={(e) => { setDescription(e.target.value) }}></textarea>
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
                            <input type="number" id="price" value={Price} class="block p-2.5 z-20 ps-10 bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Enter amount" required onChange={(e) => { setPrice(e.target.value) }} />
                        </div>
                    </div>
                </div>

                <div class="p-5 border-t border-gray-300 shadow rounded-t">
                    <label for="images" class="text-xl font-medium text-gray-900 block mb-2">Upload Images</label>
                    <input type="file" name="images" onChange={(e) => { setImages(e.target.files[0]) }}></input>
                </div>

                <div class="p-6 border-t border-gray-300 shadow rounded-b">
                    <button onClick={handleApi} class="text-white bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:ring-cyan-200 text-xl rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Post Add</button>
                </div>

            </div>
        </div>
    )
}

export default Properties;