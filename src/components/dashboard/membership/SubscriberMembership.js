import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemberships } from "../../../slices/businessMembership";
import { setRoom } from "../../../slices/chatRooms";

const AllMembership = () => {
    const { isLoading, gyms, trainers, dieticians } = useSelector((state) => state.businessAndMembership);
    const { user: currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getMemberships())
            .unwrap()
            .catch((err) => {
                const _content = (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                    err.message || err.toString();
                console.log(_content);
            });
    }, []);

    const chatClick = (item) => {
        dispatch(setRoom({
            user1: currentUser,
            user2: item
        }));
        // socket.emit('join_room', { name: currentUser.name, roomId: roomId });
        navigate("/subscriber/chats");
    };

    return (
        <div className="container">
            <div className="gyms">
                <h3>Gyms</h3>
                {isLoading ?
                    (<p>Loading...</p>) :
                    ((gyms.length === 0) ?
                        (<p>No active membership</p>) :
                        (gyms.map((item, index) => {
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
                        }))
                    )
                }
            </div>
            <div className="trainers">
                <h3>Trainers</h3>
                {isLoading ?
                    (<p>Loading...</p>) :
                    ((trainers.length === 0) ?
                        (<p>No active membership</p>) :
                        (trainers.map((item, index) => {
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
                        }))
                    )
                }
            </div>
            <div className="dieticians">
                <h3>Dieticians</h3>
                {isLoading ?
                    (<p>Loading...</p>) :
                    ((dieticians.length === 0) ?
                        (<p>No active membership</p>) :
                        (dieticians.map((item, index) => {
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
                        }))
                    )
                }
            </div>

        </div>
    );
}

export default AllMembership;