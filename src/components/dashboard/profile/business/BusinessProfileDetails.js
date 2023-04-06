import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { getBusinessProfile } from "../../../../slices/businessProfile";
import BusinessInfo from "./businessInfo";
import BusinessHeader from "./businessHeader";
import BusinessReviews from "./businessReviews";

const BusinessProfileDetails = () => {
    const { businessProfiles } = useSelector((state) => state.business);
    const { id } = useParams();
    const business = businessProfiles?.filter((business) => { return business?._id === id })[0];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = () => {
            dispatch(getBusinessProfile());
        };
        if (!businessProfiles) fetchData();
    })

    return (

        <div className="container">
            <div className="jumbotron">
                <button onClick={()=>navigate(-1)}>back</button>
                <BusinessHeader business={business} id={id} />
                <Link to={`/business/${id}/edit`}>Edit Profile</Link>
            </div>

            <BusinessInfo business={business} />
            <BusinessReviews business={business}/>

        </div>
    );
};

export default BusinessProfileDetails;