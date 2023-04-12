import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getBusinessProfile } from "../../../../slices/businessProfile";
import BusinessItem from "../../browse/business/businessItem";

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

        // fetchData();

        if (!currentUser) {
            navigate("/login");
        } else if (businessProfiles.length === 0) {
            fetchData();
        }

    }, []);


    return (
        <div className="w-auto">
            {(!businessProfiles) ?
                (<div>
                   <h3 className="text-3xl font-bold">Loading...</h3>
                </div>) :
                (
                    <>
                        <div className="flex flex-col">
                            <div className="flex space-x-7 mt-3">

                                {gymProfiles.length !== 0 && (<div>
                                    <h3 className="text-3xl font-bold">Gym Profile</h3>
                                    {gymProfiles.map((profile, index) => {
                                        return <BusinessItem key={index} item={profile} to="" />
                                    })}
                                </div>)}



                            </div>

                        </div>
                        <div className="flex flex-col">
                            <div className="flex space-x-7 mt-3">

                                {trainerProfile.length !== 0 && (<div>
                                    <h3 className="text-3xl font-bold">Trainer Profile</h3>
                                    {trainerProfile.map((profile, index) => {
                                        return <BusinessItem key={index} item={profile} to="" />
                                    })}
                                </div>)}

                            </div>

                        </div>
                        <div className="flex flex-col">
                            <div className="flex space-x-7 mt-3">

                                {dieticianProfile.length !== 0 && (<div>
                                    <h3 className="text-3xl font-bold">Dietician Profile</h3>
                                    {dieticianProfile.map((profile, index) => {
                                        return <BusinessItem key={index} item={profile} to="" />
                                    })}
                                </div>)}

                            </div>

                        </div>
                    </>
                )}

        </div>

    );
};

export default BusinessProfile;