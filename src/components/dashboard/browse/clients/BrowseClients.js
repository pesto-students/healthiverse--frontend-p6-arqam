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
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
          <div className="py-4">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white border-b dark:border-gray-500 border-gray-200 text-gray-800 text-left text-sm uppercasefont-semibold dark:bg-gray-800 dark:text-white"
                      >
                        Client
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white border-b dark:border-gray-500 border-gray-200 text-gray-800 text-left text-sm uppercasefont-semibold dark:bg-gray-800 dark:text-white"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white border-b dark:border-gray-500 border-gray-200 text-gray-800 text-left text-sm uppercasefont-semibold dark:bg-gray-800 dark:text-white"
                      >
                        End Date
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white border-b dark:border-gray-500 border-gray-200 text-gray-800 text-left text-sm uppercasefont-semibold dark:bg-gray-800 dark:text-white"
                      >
                        Chat
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading && <p>Loading...</p>}
                    {!isLoading && gymClients?.length > 0 ? (
                      gymClients.map((item) => {
                        return <ClientItem item={item} type="Gym" />;
                      })
                    ) : (
                      <></>
                    )}
                    {!isLoading && trainerClients?.length > 0 ? (
                      trainerClients.map((item) => {
                        return <ClientItem item={item} type="Trainer" />;
                      })
                    ) : (
                      <></>
                    )}
                    {!isLoading && dieticianClients?.length > 0 ? (
                      dieticianClients.map((item) => {
                        return <ClientItem item={item} type="Dietician" />;
                      })
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
export default BrowseClients;