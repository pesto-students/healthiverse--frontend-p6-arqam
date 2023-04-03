import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMemberships } from "../../../slices/membership";
import { Avatar } from "@mui/material";
import StarRatings from "react-star-ratings";

const BusinessDetails = () => {
    const { allBusiness } = useSelector((state) => state.browseBusiness);
    const { id } = useParams();
    const businessArr = allBusiness.filter((business) => { return business._id === id });
    const business = businessArr[0];
    const navigate = useNavigate();
    const dispatch = useDispatch();


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

        </div>
    );
};

export default BusinessDetails;