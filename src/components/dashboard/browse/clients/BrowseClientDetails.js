import React, { useState, useEffect } from "react";
import userService from "../../../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { setRoom } from "../../../../slices/chatRooms";
import { Avatar } from "@mui/material";
import { getAllClients } from "../../../../slices/businessClients";
import SubscriberInfo from "../../profile/subscriber/subscriberInfo";
import SubscriberHeader from "../../profile/subscriber/subscriberHeader";

const BrowseClientDetails = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { isLoading, gymClients, trainerClients, dieticianClients } = useSelector(state => state.businessClients);
    const { type, id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let client = {};

    if (type === "gym") {
        client = gymClients.filter(client => client.s_id === id)[0];
    } else if (type === "trainer") {
        client = trainerClients.filter(client => client.s_id === id)[0];
    } else if (type === "dietician") {
        client = dieticianClients.filter(client => client.s_id === id)[0];
    }

    useEffect(() => {
        const fetchData = () => {
            dispatch(getAllClients())
                .then((res) => {

                })
                .catch((err) => {
                    const _content = (err.response &&
                        err.response.data &&
                        err.response.data.message) ||
                        err.message || err.toString();
                    console.log(_content);
                });
        }

        if (!gymClients || !trainerClients || !dieticianClients) {
            fetchData();
        }
    }, [])

    const chatClick = (item) => {
        dispatch(setRoom({
            user1: { ...currentUser, senderType: "business" },
            user2: item
        }));
        navigate(`/business/chats/${item.s_id}`);
    };

    return (
        <>
            <div className="container">

                <header className="jumbotron">
                    <button onClick={() => navigate(-1)}>go back</button>
                    <SubscriberHeader subscriberProfileData={client} />
                    <button onClick={() => {
                        chatClick(client);
                    }}>
                        Chat
                    </button>
                </header>
                <SubscriberInfo subscriberProfileData={client} />
            </div>

        </>
    );
}
export default BrowseClientDetails;