import { useEffect, useState } from "react";
import userService from "../../../services/user.service";
import { useNavigate } from "react-router-dom";
import { getMemberships } from "../../../slices/membership";
import { setRoom } from "../../../slices/chatRooms";
import { useDispatch, useSelector } from "react-redux";

const SubscriberChatHistory = () => {
    const [chats, setChats] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        userService.getSubscriberChats().then(res => {
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
        dispatch(setRoom({
            user1: { ...currentUser, senderType: "subscriber" },
            user2: item
        }));
        // socket.emit('join_room', { name: currentUser.name, roomId: roomId });
        navigate(`/subscriber/chats/${item._id}`);
    };

    return (
        <div>
            <h1>Chats</h1>
            {(chats.length > 0) && chats.map((item) => {
                return (<>
                    <div>{item.business.name}</div>
                    <div>{item.lastMessage.message}</div>
                    <button onClick={() => {
                        chatClick(item.business);
                    }}>
                        Chat
                    </button>
                </>)
            })}
        </div>
    )

}

export default SubscriberChatHistory;