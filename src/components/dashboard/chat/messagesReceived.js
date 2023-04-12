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
    <div class="flex flex-col items-center justify-center w-full h-full max-h-full bg-gray-100 text-gray-800">
      <div class="flex flex-col flex-grow w-full bg-white shadow-xl rounded-lg overflow-hidden">
        <div class="flex flex-col flex-grow h-0 p-4 overflow-auto" ref={messagesColumnRef}>

          {messagesRecieved.map((msg, i) => {
            if (msg.receiverId === user2.s_id) {
              return (
                <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                  <div>
                    <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                      <span className='text-xs text-gray-200'>
                        {formatDateFromTimestamp(msg.__createdTime__)}
                      </span>
                      <p class="text-base">{msg.message}</p>
                    </div>
                  </div>
                </div>
              )
            } else {
              return (
                <div class="flex w-full mt-2 space-x-3 max-w-xs">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                  <div>
                    <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                      <span className='text-xs text-gray-200'>
                        {formatDateFromTimestamp(msg.__createdTime__)}
                      </span>
                      <p class="text-base">{msg.message}</p>
                    </div>
                  </div>
                </div>
              )
            }
          })}

        </div>
      </div >
    </div >
  );
};

export default Messages;
