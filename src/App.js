import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "./App.css";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
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
import AllMembership from "./components/dashboard/membership/existing/SubscriberMembership";
import FormBusiness from "./components/dashboard/profile/form/FormBusiness";
import BusinessProfile from "./components/dashboard/profile/business/BusinessProfile";
import Chat from "./components/dashboard/chat";
import BusinessDetails from "./components/dashboard/browse/business/BrowseBusinessDetails";
import BusinessProfileDetails from "./components/dashboard/profile/business/BusinessProfileDetails";
import BuyMembership from "./components/dashboard/membership/buy/BuyMembership";
import EditBusiness from "./components/dashboard/profile/form/EditBusinessProfile";
import SubscriberChatHistory from "./components/dashboard/chat/subscriberChatHistory";
import BusinessChatHistory from "./components/dashboard/chat/businessChatHistory";
import Account from "./components/dashboard/account";
import EditAccount from "./components/dashboard/account/editAccount";
import MembershipDetails from "./components/dashboard/membership/existing/MembershipDetails";
import StarRating from "./components/dashboard/membership/existing/review/addReview";
import BrowseClientsType from "./components/dashboard/browse/clients/BrowseClientsType";
import BrowseClientDetails from "./components/dashboard/browse/clients/BrowseClientDetails";
import BrowseBusinessType from "./components/dashboard/browse/business/BrowseBusinessType";
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faUserPen, faUser, faMagnifyingGlass, faCreditCard, faComments, faUserPlus, faKey, faArrowRight, faArrowLeft, faMessage } from '@fortawesome/free-solid-svg-icons'
import BrowsePublic from "./components/home/BrowsePublic";
import StripePayment from "./components/dashboard/membership/buy/stripePayment";
import Failed from "./components/dashboard/membership/buy/failed";
import Success from "./components/dashboard/membership/buy/success";
import ComplexNavbar from "./components/navbar";
import Footer from "./components/footer";
import Example from "./components/dashboard/profile/subscriber/new/subscriberProfile";
library.add(fab, faCheckSquare, faUserPen, faUser, faMagnifyingGlass, faCreditCard, faComments, faUserPlus, faKey, faArrowRight, faArrowLeft, faMessage)

const App = () => {
  const [showBusinessBoard, setShowBusinessBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="flex flex-col h-full">
        <div className="flex flex-col h-full min-h-screen">
          <ComplexNavbar />
          <div className="flex flex-1 h-full justify-center bottom-0 bg-white">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="failed" element={<Failed />} />
              <Route path="success" element={<Success />} />
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
              <Route path="/signup" element={<SignUp />} />

              <Route path="/subscriber" element={<BoardSubscriber />}>
                <Route path="" element={<Profile />} />
                <Route path="profile" element={<FormProfile />} />
                <Route path="browse">
                  <Route index={true} element={<BrowseBusiness />} />
                  <Route path=":type">
                    <Route index={true} element={<BrowseBusinessType />} />
                    <Route path=":id">
                      <Route index={true} element={<BusinessDetails />} />
                      <Route path="buy" element={<BuyMembership />} />
                      <Route path="pay" element={<StripePayment />} />
                    </Route>
                  </Route>
                </Route>
                <Route path="memberships">
                  <Route index={true} element={<AllMembership />} />
                  <Route path=":id">
                    <Route index={true} element={<MembershipDetails />} />
                    <Route path="review" element={<StarRating />} />
                  </Route>
                </Route>
                <Route path="chats" element={<SubscriberChatHistory />} />
                <Route path="chats/:id" element={<Chat />} />
                <Route path="addbusiness" element={<FormBusiness />} />
                <Route path="account" element={<Account />} />
                <Route path="account/edit" element={<EditAccount />} />
              </Route>
              <Route path="/business" element={<BoardBusiness />}>
                <Route path="" element={<BusinessProfile />} />
                <Route path=":id" element={<BusinessProfileDetails />} />
                <Route path=":id/edit" element={<EditBusiness />} />
                <Route path="profile" element={<FormBusiness />} />
                <Route path="clients" element={<BrowseClients />} />
                <Route path="clients/:type" element={<BrowseClientsType />} />
                <Route
                  path="clients/:type/:id"
                  element={<BrowseClientDetails />}
                />
                <Route path="chats" element={<BusinessChatHistory />} />
                <Route path="chats/:id" element={<Chat />} />
                <Route path="addbusiness" element={<FormBusiness />} />
              </Route>

              <Route path="/admin" element={<BoardAdmin />} />
            </Routes>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
