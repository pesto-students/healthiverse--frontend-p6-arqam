import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import profileService from "../../../services/profile.service";
import { getBusinessProfile, setBusinessProfile } from "../../../slices/business";

const GymProfile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { businessProfileData } = useSelector((state) => state.business);
    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(() => {
        const fetchData = () => {
            dispatch(getBusinessProfile())
                .unwrap()
                .then((res) => {
                    dispatch(setBusinessProfile(res));

                }).catch((err) => {
                    navigate("/business/profile");
                });
        };
        if (!currentUser) {
            navigate("/login/business");
        } else {
            fetchData();
        }

    }, []);


    return (
        <div className="profile-page">
            {(!businessProfileData) ?
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
                        <strong>About:</strong> {businessProfileData.about}
                    </p>
                    <p>
                        <strong>Adress:</strong> {businessProfileData.address}
                    </p>
                    <p>
                        <strong>Contact:</strong> {businessProfileData.contact}
                    </p>
                    {/* <p>
            <strong>Goals:</strong> {businessProfileData.goals}
          </p>
          <p>
            <strong>Lifestyle:</strong> {businessProfileData.lifestyle}
          </p>
          <p>
            <strong>Preferred Workout:</strong> {businessProfileData.mode}
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