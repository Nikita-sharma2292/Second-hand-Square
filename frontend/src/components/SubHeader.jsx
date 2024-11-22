import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

function SubHeader(props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className="z-10 bg-white">
                <div className="flex font-sans bg-slate-800 text-white items-center font-medium justify-around">
                    <div className="z-50 p-5 md:w-auto w-full flex justify-between">
                        {/* <img src={Logo} alt="logo" className="md:cursor-pointer h-9" /> */}
                        <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
                            <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
                        </div>
                    </div>
                    <ul className="md:flex z-10 hidden uppercase items-center gap-4 font-[Poppins]">
                        <NavLinks handleCategory={props.handleCategory}/>
                    </ul>
                    <div className="md:block hidden">
                        {/* <Button /> */}
                    </div>
                    {/* Mobile nav */}
                    <ul
                        className={`
                        md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
                        duration-500 ${open ? "left-0" : "left-[-100%]"}`}
                    >
                        <li>
                            <Link to="/" className="py-7 px-3 inline-block">
                                Home
                            </Link>
                        </li>
                        <NavLinks handleCategory={props.handleCategory}/>
                        <div className="py-5">
                            {/* <Button /> */}
                        </div>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default SubHeader;