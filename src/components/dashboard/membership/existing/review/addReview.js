import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import userService from "../../../../../services/user.service";
import { getAllBusiness } from "../../../../../slices/browseBusiness";

const StarRating = () => {
    const { allBusiness } = useSelector((state) => state.browseBusiness);
    const { id } = useParams();
    const businessArr = allBusiness.filter((business) => { return business._id === id });
    const business = businessArr[0];
    const { user: currentUser } = useSelector((state) => state.auth);
    const review = business?.reviews?.filter(review =>
        review.subscriberId === currentUser._id)[0];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [rating, setRating] = useState(review ? review.rating : 0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState(review ? review.comment : "");

    const handleSubmit = () => {
        const review = {
            businessId: id,
            rating: rating,
            comment: comment
        }
        console.log(review);
        userService.postReview(review)
            .then(res => {
                dispatch(getAllBusiness());
                navigate(-1);
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <header className="jumbotron">
                <button onClick={() => navigate(-1)}>go back</button>
                <Avatar src={business.userImage} style={{ width: "100px", height: "100px" }} />
                <h3>
                    <strong>{business.name}</strong> Profile
                </h3>
            </header>

            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            className={index <= (hover || rating) ? "on" : "off"}
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            <span className="star">&#9733;</span>
                        </button>
                    );
                })}
            </div>
            <div>
                <h3>Comment</h3>
                <TextField value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
            <button onClick={handleSubmit}>Submit Rating</button>
        </div>
    );
};

export default StarRating;