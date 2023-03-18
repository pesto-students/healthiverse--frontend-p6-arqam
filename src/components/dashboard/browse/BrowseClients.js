import React, { useState, useEffect } from "react";
import userService from "../../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRoom } from "../../../slices/chatRooms";
import socket from "../../../socket/socket";

const BrowseClients = () => {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        userService.getClients().then((res) => {
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
        const roomId = item._id + "+" + currentUser._id;
        dispatch(setRoom({
            roomId: roomId,
            user1: currentUser,
            user2: item
        }));
        // socket.emit('join_room', { name: currentUser.name, roomId: roomId });
        navigate("/business/chats");
    };

    return (
        <div className="container">
            <div className="clients">
                <h3>Clients</h3>
                {isLoading && <p>Loading...</p>}

                {(!isLoading && clients.length === 0) ?
                    (<p>No active clients</p>) :
                    (clients.map((item, index) => {
                        return (
                            <div key={index}>
                                <p>
                                    {item.name}
                                </p>
                                <button onClick={() => {
                                    chatClick(item);
                                }}>
                                    Chat
                                </button>
                            </div>
                        );
                    }))}
            </div>
        </div>
    );
}

export default BrowseClients;