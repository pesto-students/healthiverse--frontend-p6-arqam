import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet } from 'react-router-dom';

const BoardBusiness = () => {

    return (
        <div className="subscriber-board">

            <nav className="nav-dashboard">
                <Link to="">Profile</Link>
                <Link to="clients">Clients</Link>
                <Link to="chats">Chats</Link>
                <Link to="addbusiness">Add Business</Link>
                <Link to="account">Account</Link>
            </nav>

            <div className="profile-outlet">
                <Outlet />
            </div>

        </div>
    );
}

export default BoardBusiness;