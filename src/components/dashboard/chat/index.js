import styles from './styles.module.css';
import Header from './header';
import MessagesReceived from './messagesReceived';
import SendMessage from './sendMessage';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import io from 'socket.io-client';
import PORT from '../../../services/port';
import { useNavigate } from 'react-router-dom';


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
        <div className={styles.chatContainer}>
            <button onClick={() => navigate(-1)}>go back</button>
            <Header />
            <div>
                <MessagesReceived socket={socket}/>
                <SendMessage socket={socket} />
            </div>
        </div>
    );
};

export default Chat;
