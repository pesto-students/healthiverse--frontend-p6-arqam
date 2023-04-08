import { useEffect, useState } from "react";
import userService from "../../../services/user.service";
import { useNavigate } from "react-router-dom";
import { getMemberships } from "../../../slices/membership";
import { setRoom } from "../../../slices/chatRooms";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const SubscriberChatHistory = () => {
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        userService.getSubscriberChats().then(res => {
            console.log(res.data);
            setChats(res.data);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }, []);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const chatClick = (item) => {
        dispatch(setRoom({
            user1: { ...currentUser, senderType: "subscriber" },
            user2: item
        }));
        // socket.emit('join_room', { name: currentUser.name, roomId: roomId });
        navigate(`/subscriber/chats/${item._id}`);
    };

    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    return (
        <div>
            <h1>Chats</h1>
            {(chats.length === 0) ?
                ((isLoading) ? (<div>Loading...</div>) : (<div>No chats found</div>)) :
                (<div>
                    {
                        chats.map((item, index) => {
                            return (<div key={index}>
                                <Avatar
                                    alt="Avatar"
                                    src={item.userImage}
                                    style={{ width: "50px", height: "50px" }}
                                />
                                <div>{item.business.name}</div>
                                <div>{item.lastMessage.message}</div>
                                <div>{formatDateFromTimestamp(item.lastMessage.__createdTime__)}</div>
                                <button onClick={() => {
                                    chatClick(item.business);
                                }}>
                                    Chat
                                </button>
                            </div>)
                        })
                    }
                </div>)}
        </div>
    )

}

export default SubscriberChatHistory;