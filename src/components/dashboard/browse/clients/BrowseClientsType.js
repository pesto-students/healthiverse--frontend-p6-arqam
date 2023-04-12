import React, { useState, useEffect } from "react";
import userService from "../../../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { setRoom } from "../../../../slices/chatRooms";
import { Avatar } from "@mui/material";
import { getAllClients } from "../../../../slices/businessClients";
import ClientItem from "./item";
import ClientGroup from "./group";

const BrowseClientsType = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { isLoading, gymClients, trainerClients, dieticianClients } = useSelector(state => state.businessClients);
    const { type } = useParams();
    let clients = [];

    if (type === "gym") {
        clients = gymClients;
    } else if (type === "trainer") {
        clients = trainerClients;
    } else if (type === "dietician") {
        clients = dieticianClients;
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const businessTypeObj = {
        gym: "Gym",
        trainer: "Trainer",
        dietician: "Dietician"
    };

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
            <div className="py-4 w-full max-w-xl">

                {(clients.length > 0) ?
                    (<ClientGroup clients={clients} type={type} page="secondary" />) :
                    (<></>)
                }

                {(clients.length === 0) ?
                    (<p>No active clients</p>) :
                    (<></>)}

            </div>
        </>
    );
}
export default BrowseClientsType;