import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';

const BoardSubscriber = () => {
    const navigate = useNavigate();
    const dark = "mt-3 py-2.5 px-4 bg-gray-800 rounded-xl shadow-xl text-white text-left";
    const light = "mt-3 py-2.5 px-4 bg-gray-50 rounded-xl shadow-xl text-black text-left hover:scale-105 hover:cursor-pointer";
    const items = [
        { id: 1, to: "", icon: "fa-user", text: "Profile" },
        { id: 2, to: "browse", icon: "fa-magnifying-glass", text: "Browse" },
        { id: 3, to: "memberships", icon: "fa-credit-card", text: "Memberships" },
        { id: 4, to: "chats", icon: "fa-comments", text: "Chats" },
        { id: 5, to: "addbusiness", icon: "fa-user-plus", text: "Add Business" },
        { id: 6, to: "account", icon: "fa-key", text: "Account" },

    ];

    const [activeItem, setActiveItem] = useState(1);

    return (
        <div className="flex">

            <nav className="flex flex-col min-w-max ml-5">
                {items.map(item => {
                    return (
                        <>
                            <div to={item.to}
                                onClick={()=>{
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
            <div className="flex justify-left content-center w-full ml-24 mr-4">
                <Outlet />
            </div>

        </div>
    );
}

export default BoardSubscriber;