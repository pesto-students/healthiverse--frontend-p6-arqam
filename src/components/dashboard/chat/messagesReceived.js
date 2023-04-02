import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';
// import socket from '../../../socket/socket';
import { useSelector } from 'react-redux';
// import { socket } from '../profile/Profile';

const Messages = ({ socket }) => {
  const { user: currentUser } = useSelector(state => state.auth);
  const { user1, user2 } = useSelector(state => state.chatRoom);
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const messagesColumnRef = useRef(null);
  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          name: data.name,
          receiverId: data.receiverId,
          __createdTime__: data.__createdTime__,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [socket]);

  useEffect(() => {
    // Last 50 messages sent in the chat room (fetched from the db in backend)
    socket.on('last_50_messages', (last50Messages) => {
      console.log('Last 50 messages:', last50Messages);
      setMessagesReceived((state) => [...last50Messages, ...state]);
    });

    return () => socket.off('last_50_messages');

  }, [socket]);

  // Scroll to the most recent message
  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

  // dd/mm/yyyy, hh:mm:ss
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
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesRecieved.map((msg, i) => (
        <div className={(msg.receiverId === user2.s_id) ?
          (styles.messageSent) :
          (styles.messageReceived)} key={i}>
          <div >
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg.__createdTime__)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
