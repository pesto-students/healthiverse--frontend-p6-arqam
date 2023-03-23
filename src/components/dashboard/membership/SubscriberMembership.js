import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemberships } from "../../../slices/membership";
import { setRoom } from "../../../slices/chatRooms";

const AllMembership = () => {
    const { isLoading, gymMembership, trainerMembership, dieticianMembership } = useSelector((state) => state.membership);
    const { user: currentUser } = useSelector((state) => state.auth);
    const [error, setError] = useState("");
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
                setError(_content);
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
            {error ?
                (<div>Error Fetching Membership</div>) :
                ((<>
                    <div className="gyms">
                        <h3>Gyms</h3>
                        {isLoading ?
                            (<p>Loading...</p>) :
                            ((gymMembership?.length === 0) ?
                                (<p>No active membership</p>) :
                                (gymMembership?.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <p>
                                                {item.name}
                                            </p>
                                            <p>End Date: {item.endDate}</p>
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
                            ((trainerMembership?.length === 0) ?
                                (<p>No active membership</p>) :
                                (trainerMembership?.map((item) => {
                                    return (
                                        <div key={item._id}>
                                            <p>
                                                {item.name}
                                            </p>
                                            <p>End Date: {item.endDate}</p>
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
                            ((dieticianMembership?.length === 0) ?
                                (<p>No active membership</p>) :
                                (dieticianMembership?.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <p>
                                                {item.name}
                                            </p>
                                            <p>End Date: {item.endDate}</p>
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
                </>))}

        </div>
    );
}

export default AllMembership;