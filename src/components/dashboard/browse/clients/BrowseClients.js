import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setRoom } from "../../../../slices/chatRooms";
import { getAllClients } from "../../../../slices/businessClients";
import ClientItem from "./clientItem";

const BrowseClients = () => {
    const { isLoading, gymClients, trainerClients, dieticianClients } = useSelector(state => state.businessClients);
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
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
                    {(isLoading) &&
                        (<p>Loading...</p>)}

                    {(!isLoading && gymClients?.length > 0) ?
                        (<div>
                            <h3>Gym Clients</h3>
                            <button onClick={() => navigate("gym")}>see all</button>
                            {gymClients.slice(0, 2).map(item => {
                                return (
                                    <div key={item._id}>
                                        <div onClick={() => navigate(`gym/${item.s_id}`)}>
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

                    {(!isLoading && trainerClients?.length > 0) ?
                        (<div>
                            <h3>Trainer Clients</h3>
                            <button onClick={() => navigate("trainer")}>see all</button>
                            {trainerClients.slice(0, 2).map(item => {
                                return (
                                    <div key={item._id}>
                                       <div onClick={() => navigate(`trainer/${item.s_id}`)}>
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

                    {(!isLoading && dieticianClients?.length > 0) ?
                        (<div>
                            <h3>Dietician Clients</h3>
                            <button onClick={() => navigate("dietician")}>see all</button>
                            {dieticianClients.slice(0, 2).map(item => {
                                return (
                                    <div key={item._id}>
                                        <div onClick={() => navigate(`dietician/${item.s_id}`)}>
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

                    {(!isLoading && gymClients?.length === 0 && trainerClients?.length === 0 && dieticianClients?.length === 0) ?
                        (<p>No active clients</p>) :
                        (<></>)}

                </div>
            </div>
        </>
    );
}
export default BrowseClients;