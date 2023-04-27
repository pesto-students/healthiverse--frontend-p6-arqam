import styles from './styles.module.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import socket from '../../../socket/socket';
// import { socket } from '../profile/Profile';

const SendMessage = ({ socket }) => {
  const [message, setMessage] = useState('');
  const { user1, user2 } = useSelector(state => state.chatRoom);

  const sendMessage = () => {
    if (message !== '') {
      const __createdTime__ = Date.now();
      // Send message to server
      socket.emit('send_message', { name: user1.name, senderType: user1.senderType, sender: user1, receiver: user2, message, __createdTime__ });
      setMessage('');
    }
  };

  return (

    <div class="bg-gray-300 p-4">
      <div className="flex gap-7">
        <input class="flex items-center h-10 w-full rounded px-3 text-sm"
          type="text"
          placeholder="Type your message…"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button className="bg-blue-600 text-white px-2 rounded-xl hover:scale-110 hover:bg-blue-800" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>


  );
};

export default SendMessage;
