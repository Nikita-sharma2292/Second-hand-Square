import Dashboard from "./Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { deleteMyAdd, getMyAdds, reset } from "../features/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function MyAdds() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [Adds, setAdds] = useState([]);

    const { isError, isSuccess, message, allAdds, isAddDeleted } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMyAdds());
    }, [isAddDeleted]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            if(isAddDeleted){
                toast(message);
            }
            setAdds(allAdds);
        }

        dispatch(reset());
    }, [isError, isSuccess, allAdds, message, isAddDeleted]);

    const handleProduct = (id) => {
        navigate(`/ProductDetail/${id}`);
    };

    const handleDelete = (id) => {
        dispatch(deleteMyAdd({id}));
    };

    return (
        <div className="flex h-screen">
            <Dashboard />
            <div className="bg-slate-800 min-h-screen w-3/4 flex justify-center items-center relative">
                <div className="absolute flex flex-row m-10 inset-0 justify-center bg-white bg-opacity-50 rounded-3xl backdrop-blur-md">
                    <div className="mx-auto ml-7 mr-7 mt-5 mb-5 w-5xl flex justify-center px-6 md:flex md:space-x-10 xl:px-0">
                        <div className="rounded-lg max-h-screen overflow-y-auto p-4">
                            {Adds && Adds.length > 0 ? (
                                Adds.map((item) => (
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
                                                    className="border w-20 text-lg border-slate-800 text-black rounded-3xl p-2"
                                                    onClick={() => handleDelete(item._id)}
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    className="border w-20 text-lg duration-500 hover:scale-110 border-slate-700 bg-slate-700 text-white rounded-3xl p-2"
                                                    onClick={() => handleProduct(item._id)}
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-700">No adds posted till now.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyAdds;
