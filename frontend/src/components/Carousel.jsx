import React from "react";
import car3 from "../images/car3.jpeg";
import electronics from "../images/electronics.jpeg";
import sofa2 from "../images/sofa2.jpeg";
import phone3 from "../images/phone3.jpeg";
import {useNavigate} from "react-router-dom";

const Carousel = () => {
  const navigate = useNavigate();
  
  const menuItem = [
    {
      text: "Electronics and Appliances",
      subText: "Tvs Video and Audio",
      image: electronics,
    },
    {
      text: "Cars",
      subText: "Cars",
      image: car3
    },
    {
      text: "Furniture",
      subText: "Sofa and Dining",
      image: sofa2
    },
    {
      text: "Mobiles",
      subText: "Mobile Phones",
      image: phone3
    },
  ];

  return (
    <div className=" flex justify-center">
      <div className="font-sans mt-10 w-5/6 rounded-2xl">
        <div className="text-black text-slate-700 text-4xl font-bold flex justify-center pt-5 font-sans">Top Categories</div>
        <div className="text-black text-slate-700 text-xs font-medium flex justify-center pt-5 font-sans">Step into the Spotlight with Our Bestsellers!</div>
        <div className="max-w-[1640px] z-0 mx-auto p-4 py-6 grid md:grid-cols-4 gap-6">
          {/* Card */}

          {menuItem.map(({ text, subText, image }, index) => {
            return (
              <div key={index} className="rounded-xl relative">
                {/* Overlay */}
                <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
                  <p className="font-bold text-2xl px-2 pt-4">{text} </p>
                  <button className="border rounded-xl px-5 py-1 border-white bg-white text-black hover:bg-black/50 hover:text-white border-none mx-2 absolute bottom-4"
                    onClick={() => navigate(`CategoryList/${text}/${subText}`)}>
                    Explore
                  </button>
                </div>
                <img
                  className="max-h-[160px]  md:max-h-[200px] w-full object-cover rounded-xl"
                  src={image}
                  alt="/"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;