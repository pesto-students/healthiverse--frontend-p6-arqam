import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getSubscriberProfile } from "../../../../slices/subscriberProfile";
import { useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import SubscriberInfo from "./subscriberInfo";
import SubscriberHeader from "./subscriberHeader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { subscriberProfileCreated, subscriberProfileData } = useSelector((state) => state.subscriber);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      dispatch(getSubscriberProfile()).unwrap()
        .then((res) => {
          console.log(res);
          setLoading(false);
        }).catch((err) => {
          setLoading(false);
        });
    };
    if (!user) {
      navigate("/login");
    } else if (!subscriberProfileData) {
      fetchData();
    }
  }, []);


  return (
    <>
      {(!subscriberProfileData) ?
        ((loading) ?
          (<div>
            <h1>Loading...</h1>
          </div>) :
          (<div>
            <Link to="/subscriber/profile">Create subscriber profile</Link>
            <br></br>
            <p>
              Own a business?
              <Link to="/subscriber/addbusiness"> Create business profile</Link>
            </p>
          </div>)
        ) :
        (<div className="w-1/2 max-w-lg min-w-max mt-4 bg-gray-50 shadow-xl rounded-xl flex flex-col">
          <header className="border-b w-auto ml-4 mr-4 flex flex-col">
            <div className="flex justify-end">
              <Link to="/subscriber/profile/" className="mr-3 mt-3">
                <FontAwesomeIcon
                  icon="user-pen"
                  title="Edit profile"
                  className="text-blue-600 hover:bg-gray-200 hover:scale-110 py-2 px-2 rounded-xl" />
              </Link>
            </div>
            <SubscriberHeader subscriberProfileData={subscriberProfileData} />
          </header>
          <SubscriberInfo subscriberProfileData={subscriberProfileData} />
        </div>)}

    </>
  );
};

export default Profile;