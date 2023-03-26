import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login/Login";
import { RegisterSubscriber, RegisterBusiness } from "./components/registration";
import Home from "./components/home/Home";
import Profile from "./components/dashboard/profile/Profile";
import BoardSubscriber from "./components/dashboard/BoardSubscriber";
import BoardBusiness from "./components/dashboard/BoardBusiness";
import BoardAdmin from "./components/dashboard/BoardAdmin";
import { logout } from "./slices/auth";
import EventBus from "./common/EventBus";
import BrowseClients from "./components/dashboard/browse/BrowseClients";
import FormProfile from "./components/dashboard/profile/FormSubscriber";
import BusinessLogin from "./components/login/BusinessLogin";
import BrowseBusiness from "./components/dashboard/browse/BrowseBusiness";
import AllMembership from "./components/dashboard/membership/SubscriberMembership";
import FormBusiness from "./components/dashboard/profile/FormBusiness";
import BusinessProfile from "./components/dashboard/profile/BusinessProfile";
import socket from "./socket/socket";
import Chat from "./components/dashboard/chat";
import BusinessDetails from "./components/dashboard/browse/BusinessDetails";
import BusinessProfileDetails from "./components/dashboard/profile/BusinessProfileDetails";
import BuyMembership from "./components/dashboard/membership/BuyMembership";
import EditBusiness from "./components/dashboard/profile/EditBusinessProfile";

const App = () => {
  const [showBusinessBoard, setShowBusinessBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const { businessProfileCreated } = useSelector(state => state.business);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowBusinessBoard(businessProfileCreated);
      setShowAdminBoard(currentUser.role === "admin");
    } else {
      setShowBusinessBoard(false);
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, businessProfileCreated, logOut]);

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            HealthiVerse
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showBusinessBoard && (
              <li className="nav-item">
                <Link to={"/business"} className="nav-link">
                  Business Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/subscriber"} className="nav-link">
                  Subscriber Board
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/login`} className="nav-link" onClick={logOut}>
                  Logout
                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={`/login`} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="app-container ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<BrowseBusiness />} />
            <Route path="home/:id" element={<BusinessDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/business" element={<BusinessLogin />} />
            <Route path="/register" element={<RegisterSubscriber />} />
            <Route path="/register/business" element={<RegisterBusiness />} />
            <Route path="/subscriber" element={<BoardSubscriber />}>
              <Route path="" element={<Profile />} />
              <Route path="profile" element={<FormProfile />} />
              <Route path="browse" element={<BrowseBusiness />} />
              <Route path="browse/:id" element={<BusinessDetails />} />
              <Route path="browse/:id/buy" element={<BuyMembership />} />
              <Route path="memberships" element={<AllMembership />} />
              <Route path="chats" element={<Chat />} />
              <Route path="addbusiness" element={<FormBusiness />} />
            </Route>
            <Route path="/business" element={<BoardBusiness />}>
              <Route path="" element={<BusinessProfile />} />
              <Route path=":id" element={<BusinessProfileDetails />} />
              <Route path=":id/edit" element={<EditBusiness/>}/>

              <Route path="profile" element={<FormBusiness />} />
              <Route path="clients" element={<BrowseClients />} />
              <Route path="chats" element={<Chat />} />
              <Route path="addbusiness" element={<FormBusiness />} />
            </Route>
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;