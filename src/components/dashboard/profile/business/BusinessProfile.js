import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getBusinessProfile } from "../../../../slices/businessProfile";
import { Avatar } from "@mui/material";

const BusinessProfile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { businessProfiles } = useSelector((state) => state.business);
    let gymProfiles = businessProfiles?.filter(profile => profile.businessType === "gym");
    let trainerProfile = businessProfiles?.filter(profile => profile.businessType === "trainer");
    let dieticianProfile = businessProfiles?.filter(profile => profile.businessType === "dietician");

    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(() => {
        const fetchData = () => {
            dispatch(getBusinessProfile())
                .unwrap()
                .catch((err) => {
                    navigate("/business/profile");
                });
        };

        fetchData();

        // if (!currentUser) {
        //     navigate("/login");
        // } else if (businessProfiles.length === 0) {
        //     fetchData();
        // }

    }, []);


    return (
        <div className="profile-page">
            {(!businessProfiles) ?
                (<div>
                    <h1>Loading...</h1>
                </div>) :
                (<div>
                    {gymProfiles.length !== 0 && (<div>
                        <h3>Gym Profile</h3>
                        {gymProfiles.map(profile => {
                            return (
                                <div key={profile._id} style={{ width: "300px", backgroundColor: "grey", margin: "10px", cursor: "pointer" }} onClick={() => navigate(`${profile._id}`)} >
                                    <div><Avatar src={profile.userImage} style={{ width: "50px", height: "50px" }} /></div>
                                    <div><strong>{profile.name}</strong></div>
                                </div>)
                        })}
                    </div>)}

                    {trainerProfile.length !== 0 && (<div>
                        <h3>Trainer Profile</h3>
                        {trainerProfile.map(profile => {
                            return (
                                <div key={profile._id} style={{ width: "300px", backgroundColor: "grey", margin: "10px", cursor: "pointer" }} onClick={() => navigate(`${profile._id}`)} >
                                    <div><Avatar src={profile.userImage} style={{ width: "50px", height: "50px" }} /></div>
                                    <div><strong>{profile.name}</strong></div>
                                </div>)
                        })}
                    </div>)}

                    {dieticianProfile.length !== 0 && (<div>
                        <h3>Dietician Profile</h3>
                        {dieticianProfile.map(profile => {
                            return (
                                <div key={profile._id} style={{ width: "300px", backgroundColor: "grey", margin: "10px", cursor: "pointer" }} onClick={() => navigate(`${profile._id}`)} >
                                    <div><Avatar src={profile.userImage} style={{ width: "50px", height: "50px" }} /></div>
                                    <div><strong>{profile.name}</strong></div>
                                </div>)
                        })}
                    </div>)}

                </div>)}

        </div>
    );
};

export default BusinessProfile;