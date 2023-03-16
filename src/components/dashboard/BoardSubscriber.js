import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet } from 'react-router-dom';

const BoardSubscriber = () => {

    return (
        <div className="subscriber-board">

            <nav className="nav-dashboard">
                <Link to="">Profile</Link>
                <Link to="browse">Browse</Link>
                <Link to="memberships">Membership</Link>
            </nav>
            <div className="profile-outlet">
                <Outlet />
            </div>

        </div>
    );
}

export default BoardSubscriber;