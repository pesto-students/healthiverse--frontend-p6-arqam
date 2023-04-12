import styles from './styles.module.css';
import Header from './header';
import MessagesReceived from './messagesReceived';
import SendMessage from './sendMessage';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import io from 'socket.io-client';
import PORT from '../../../services/port';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Chat = () => {
    const { user: currentUser } = useSelector(state => state.auth);
    const { user1, user2 } = useSelector(state => state.chatRoom);
    const navigate = useNavigate();
    let socket = io.connect(PORT, {
        query: { token: currentUser.token }
    });

    useEffect(() => {
        socket.emit('join_room', { name: user1.name, senderType: user1.senderType, receiver: user2 });
    }, [socket]);

    return (
        <div className="flex flex-col content-center max-w-xl w-full h-full py-4">
            <div className="flex bg-gray-300 px-3 py-1 w-full min-w-max">
                <button className='px-2 rounded-xl hover:scale-125' onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={"arrow-left"} />
                </button>
                <h1 className="text-xl px-3 font-bold py-2">{user2.name}</h1>
            </div>
            <div className="flex flex-col w-full h-full">
                <MessagesReceived socket={socket} />
                <SendMessage socket={socket} />
            </div>
        </div>
    );
};

export default Chat;
