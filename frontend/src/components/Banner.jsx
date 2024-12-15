import React from 'react';
import Banner4 from "../images/Banner4.jpeg";

function ProductBanner() {
    return (
        <div className='bg-gray-200 flex justify-center'>
            <div className="relative w-5/6 bg-cover bg-center">
                <img src={Banner4} alt="Banner" className="w-full object-fit" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                    {/* Caption Text */}
                    <div className="text-center text-white mx-4 w-2/6">
                        <h1 className="text-2xl text-gray-400 mb-2">We believe in</h1>
                        <p className="text-5xl text-gray-300 leading-snug">One Person’s <bold>Old</bold> is Another Person’s <p className='font-bold text-orange-600'>New!</p></p>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default ProductBanner;
