import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMemberships } from "../../../slices/membership";
import { Avatar } from "@mui/material";
import StarRatings from "react-star-ratings";
import userService from "../../../services/user.service";
import { getAllBusiness } from "../../../slices/browseBusiness";

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
                <Avatar src={business.userImage} style={{ width: "100px", height: "100px" }} />
                <h3>
                    <strong>{business.name}</strong> Profile
                </h3>
                <div>
                    {business.averageRating &&
                        <>
                            <span>{business.averageRating}</span>
                            <StarRatings rating={business.averageRating}
                                starRatedColor="black"
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="15px"
                                name='rating' />
                            <span>({business.reviews.length})</span>
                        </>}
                </div>
                <button onClick={handleClick}>Buy Membership</button>
                <div>
                    {business?.otherImages?.map((url) => (
                        <img key={url} src={url} alt="uploaded" style={{ width: "200px", height: "200px" }} />
                    ))}
                </div>
            </header>
            <p>
                <strong>About:</strong> {business.about}
            </p>
            <p>
                <strong>Adress:</strong> {business.address}
            </p>
            <p>
                <strong>Contact:</strong> {business.contact}
            </p>
            <p>
                <strong>Reviews:</strong>
                {business.reviews.length === 0 ? (<p>No reviews</p>) :
                    (
                        business.reviews.map(review => {
                            return (
                                <div>
                                    <Avatar
                                        src={review.subscriberImage}
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                    <p>{review.subscriberName}</p>
                                    <p>{review.comment}</p>
                                </div>
                            )
                        })
                    )
                }

            </p>

        </div>
    );
};

export default BusinessDetails;