import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MembershipItem = ({ item }) => {
    const navigate = useNavigate();

    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

    return (
        <div class="bg-white px-3 flex items-center">
            <div className="hover:cursor-pointer" onClick={() => navigate(`${item._id}`)}>
                <Avatar alt="Avatar" src={item.userImage} />
            </div>
            <div class="ml-4 flex-1 border-b border-grey-lighter py-4">

                <p class="text-grey-darkest">
                    {item.name}
                </p>

                <p class="text-xs align-text-bottom text-grey-darkest">
                    End Date: {formatDateFromTimestamp(item.endDate)}
                </p>
            </div>
            <button>
                <FontAwesomeIcon icon="fa-message" />
            </button>
        </div>

    )
};

export default MembershipItem;