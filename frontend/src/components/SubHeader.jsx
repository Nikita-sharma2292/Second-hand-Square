import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

function SubHeader(props) {
    return (
        <>
            <nav className="z-10 bg-white">
                <div className="flex font-sans bg-slate-800 text-white items-center font-medium justify-around">
                    <ul className="md:flex z-10 hidden uppercase items-center gap-4 font-[Poppins]">
                        <NavLinks handleCategory={props.handleCategory}/>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default SubHeader;