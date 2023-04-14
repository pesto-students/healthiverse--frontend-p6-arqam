import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMemberships } from "../../../../slices/membership";
import { Avatar } from "@mui/material";
import StarRatings from "react-star-ratings";
import userService from "../../../../services/user.service";
import { getAllBusiness } from "../../../../slices/browseBusiness";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BusinessHeader from "../../profile/business/header";
import BusinessInfo from "../../profile/business/info";
import BusinessReviews from "../../profile/business/reviews";
import { Button } from "@material-tailwind/react";

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
        <div className="profile-container-outer">
            <div className="profile-container-inner">
                <header className="profile-header">
                    <div className="flex justify-start">
                        <button onClick={() => navigate(-1)}
                            className="text-base mt-3 hover:bg-gray-300 px-2 py-1 rounded-xl">
                            <FontAwesomeIcon icon="fa-arrow-left" />
                        </button>
                    </div>
                    <BusinessHeader business={business} id={id} />
                    <div className="flex justify-center">
                        <button type="button" 
                        class="mt-3 mb-3 inline-block px-3 py-2 hover:scale-105 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-purple-700 to-pink-500 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"
                        onClick={handleClick}>
                            <FontAwesomeIcon icon="fa-credit-card" />
                            <span className="ml-2">Buy Membership</span>
                        </button>

                    </div>

                </header>

                <BusinessInfo business={business} />
                <BusinessReviews business={business} />

            </div>
        </div>


    );
};

export default BusinessDetails;