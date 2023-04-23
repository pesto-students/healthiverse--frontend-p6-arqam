import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import DashboardNavbar from "./sidebar";

const BoardBusiness = () => {
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