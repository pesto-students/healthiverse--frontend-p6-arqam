import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setRoom } from "../../../../../slices/chatRooms";
import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ClientItem = ({ item, to }) => {
    const { isLoading, gymClients, trainerClients, dieticianClients } = useSelector(state => state.businessClients);
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const chatClick = (item) => {
        dispatch(setRoom({
            user1: { ...currentUser, senderType: "business" },
            user2: item
        }));
        navigate(`/business/chats/${item.s_id}`);
    };

    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

    return (
        <div class="bg-white px-3 flex items-center">
            <div className="hover:cursor-pointer" onClick={() => navigate(`${to}${item.s_id}`)}>
                <Avatar alt="Avatar" src={item.userImage} />
            </div>
            <div class="ml-4 flex-1 border-b border-grey-lighter py-4">

                <p class="text-grey-darkest">
                    {item.name}
                </p>

                <p class="text-xs align-text-bottom text-grey-darkest">
                    End Date: {formatDateFromTimestamp(item.endDate)}
                </p>
            </div>
            <button>
                <FontAwesomeIcon icon="fa-message" />
            </button>
        </div>

    )
};

export default ClientItem;