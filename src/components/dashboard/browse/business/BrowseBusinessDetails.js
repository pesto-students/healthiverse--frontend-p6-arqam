import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMemberships } from "../../../../slices/membership";
import { Avatar } from "@mui/material";
import StarRatings from "react-star-ratings";
import userService from "../../../../services/user.service";
import { getAllBusiness } from "../../../../slices/browseBusiness";
import BusinessInfo from "../../profile/business/businessInfo";
import BusinessHeader from "../../profile/business/businessHeader";
import BusinessReviews from "../../profile/business/businessReviews";

const BusinessDetails = () => {
    const { allBusiness } = useSelector((state) => state.browseBusiness);
    const { id } = useParams();
    const businessArr = allBusiness.filter((business) => { return business._id === id });
    const business = businessArr[0];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = () => {
            dispatch(getAllBusiness())
                .unwrap()
                .catch((err) => {
                    const _content = (err.response &&
                        err.response.data &&
                        err.response.data.message) ||
                        err.message || err.toString();
                    console.log(_content);
                });
        }
        if (!allBusiness) {
            fetchData();
        }
    }, []);

    const handleClick = () => {
        dispatch(getMemberships());
        navigate("buy");
    }
    return (

        <div className="container">
            <header className="jumbotron">
                <button onClick={() => navigate(-1)}>go back</button>
                <BusinessHeader business={business} id={id}/>
                <button onClick={handleClick}>Buy Membership</button>
              
            </header>
            
            <BusinessInfo business={business}/>
            <BusinessReviews business={business}/>

        </div>
    );
};

export default BusinessDetails;