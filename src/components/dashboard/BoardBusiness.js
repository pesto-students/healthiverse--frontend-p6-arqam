import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import DashboardNavbar from "./sidebar";
import { useSelector } from "react-redux";

const BoardBusiness = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector(state => state.auth);
    if (!isLoggedIn) navigate("/login");

    const items = [
        { id: 1, to: "", icon: "fa-user", text: "Profile" },
        { id: 2, to: "clients", icon: "fa-magnifying-glass", text: "Clients" },
        { id: 3, to: "chats", icon: "fa-credit-card", text: "Chats" },
        { id: 4, to: "addbusiness", icon: "fa-comments", text: "Add Business" },
        { id: 5, to: "account", icon: "fa-user-plus", text: "Add Account" },
    ];
    return (
        <>

            <DashboardNavbar items={items} />

            <div className="flex justify-center content-center w-full ml-24 mr-24">
                <Outlet />
            </div>

        </>
    );
}

export default BoardBusiness;