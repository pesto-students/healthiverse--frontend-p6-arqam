import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getSubscriberProfile } from "../../../slices/subscriberProfile";
import { useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import AvatarUpload from "./profileImage";

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
        }).catch((err)=>{
          setLoading(false);
        });
    };
    if (!user) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, []);


  return (
    <div className="profile-page">
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
        (<div className="container">
          <header className="jumbotron">
          <Avatar
                alt="Avatar"
                src={subscriberProfileData.userImage}
                style={{ width: "200px", height: "200px" }}
            />
            <h3>
              <strong>{user.name}</strong> Profile
            </h3>
            <Link to="/subscriber/profile/">Edit Profile</Link>
          </header>
          <p>
            <strong>About:</strong> {subscriberProfileData.about}
          </p>
          <p>
            <strong>Height:</strong> {subscriberProfileData.height}
          </p>
          <p>
            <strong>Weight:</strong> {subscriberProfileData.weight}
          </p>
          <p>
            <strong>Goals:</strong> {subscriberProfileData.goals}
          </p>
          <p>
            <strong>Lifestyle:</strong> {subscriberProfileData.lifestyle}
          </p>
          <p>
            <strong>Preferred Workout:</strong> {subscriberProfileData.mode}
          </p>
        </div>)}

    </div>
  );
};

export default Profile;