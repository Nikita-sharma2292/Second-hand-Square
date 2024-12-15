import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const NavLinks = ({handleCategory}) => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  const navigate = useNavigate();

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
      name: "Electronics and Appliances",
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
  ];

  return (
    <>
      {links.map((link) => (
        <div>
          <div className="px-3 font-sans text-s flex flex-row gap-1-px text-left md:cursor-pointer group">
            <h1
              className="py-5 flex font-normal justify-between items-center group"
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
                setSubHeading("");
              }}
            >
              {link.name}
            </h1>
            {link.menus && (
              <div>
                <div className="absolute top-40 hidden group-hover:md:block hover:md:block">
                  <div className="py-3">
                    <div
                      className="w-4 h-4 mt-1 bg-slate-800 rotate-30"
                    ></div>
                  </div>
                  <div className="bg-slate-800 text-white p-3 grid grid-cols-2 gap-1">
                    {link.menus.map((menuItem) => (
                      <div>
                          <li className="text-sm font-normal text-white my-3 mx-3">
                            <button
                              className="hover:text-primary"
                              onClick={() => navigate(`/CategoryList/${link.name}/${menuItem}`)}
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
        </div>
      ))}
    </>
  );
};

export default NavLinks;