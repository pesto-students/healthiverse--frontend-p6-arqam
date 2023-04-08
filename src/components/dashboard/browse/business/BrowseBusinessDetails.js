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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <div className="flex w-full justify-center content-center">
            <div className="w-full max-w-xl min-w-max mt-4 bg-gray-50 shadow-xl rounded-xl flex flex-col">
                <header className="border-b w-auto ml-4 mr-4 flex flex-col content-center">
                    <div className="flex justify-start">
                        <button onClick={() => navigate(-1)}
                            className="text-base mt-3 hover:bg-gray-300 px-2 py-1 rounded-xl">
                            <FontAwesomeIcon icon="fa-arrow-left" />
                        </button>
                    </div>
                    <BusinessHeader business={business} id={id} />
                    <div className="flex justify-center">
                        <button
                            className="mt-3 mb-3 hover:scale-105 bg-gray-600 py-2 text-white w-1/2 rounded-xl "
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