import { Avatar } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ChatHistory = ({ chats, chatClick }) => {
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
        <div className="w-full max-w-xl min-w-max py-4">
            <h1 className="bg-gray-300 px-3 font-bold text-xl py-2">Chats</h1>

            {chats.length === 0 ?
                (<div className="flex justify-center mt-3">

                    <CircularProgress />

                </div>) :
                (chats?.map((item) => {
                    return (<>
                        <div class="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer"
                            onClick={() => {
                                chatClick(item.business ? item.business : item);
                            }}
                        >
                            <div>
                                <Avatar alt="Avatar" src={item.userImage} />
                            </div>
                            <div class="ml-4 flex-1 border-b border-grey-lighter py-4">
                                <div class="flex items-center justify-between">
                                    <p class="text-grey-darkest">
                                        {item.business ? item.business.name : item.subscriber.name}
                                    </p>
                                    <p class="text-xs align-text-bottom text-grey-darkest">
                                        {formatDateFromTimestamp(item.lastMessage.__createdTime__)}
                                    </p>
                                </div>
                                <p class="text-grey-dark mt-1 text-sm">
                                    {item.lastMessage.message}
                                </p>
                            </div>
                        </div>


                    </>)
                })
                )
            }


        </div>
    )
}

export default ChatHistory;