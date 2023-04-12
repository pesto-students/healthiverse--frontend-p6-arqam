import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setRoom } from "../../../../slices/chatRooms";
import { getAllClients } from "../../../../slices/businessClients";
import ClientItem from "./item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClientGroup from "./group";

const BrowseClients = () => {
    const { isLoading, gymClients, trainerClients, dieticianClients } = useSelector(state => state.businessClients);
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllClients())
            .then((res) => {

            })
            .catch((err) => {
                const _content = (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                    err.message || err.toString();
                console.log(_content);
            });
    }, [])

    const chatClick = (item) => {
        dispatch(setRoom({
            user1: { ...currentUser, senderType: "business" },
            user2: item
        }));
        navigate(`/business/chats/${item.s_id}`);
    };

    return (
        <>
            <div className="py-4 w-full max-w-xl">

                {(isLoading) &&
                    (<p>Loading...</p>)}

                {(!isLoading && gymClients?.length > 0) ?
                    (<ClientGroup clients={gymClients} type="gym" page="primary" />) :
                    (<></>)
                }

                {(!isLoading && trainerClients?.length > 0) ?
                    (<ClientGroup clients={trainerClients} type="trainer" page="primary" />) :
                    (<></>)
                }

                {(!isLoading && dieticianClients?.length > 0) ?
                    (<ClientGroup clients={dieticianClients} type="dietician" page="primary" />) :
                    (<></>)
                }

                {(!isLoading && gymClients?.length === 0 && trainerClients?.length === 0 && dieticianClients?.length === 0) ?
                    (<p>No active clients</p>) :
                    (<></>)}

            </div>
        </>
    );
}
export default BrowseClients;