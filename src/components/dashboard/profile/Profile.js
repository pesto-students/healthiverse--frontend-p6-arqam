import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import FormProfile from "./FormProfile";
import profileService from "../../../services/profile.service";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { profileCreated } = useSelector(state => state.profile);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    console.log(profileCreated);
    profileService.getProfile()
      .then((res) => {
        setProfileData(res.data);
      }).catch((err) => {
        console.log(err);
      });

  }, []);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile-page">
      {(!profileCreated && !profileData._id) ?
        (<FormProfile />) :
        (<div className="container">
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.name}</strong> Profile
            </h3>
          </header>
          <p>
            <strong>About:</strong> {profileData.about}
          </p>
          <p>
            <strong>Height:</strong> {profileData.height}
          </p>
          <p>
            <strong>Weight:</strong> {profileData.weight}
          </p>
          <p>
            <strong>Goals:</strong> {profileData.goals}
          </p>
          <p>
            <strong>Lifestyle:</strong> {profileData.lifestyle}
          </p>
          <p>
            <strong>Preferred Workout:</strong> {profileData.mode}
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