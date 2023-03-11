import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet } from 'react-router-dom';
// import userService from "../../services/user.service";

const BoardBusiness = () => {

    return (
        <div className="subscriber-board">

            <nav className="nav-dashboard">
                <Link to="">Profile</Link>
                <Link to="clients">Clients</Link>
            </nav>

            <div className="profile-outlet">
                <Outlet />
            </div>

        </div>
    );
}

export default BoardBusiness;