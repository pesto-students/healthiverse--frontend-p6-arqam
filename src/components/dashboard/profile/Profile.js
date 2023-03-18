import React, { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getSubscriberProfile, setSubscriberProfile } from "../../../slices/subscriber";
import { useDispatch } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { subscriberProfileData } = useSelector((state) => state.subscriber);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      dispatch(getSubscriberProfile());
    };
    if (!currentUser) {
      navigate("/login");
    } else {
      fetchData();
    }


  }, []);


  return (
    <div className="profile-page">
      {(!subscriberProfileData) ?
        (<div>
          <h1>Loading...</h1>
        </div>) :
        (<div className="container">
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.name}</strong> Profile
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
          <div className="credentials">
            <p>
              <h2>Credentials</h2>
            </p>
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
            <p>
              <strong>Password:</strong> **********
            </p>

          </div>

        </div>)}

    </div>
  );
};

export default Profile;