import React, { useState, useEffect } from "react";
import userService from "../../../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { setRoom } from "../../../../slices/chatRooms";
import { Avatar } from "@mui/material";
import { getAllClients } from "../../../../slices/businessClients";
import ClientItem from "./clientItem";

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
            <div className="container">
                <div className="clients">
                    {(clients.length > 0) ?
                        (<div>
                            <button onClick={() => navigate(-1)}>go back</button>
                            <h3>{`${businessTypeObj[type]} Clients`}</h3>
                            {clients.map(item => {
                                return (
                                    <div key={item._id}>
                                        <div onClick={() => navigate(`${item.s_id}`)}>
                                            <ClientItem item={item} />
                                        </div>
                                        <button onClick={() => {
                                            chatClick(item);
                                        }}>
                                            Chat
                                        </button>
                                    </div>
                                )
                            })}
                        </div>) :
                        (<></>)
                    }

                    {(clients.length === 0) ?
                        (<p>No active clients</p>) :
                        (<></>)}

                </div>
            </div>
        </>
    );
}
export default BrowseClientsType;