import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import FormProfile from "./FormProfile";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { profileCompleted } = useSelector(state => state.post);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile-page">
      {!profileCompleted ?
        (<FormProfile />) :
        (<div className="container">
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.name}</strong> Profile
            </h3>
          </header>
          <p>
            <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
            {currentUser.token.substr(currentUser.token.length - 20)}
          </p>
          <p>
            <strong>Id:</strong> {currentUser._id}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <strong>Authorities:</strong>
          <p>
            role: {currentUser.role}
          </p>
        </div>)}

    </div>
  );
};

export default Profile;