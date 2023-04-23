import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import DashboardNavbar from "./sidebar";
import Example from "./sidebar/sidebar";

const BoardSubscriber = () => {
    const items = [
        { id: 1, to: "", icon: "fa-user", text: "Profile" },
        { id: 2, to: "browse", icon: "fa-magnifying-glass", text: "Browse" },
        { id: 3, to: "memberships", icon: "fa-credit-card", text: "Memberships" },
        { id: 4, to: "chats", icon: "fa-comments", text: "Chats" },
        { id: 5, to: "addbusiness", icon: "fa-user-plus", text: "Add Business" },
        { id: 6, to: "/account", icon: "fa-key", text: "Account" },
    ];

    return (
      <>
        <Example />
        <div className="flex items-stretch justify-center content-center w-full mx-6 lg:mx-12">
          <Outlet />
        </div>
      </>
    );
}

export default BoardSubscriber;