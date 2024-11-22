import { useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { IoCarSharp } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa";
import { FaMobileScreen } from "react-icons/fa6";
import { IoIosPaper } from "react-icons/io";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaLaptopCode } from "react-icons/fa";
import { FaBusAlt } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";
import { FaTshirt } from "react-icons/fa";
import { PiBooksBold } from "react-icons/pi";
import { MdOutlinePets } from "react-icons/md";
import { MdOutlineCardTravel } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation, useRoutes } from "react-router-dom";
import Header from "./Header";

const AddProductMenu = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
      open: {
        x: 0,
        width: "18rem",
        transition: {
          damping: 40,
        },
      },
      closed: {
        x: -250,
        width: 0,
        transition: {
          damping: 40,
          delay: 0.15,
        },
      },
    }
    : {
      open: {
        width: "22rem",
        transition: {
          damping: 40,
        },
      },
      closed: {
        width: "4rem",
        transition: {
          damping: 40,
        },
      },
    };

  const subMenusList = [
    {
      name: "Cars",
      icon: IoCarSharp,
      menus: ["Cars"],
    },
    {
      name: "Properties",
      icon: FaBuilding,
      menus: ["For Sale Houses and Apartments", "For Rent Houses and Apartments", "Land and Plots", "For Rent Shops and Offices", "For Sale:Shops and Offices", "PG and Guest Houses"],
    },
    {
      name: "Mobiles",
      icon: FaMobileScreen,
      menus: ["Mobile Phones", "Accessories", "Tablets"],
    },
    {
      name: "Jobs",
      icon: IoIosPaper,
      menus: ["Data entry and Bank Office", "Sales and Marketing", "BPO andTelecaller", "Driver", "Office Assistant", "Delivery and Collections", "Teacher", "Cook", "Receptionist and Front Office", "Operator and Technician", "IT Engineer and Developer", "Hotel and Travel Executive", "Accountant", "Designer", "Other"],
    },
    {
      name: "Bikes",
      icon: RiMotorbikeFill,
      menus: ["Motorcycles", "Scooters", "Spare Parts", "Bicycles"],
    },
    {
      name: "Electronics and Appliances",
      icon: FaLaptopCode,
      menus: ["Tvs Video and Audio", "Kitchen and Other Appliances", "Computers and Laptops", "Cameras and Lenses", "Games and Entertainment", "Fridges", "Computer Accessories", "Hard Disks, Printers and Monitors", "ACs", "Washing Machines"],
    },
    {
      name: "Commercial Vehicals and Spares",
      icon: FaBusAlt,
      menus: ["Commercial and Other Vehicles", "Spare Parts"],
    },
    {
      name: "Furniture",
      icon: GiSofa,
      menus: ["Sofa and Dining", "Beds and Wardrobes", "Home Decor and Garden", "Kids Furniture", "Others"],
    },
    {
      name: "Fashion",
      icon: FaTshirt,
      menus: ["Men", "Women", "Kids"],
    },
    {
      name: "Books Sports and Hobbies",
      icon: PiBooksBold,
      menus: ["Books", "Gym and Fitness", "Musical Instruments", "Sports Equipments", "Others"],
    },
    {
      name: "Pets",
      icon: MdOutlinePets,
      menus: ["Fishes and Aquarium", "Pet Food and Accessories", "Dogs", "Other Pets"],
    },
    {
      name: "Services",
      icon: MdOutlineCardTravel,
      menus: ["Education and Classes", "Tour and Travel", "Electronics Repair and Services", "Health and Beauty", "Home Renovation and Repair", "Cleaning and Pest Control", "Legal and Documentation Services", "Packer and Movers", "Other"],
    },
  ];

  return (
    <div>
        <motion.div
          ref={sidebarRef}
          variants={Nav_animation}
          initial={{ x: isTabletMid ? -250 : 0 }}
          animate={open ? "open" : "closed"}
          className=" bg-slate-800 text-white shadow-xl z-[999] w-20 
            overflow-hidden fixed
         h-full "
        >
          <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
            <span className="text-2xl whitespace-pre">Select a category</span>
          </div>

          <div className="flex flex-col h-full">
            <ul className="whitespace-pre px-2.5 py-5 flex flex-col text-lg overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 ">
              {(open || isTabletMid) && (
                <div className="border-slate-300 ">
                  {subMenusList?.map((menu) => (
                    <div key={menu.name} className="flex flex-col gap-1 py-1">
                      <SubMenu data={menu} />
                    </div>
                  ))}
                </div>
              )}
            </ul>
          </div>
          <motion.div
            onClick={() => {
              setOpen(!open);
            }}
            animate={
              open
                ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
                : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
            }
            transition={{ duration: 0 }}
            className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
          >
            <IoIosArrowBack size={25} />
          </motion.div>
        </motion.div>
        <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
          <MdMenu size={25} />
        </div>
      </div>
  );
};

export default AddProductMenu;