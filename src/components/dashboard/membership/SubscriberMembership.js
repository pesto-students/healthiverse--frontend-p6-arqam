import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMemberships } from "../../../slices/membership";
import { setRoom } from "../../../slices/chatRooms";
import { getAllBusiness } from "../../../slices/browseBusiness";
import { Avatar } from "@mui/material";
import MembershipItem from "./membershipItem";

const AllMembership = () => {
    const { allBusiness } = useSelector((state) => state.browseBusiness);
    let { isLoading, memberships } = useSelector((state) => state.membership);

    memberships = memberships?.map(m => {
        let business = allBusiness?.filter(b => b._id === m.businessId)[0];
        business = { ...business, endDate: m.endDate };
        return business;
    });

    const gymMembership = memberships?.filter(m => m.businessType === "gym");
    const trainerMembership = memberships?.filter(m => m.businessType === "trainer");
    const dieticianMembership = memberships?.filter(m => m.businessType === "dietician");
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!allBusiness) { dispatch(getAllBusiness()) }

        dispatch(getMemberships())
            .unwrap()
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const chatClick = (item) => {
        dispatch(setRoom({
            user1: { ...currentUser, senderType: "subscriber" },
            user2: item
        }));
        // socket.emit('join_room', { name: currentUser.name, roomId: roomId });
        navigate(`/subscriber/chats/${item._id}`);
    };
   

    return (
        <div className="container">
            <div className="gyms">
                <h3>Gyms</h3>
                {isLoading ?
                    (<p>Loading...</p>) :
                    ((gymMembership?.length === 0) ?
                        (<p>No active membership</p>) :
                        (gymMembership?.map((item, index) => {
                            return (
                                <div key={index}>
                                   <MembershipItem item={item}/>
                                  
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
                                    <MembershipItem item={item}/>
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
                                   <MembershipItem item={item}/>
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