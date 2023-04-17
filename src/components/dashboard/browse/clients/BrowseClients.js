import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setRoom } from "../../../../slices/chatRooms";
import { getAllClients } from "../../../../slices/businessClients";
import ClientItem from "./item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClientGroup from "./group";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from "@mui/material/Select";

const BrowseClients = () => {
  const { isLoading, gymClients, trainerClients, dieticianClients } =
    useSelector((state) => state.businessClients);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(getAllClients())
      .then((res) => {})
      .catch((err) => {
        const _content =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        console.log(_content);
      });
  }, []);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const chatClick = (item) => {
    dispatch(
      setRoom({
        user1: { ...currentUser, senderType: "business" },
        user2: item,
      })
    );
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
                  <tr className="bg-gray-200">
                    <th
                      scope="col"
                      className="px-5 py-3 border-b dark:border-gray-500 border-gray-200 text-gray-800 text-left text-sm uppercasefont-semibold dark:bg-gray-800 dark:text-white"
                    >
                      Client
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b dark:border-gray-500 border-gray-200 text-gray-800 text-left text-sm uppercasefont-semibold dark:bg-gray-800 dark:text-white"
                    >
                      <div className="flex gap-2">
                        <p className="align-middle">Type</p>
                        <Select
                          id="demo-simple-select-standard"
                          value={filter}
                          onChange={handleChange}
                          label="Age"
                          className="h-8 text-xs"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {gymClients.length > 0 && (
                            <MenuItem value={"gym"}>Gym</MenuItem>
                          )}
                          {trainerClients.length > 0 && (
                            <MenuItem value={"trainer"}>Trainer</MenuItem>
                          )}
                          {dieticianClients.length > 0 && (
                            <MenuItem value={"dietician"}>Dietician</MenuItem>
                          )}
                        </Select>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b dark:border-gray-500 border-gray-200 text-gray-800 text-left text-sm uppercasefont-semibold dark:bg-gray-800 dark:text-white"
                    >
                      End Date
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b dark:border-gray-500 border-gray-200 text-gray-800 text-left text-sm uppercasefont-semibold dark:bg-gray-800 dark:text-white"
                    >
                      Chat
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && <p>Loading...</p>}
                  {!isLoading &&
                  (filter === "" || filter === "gym") &&
                  gymClients?.length > 0 ? (
                    gymClients.map((item) => {
                      return <ClientItem item={item} type="Gym" />;
                    })
                  ) : (
                    <></>
                  )}
                  {!isLoading &&
                  (filter === "" || filter === "trainer") &&
                  trainerClients?.length > 0 ? (
                    trainerClients.map((item) => {
                      return <ClientItem item={item} type="Trainer" />;
                    })
                  ) : (
                    <></>
                  )}
                  {!isLoading &&
                  (filter === "" || filter === "dietiian") &&
                  dieticianClients?.length > 0 ? (
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