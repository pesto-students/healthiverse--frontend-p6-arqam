import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet } from 'react-router-dom';

const BoardSubscriber = () => {

    return (
        <div className="flex">

            <nav className="flex flex-col min-w-max">
                <Link to="" className="mt-3 ml-4 py-2 px-4 bg-black rounded-xl shadow-xl text-white text-left">
                    <FontAwesomeIcon icon="fa-user" />
                    <span className="ml-3">Profile</span>
                </Link>
                <Link to="browse" className="mt-3 ml-4 py-2 px-4 bg-black rounded-xl shadow-xl text-white text-left">Browse</Link>
                <Link to="memberships" className="mt-3 ml-4 py-2 px-4 bg-black rounded-xl shadow-xl text-white text-left">Membership</Link>
                <Link to="chats" className="mt-3 ml-4 py-2 px-4 bg-black rounded-xl shadow-xl text-white text-left">Chats</Link>
                <Link to="addbusiness" className="mt-3 ml-4 py-2 px-4 bg-black rounded-xl shadow-xl text-white text-left">Add Business</Link>
                <Link to="account" className="mt-3 ml-4 py-2 px-4 bg-black rounded-xl shadow-xl text-white text-left">Account</Link>
            </nav>
            <div className="flex justify-center content-center w-full ml-5 mr-5">
                <Outlet />
            </div>

        </div>
    );
}

export default BoardSubscriber;