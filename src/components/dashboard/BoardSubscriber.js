import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet } from 'react-router-dom';

// import userService from "../../services/user.service";

const BoardSubscriber = () => {

    return (
        <div className="subscriber-board">

            <nav className="nav-dashboard">
                <Link to="">Profile</Link>
                <Link to="browse">Browse</Link>
                <Link to="membership">Membership</Link>
            </nav>

            <Outlet />

        </div>
    );
}

export default BoardSubscriber;