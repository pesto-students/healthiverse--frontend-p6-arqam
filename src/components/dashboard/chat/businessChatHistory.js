import React from "react";
import { useEffect, useState } from "react";
import userService from "../../../services/user.service";
import { useNavigate } from "react-router-dom";
import { setRoom } from "../../../slices/chatRooms";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, List, ListItem, Divider, ListItemText, ListItemAvatar, Typography } from "@mui/material";
import ChatHistory from "./chatHistory";

const BusinessChatHistory = () => {
    const [chats, setChats] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        userService.getBusinessChats().then(res => {
            console.log(res.data);
            setChats(res.data);
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            console.log(err);
        })
    }, []);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const chatClick = (item) => {
        const user2 = { ...item.subscriber, businessId: item.businessId };
        dispatch(setRoom({
            user1: { ...currentUser, senderType: "business" },
            user2: user2
        }));
        // socket.emit('join_room', { name: currentUser.name, roomId: roomId });
        navigate(`/business/chats/${user2.s_id}`);
    };

    

    return (
       <ChatHistory chats={chats} chatClick={chatClick}/>
    )

}

export default BusinessChatHistory;