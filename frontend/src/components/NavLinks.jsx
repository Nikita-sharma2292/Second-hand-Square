import React, { useState } from "react";

const NavLinks = ({handleCategory}) => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  const links = [
    {
      name: "Cars",
      menus: ["Cars"],
    },
    {
      name: "Properties",
      menus: ["For Sale Houses and Apartments", "For Rent Houses and Apartments", "Land and Plots", "For Rent:Shops and Offices", "For Sale:Shops and Offices", "PG and Guest Houses"],
    },
    {
      name: "Mobiles",
      menus: ["Mobile Phones", "Accessories", "Tablets"],
    },
    {
      name: "Jobs",
      menus: ["Data entry and Bank Office", "Sales and Marketing", "BPO and Telecaller", "Driver", "Office Assistant", "Delivery and Collections", "Teacher", "Cook", "Receptionist and Front Office", "Operator and Technician", "IT Engineer and Developer", "Hotel and Travel Executive", "Accountant", "Designer", "Other"],
    },
    {
      name: "Bikes",
      menus: ["Motorcycles", "Scooters", "Spare Parts", "Bicycles"],
    },
    {
      name: "Electronics",
      menus: ["Tvs Video and Audio", "Kitchen and Other Appliances", "Computers and Laptops", "Cameras and Lenses", "Games and Entertainment", "Fridges", "Computer Accessories", "Hard Disks, Printers and Monitors", "ACs", "Washing Machines"],
    },
    {
      name: "Commercial Vehicals",
      menus: ["Commercial and Other Vehicles", "Spare Parts"],
    },
    {
      name: "Furniture",
      menus: ["Sofa and Dining", "Beds and Wardrobes", "Home Decor and Garden", "Kids Furniture", "Others"],
    },
    {
      name: "Fashion",
      menus: ["Men", "Women", "Kids"],
    },
    {
      name: "Books",
      menus: ["Books", "Gym and Fitness", "Musical Instruments", "Sports Equipments", "Others"],
    },
    {
      name: "Pets",
      menus: ["Fishes and Aquarium", "Pet Food and Accessories", "Dogs", "Other Pets"],
    },
    {
      name: "Services",
      menus: ["Education and Classes", "Tour and Travel", "Electronics Repair and Services", "Health and Beauty", "Home Renovation and Repair", "Cleaning and Pest Control", "Legal and Documentation Services", "Packer and Movers", "Other"],
    },
  ];

  return (
    <>
      {links.map((link) => (
        <div>
          <div className="px-3 text-m flex flex-row gap-1-px text-left md:cursor-pointer group">
            <h1
              className="py-5 flex justify-between items-center md:pr-0 group"
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
                setSubHeading("");
              }}
            >
              {link.name}
              <span className="text-xl md:hidden inline">
                <ion-icon
                  name={`${
                    heading === link.name ? "chevron-up" : "chevron-down"
                  }`}
                ></ion-icon>
              </span>
              <span className="text-xl md:mt-1 md:ml-2  md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                <ion-icon name="chevron-down"></ion-icon>
              </span>
            </h1>
            {link.menus && (
              <div>
                <div className="absolute top-40 hidden group-hover:md:block hover:md:block">
                  <div className="py-3">
                    <div
                      className="w-4 h-4 mt-1 bg-slate-800 rotate-30"
                    ></div>
                  </div>
                  <div className="bg-slate-800 text-white p-5 grid grid-cols-2 gap-8">
                    {link.menus.map((menuItem) => (
                      <div>
                          <li className="text-sm text-white my-2.5">
                            <button
                              className="hover:text-primary"
                              onClick={() => handleCategory && handleCategory({menuItem})}
                            >
                              {menuItem}
                            </button>
                          </li>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Mobile menus */}
          <div
            className={`
            ${heading === link.name ? "md:hidden" : "hidden"}
          `}
          >
              <div>
                <div>
                  <h1
                    onClick={() =>
                      subHeading !== link.name
                        ? setSubHeading(link.name)
                        : setSubHeading("")
                    }
                    className="py-4 pl-7 font-semibold md:pr-0 pr-5 flex justify-between items-center md:pr-0 pr-5"
                  >
                    {link.name}

                    <span className="text-xl md:mt-1 md:ml-2 inline">
                      <ion-icon
                        name={`${
                          subHeading === link.name
                            ? "chevron-up"
                            : "chevron-down"
                        }`}
                      ></ion-icon>
                    </span>
                  </h1>
                  <div
                    className={`${
                      subHeading === link.name ? "md:hidden" : "hidden"
                    }`}
                  >
                    {link.menus.map((slink) => (
                      <li className="py-3 pl-14">
                        <button onClick={() => handleCategory && handleCategory({slink})}>{slink}</button>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NavLinks;