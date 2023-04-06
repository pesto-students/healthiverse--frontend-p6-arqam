import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "./App.css";
import Login from "./components/login/Login";
import {
  RegisterSubscriber,
  RegisterBusiness,
} from "./components/registration";
import Home from "./components/home/Home";
import Profile from "./components/dashboard/profile/subscriber/SubscriberProfile";
import BoardSubscriber from "./components/dashboard/BoardSubscriber";
import BoardBusiness from "./components/dashboard/BoardBusiness";
import BoardAdmin from "./components/dashboard/BoardAdmin";
import { logout } from "./slices/auth";
import EventBus from "./common/EventBus";
import BrowseClients from "./components/dashboard/browse/clients/BrowseClients";
import FormProfile from "./components/dashboard/profile/form/FormSubscriber";
import BusinessLogin from "./components/login/BusinessLogin";
import BrowseBusiness from "./components/dashboard/browse/business/BrowseBusiness";
import AllMembership from "./components/dashboard/membership/SubscriberMembership";
import FormBusiness from "./components/dashboard/profile/form/FormBusiness";
import BusinessProfile from "./components/dashboard/profile/business/BusinessProfile";
import Chat from "./components/dashboard/chat";
import BusinessDetails from "./components/dashboard/browse/business/BrowseBusinessDetails";
import BusinessProfileDetails from "./components/dashboard/profile/business/BusinessProfileDetails";
import BuyMembership from "./components/dashboard/membership/BuyMembership";
import EditBusiness from "./components/dashboard/profile/form/EditBusinessProfile";
import SubscriberChatHistory from "./components/dashboard/chat/subscriberChatHistory";
import BusinessChatHistory from "./components/dashboard/chat/businessChatHistory";
import Account from "./components/dashboard/account";
import EditAccount from "./components/dashboard/account/editAccount";
import MembershipDetails from "./components/dashboard/membership/MembershipDetails";
import StarRating from "./components/dashboard/membership/addReview";
import BrowseClientsType from "./components/dashboard/browse/clients/BrowseClientsType";
import BrowseClientDetails from "./components/dashboard/browse/clients/BrowseClientDetails";
import BrowseBusinessType from "./components/dashboard/browse/business/BrowseBusinessType";
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faUserPen, faUser} from '@fortawesome/free-solid-svg-icons'
library.add(fab, faCheckSquare, faUserPen, faUser)



const App = () => {
  const [showBusinessBoard, setShowBusinessBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const { businessProfileCreated } = useSelector((state) => state.business);
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
      <div className="flex flex-col min-h-screen">
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

        <div className="flex-1 bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home">
              <Route index={true} element={<BrowseBusiness />} />
              <Route path=":type">
                  <Route index={true} element={<BrowseBusinessType />} />
                  <Route path=":id">
                    <Route index={true} element={<BusinessDetails />} />
                    <Route path="buy" element={<BuyMembership />} />
                  </Route>
                </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/login/business" element={<BusinessLogin />} />
            <Route path="/register" element={<RegisterSubscriber />} />
            <Route path="/register/business" element={<RegisterBusiness />} />
            <Route path="/subscriber" element={<BoardSubscriber />}>
              <Route path="" element={<Profile />} />
              <Route path="account" element={<Account />} />
              <Route path="account/edit" element={<EditAccount />} />
              <Route path="profile" element={<FormProfile />} />
              <Route path="browse">
                <Route index={true} element={<BrowseBusiness />} />
                <Route path=":type">
                  <Route index={true} element={<BrowseBusinessType />} />
                  <Route path=":id">
                    <Route index={true} element={<BusinessDetails />} />
                    <Route path="buy" element={<BuyMembership />} />
                  </Route>
                </Route>
              </Route>
              <Route path="memberships" >
                <Route index={true} element={<AllMembership />} />
                <Route path=":id">
                  <Route index={true} element={<MembershipDetails />} />
                  <Route path="review" element={<StarRating />} />
                </Route>
              </Route>
              <Route path="chats" element={<SubscriberChatHistory />} />
              <Route path="chats/:id" element={<Chat />} />
              <Route path="addbusiness" element={<FormBusiness />} />
            </Route>
            <Route path="/business" element={<BoardBusiness />}>
              <Route path="" element={<BusinessProfile />} />
              <Route path="account" element={<Account />} />
              <Route path="account/edit" element={<EditAccount />} />
              <Route path=":id" element={<BusinessProfileDetails />} />
              <Route path=":id/edit" element={<EditBusiness />} />
              <Route path="profile" element={<FormBusiness />} />
              <Route path="clients" element={<BrowseClients />} />
              <Route path="clients/:type" element={<BrowseClientsType />} />
              <Route path="clients/:type/:id" element={<BrowseClientDetails />} />
              <Route path="chats" element={<BusinessChatHistory />} />
              <Route path="chats/:id" element={<Chat />} />
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
