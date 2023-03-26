import React, { useState, useEffect } from "react";
import userService from "../../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRoom } from "../../../slices/chatRooms";

const BrowseClients = () => {
    const [clients, setClients] = useState([]);
    const gymClients = [];
    const trainerClients = [];
    const dieticianClients = [];

    for (const client of clients) {
        let gymMembership = client.membership.filter(m => m.businessType === "gym");
        let trainerMembership = client.membership.filter(m => m.businessType === "trainer");
        let dieticianMembership = client.membership.filter(m => m.businessType === "dietician");
        for (const el of gymMembership) {
            let obj = { ...client, businessId: el.businessId, endDate: el.endDate };
            if (obj) gymClients.push(obj);
        }
        for (const el of trainerMembership) {
            let obj = { ...client, businessId: el.businessId, endDate: el.endDate };
            if (obj) trainerClients.push(obj);
        }
        for (const el of dieticianMembership) {
            let obj = { ...client, businessId: el.businessId, endDate: el.endDate };
            if (obj) dieticianClients.push(obj);
        }
    }

    const [isLoading, setIsLoading] = useState(true);
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        userService.getClients()
            .then((res) => {
                setClients(res.data);
                setIsLoading(false);
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
            user1: {...currentUser, senderType: "business"},
            user2: item
        }));
        // socket.emit('join_room', { name: currentUser.name, roomId: roomId });
        navigate("/business/chats");
    };

    return (
        <>
            <div className="container">
                <div className="clients">
                    {(isLoading) &&
                        (<p>Loading...</p>)}

                    {(gymClients.length > 0) ?
                        (<div>
                            <h3>Gym Clients</h3>
                            {gymClients.map(item => {
                                return (
                                    <div key={item._id}>
                                        <p>
                                            {item.name}
                                        </p>
                                        <p>
                                            End Date: {item.endDate}
                                        </p>
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

                    {(trainerClients.length > 0) ?
                        (<div>
                            <h3>Trainer Clients</h3>
                            {trainerClients.map(item => {
                                return (
                                    <div key={item._id}>
                                        <p>
                                            {item.name}
                                        </p>
                                        <p>
                                            End Date: {item.endDate}
                                        </p>
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

                    {(dieticianClients.length > 0) ?
                        (<div>
                            <h3>Dietician Clients</h3>
                            {dieticianClients.map(item => {
                                return (
                                    <div key={item._id}>
                                        <p>
                                            {item.name}
                                        </p>
                                        <p>
                                            End Date: {item.endDate}
                                        </p>
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

                    {(!isLoading && gymClients.length === 0 && trainerClients.length === 0 && dieticianClients.length === 0) ?
                        (<p>No active clients</p>) :
                        (<></>)}

                </div>
            </div>
        </>
    );
}
export default BrowseClients;