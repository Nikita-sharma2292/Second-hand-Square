import React from "react";

const Carousel = ({handleCategory}) => {
  const menuItem = [
    {
      text: "Electronics",
      subText: "Tvs Video and Audio",
      image:
        "https://www.ceiworldexpo.com/img/india-market-info/electronics.jpeg",
    },
    {
      text: "Cars",
      subText: "Cars",
      image:
        "https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/rolls_royce_phantom_top_10.jpg?itok=XjL9f1tx"},
    {
      text: "Furniture",
      subText: "Sofa and Dining",
      image:
        "https://static.asianpaints.com/content/dam/asian_paints/resources/aphomes-categorypage/furniture/ap-homes-usage-furniture-living-room-asian-paints.jpg",
    },
    {
      text: "Fashion",
      subText: "Women",
      image:
        "https://ctnbee.com/blog/en/wp-content/uploads/sites/2/2021/07/ubrania-na-lato-1.jpg",
    },
  ];

  return (
    <div className="bg-white border border-gray-500 mr-8 mt-10 ml-8 rounded-2xl">
    <div className="text-black text-slate-700 text-2xl font-bold flex justify-center pt-5 font-serif">Top Categories</div>
    <div className="max-w-[1640px] z-0 mx-auto p-4 py-12 grid md:grid-cols-4 gap-6">
      {/* Card */}

      {menuItem.map(({ text, subText, image }, index) => {
        return (
          <div key={index} className="rounded-xl relative">
            {/* Overlay */}
            <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
              <p className="font-bold text-2xl px-2 pt-4">{text} </p>
              <button className="border rounded-xl px-5 py-1 border-white bg-white text-black hover:bg-black/50 hover:text-white border-none mx-2 absolute bottom-4"
                      onClick={() => handleCategory && handleCategory({subText})}>
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
  );
};

export default Carousel;