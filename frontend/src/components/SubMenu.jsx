import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";

const SubMenu = ({ data }) => {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  return (
    <>
      <li
        className={`link ${pathname.includes(data.name)}`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <div className="flex flex-row gap-2">
        <div>
            <data.icon size={23} className="min-w-max" />
        </div>
        <p className="flex-1 capitalize">{data.name}</p>
        <div>
            <IoIosArrowDown
            className={` ${subMenuOpen && "rotate-180"} duration-200 `} />
        </div>
        </div>
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden"
      >
        {data.menus?.map((menu) => (
          <li key={menu} className="hover:text-teal-400 hover:font-medium">
            
            <NavLink
              to={`/addProduct/${data.name}/${menu}`}
              className="link !bg-transparent capitalize"
            >
              {menu}
            </NavLink>
          </li>
        ))}
      </motion.ul>
    </>
  );
};

export default SubMenu;