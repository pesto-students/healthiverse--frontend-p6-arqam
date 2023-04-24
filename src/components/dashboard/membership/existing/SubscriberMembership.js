import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMemberships } from "../../../../slices/membership";
import { getAllBusiness } from "../../../../slices/browseBusiness";
import { Avatar, CircularProgress } from "@mui/material";
import MembershipGroup from "./group";

const AllMembership = () => {
    const { allBusiness } = useSelector((state) => state.browseBusiness);
    let { isLoading, memberships } = useSelector((state) => state.membership);
    memberships = memberships?.map(m => {
        let business = allBusiness?.filter(b => b._id === m.businessId)[0];
        business = { ...business, endDate: m.endDate };
        return business;
    });

    const gymMembership = memberships?.filter(m => m.businessType === "gym");
    const trainerMembership = memberships?.filter(m => m.businessType === "trainer");
    const dieticianMembership = memberships?.filter(m => m.businessType === "dietician");
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!allBusiness) { dispatch(getAllBusiness()) }
        if (!memberships) { dispatch(getMemberships()) }
    }, []);


    return (
        <>{
            isLoading ?
                (<div className="flex my-4 justify-center content-center" >
                    <CircularProgress />
                </div >) :
                (<div className="flex flex-col justify-start content-center rounded-xl h-max my-4 w-full max-w-xl shadow-xl">
                    {gymMembership?.length > 0 &&
                        <MembershipGroup memberships={gymMembership} type="gym" />
                    }

                    {trainerMembership?.length > 0 &&
                        <MembershipGroup memberships={trainerMembership} type="trainer" />
                    }

                    {dieticianMembership?.length > 0 &&
                        <MembershipGroup memberships={dieticianMembership} type="dietician" />
                    }

                </div>)
        }
        </>


    );
}

export default AllMembership;