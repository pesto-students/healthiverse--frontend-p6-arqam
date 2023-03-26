import styles from './styles.module.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import socket from '../../../socket/socket';
// import { socket } from '../profile/Profile';

const SendMessage = ({socket}) => {
  const [message, setMessage] = useState('');
  const { user1, user2} = useSelector(state=>state.chatRoom);

  const sendMessage = () => {
    if (message !== '') {
      const __createdTime__ = Date.now();
      // Send message to server
      socket.emit('send_message', { name: user1.name, senderType: user1.senderType, receiver: user2, message, __createdTime__ });
      setMessage('');
    }
  };

  return (
    <div className={styles.sendMessageContainer}>
      <input
        className={styles.messageInput}
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className='btn btn-primary' onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;
