import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setRoom } from "../../../../../slices/chatRooms";
import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ClientItem = ({ item, to, type }) => {
    const { isLoading, gymClients, trainerClients, dieticianClients } = useSelector(state => state.businessClients);
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const chatClick = (item) => {
        dispatch(setRoom({
            user1: { ...currentUser, senderType: "business" },
            user2: item
        }));
        navigate(`/business/chats/${item.s_id}`);
    };

    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

    return (
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white dark:bg-gray-700 text-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="#" className="block relative">
                <Avatar
                  alt="profile"
                  src={item.userImage}
                  className="mx-auto object-cover rounded-full h-10 w-10"
                />
              </a>
            </div>
            <div className="ml-3">
              <p className="text-gray-900 whitespace-no-wrap dark:text-white">
                {item.name}
              </p>
            </div>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white dark:bg-gray-700 text-sm">
          <p className="text-center text-gray-900 whitespace-no-wrap dark:text-white">
            {type}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white dark:bg-gray-700 text-sm">
          <p className="text-gray-900 whitespace-no-wrap dark:text-white">
            {formatDateFromTimestamp(item.endDate)}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white dark:bg-gray-700 text-sm">
          <span className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight">
            <button>
              <FontAwesomeIcon icon="fa-message" className="h-5 w-5" />
            </button>
          </span>
        </td>
      </tr>
    );
};

export default ClientItem;