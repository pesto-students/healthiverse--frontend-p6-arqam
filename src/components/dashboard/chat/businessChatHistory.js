import { useEffect, useState } from "react";
import userService from "../../../services/user.service";
import { useNavigate } from "react-router-dom";
import { setRoom } from "../../../slices/chatRooms";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const BusinessChatHistory = () => {
    const [chats, setChats] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { user: currentUser } = useSelector((state) => state.auth);
    //    const chatsWithBusinessId = [];

    //     for (const chat of chats) {
    //         const subscriber = chat.subscriber;
    //         const membership = subscriber.membership;

    //         for (const el of membership) {
    //             let obj = { ...subscriber, businessId: el.businessId, lastMessage: chat.lastMessage};
    //             if (obj) chatsWithBusinessId.push(obj);
    //         }
    //     }

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
            {(chats.length > 0) && chats.map((item) => {
                return (<>
                    <Avatar
                        alt="Avatar"
                        src={item.userImage}
                        style={{ width: "50px", height: "50px" }}
                    />
                    <div>{item.subscriber.name}</div>
                    <div>{formatDateFromTimestamp(item.lastMessage.__createdTime__)}</div>
                    <button onClick={() => {
                        chatClick(item);
                    }}>
                        Chat
                    </button>
                </>)
            })}
        </div>
    )

}

export default BusinessChatHistory;