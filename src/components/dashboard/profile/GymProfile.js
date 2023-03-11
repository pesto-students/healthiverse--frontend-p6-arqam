import React, { useState, useEffect } from "react";
import { Navigate, useNavigate,Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import profileService from "../../../services/profile.service";

const GymProfile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [profileData, setProfileData] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    profileService.getBusinessProfile()
      .then((res) => {
        setProfileData(res.data);
      }).catch(() => {
        navigate("/business/profile");
        window.location.reload();
      });

  }, []);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile-page">
      {(!profileData._id) ?
        (<div>
          <h1>Loading...</h1>
        </div>) :
        (<div className="container">
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.name}</strong> Profile
            </h3>
            <Link to="/business/profile/">Edit Profile</Link>
          </header>
          <p>
            <strong>About:</strong> {profileData.about}
          </p>
          <p>
            <strong>Adress:</strong> {profileData.address}
          </p>
          <p>
            <strong>Contact:</strong> {profileData.contact}
          </p>
          {/* <p>
            <strong>Goals:</strong> {profileData.goals}
          </p>
          <p>
            <strong>Lifestyle:</strong> {profileData.lifestyle}
          </p>
          <p>
            <strong>Preferred Workout:</strong> {profileData.mode}
          </p> */}
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

export default GymProfile;