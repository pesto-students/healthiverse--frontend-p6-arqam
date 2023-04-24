import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import {
    ChatBubbleLeftRightIcon
} from "@heroicons/react/24/solid";

const MembershipItem = ({ item }) => {
    const navigate = useNavigate();

    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

    return (
        <div class=" px-3 flex justify-between items-center">
            <div className="flex hover:cursor-pointer" onClick={() => navigate(`${item._id}`)}>
                <div className="flex items-center" >
                    <Avatar alt="Avatar" src={item.userImage} />
                </div>
                <div class="ml-4 flex-1  border-grey-lighter py-4">

                    <p class="text-grey-darkest">
                        {item.name}
                    </p>

                    <p class="text-xs align-text-bottom text-grey-darkest">
                        End Date: {formatDateFromTimestamp(item.endDate)}
                    </p>
                </div>
            </div>

            <button>
                {React.createElement(ChatBubbleLeftRightIcon, { className: "w-5 h-5" })}
            </button>
        </div>

    )
};

export default MembershipItem;