import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const DashboardNavbar = ({ items }) => {
    const navigate = useNavigate();
    const dark = "mt-4 py-2.5 px-4 bg-gray-800 rounded-xl shadow-xl text-white text-left";
    const light = "mt-4 py-2.5 px-4 bg-gray-50 rounded-xl shadow-xl text-black text-left hover:scale-105 hover:cursor-pointer";

    const [activeItem, setActiveItem] = useState(1);

    return (
        <nav className="flex flex-col min-w-max ml-5">
            {items.map(item => {
                return (
                    <>
                        <div
                            onClick={() => {
                                setActiveItem(item.id);
                                navigate(item.to);
                            }}
                            className={activeItem === item.id ? dark : light}>
                            <FontAwesomeIcon icon={item.icon} />
                            <span className="ml-3">{item.text}</span>
                        </div>
                    </>

                )
            })}
        </nav>
    );
}

export default DashboardNavbar;