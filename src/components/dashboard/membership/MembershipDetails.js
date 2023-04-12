import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMemberships } from "../../../slices/membership";
import { Avatar } from "@mui/material";
import { setRoom } from "../../../slices/chatRooms";
import StarRatings from "react-star-ratings";
import userService from "../../../services/user.service";
import { getAllBusiness } from "../../../slices/browseBusiness";
import BusinessHeader from "../profile/business/header";
import BusinessInfo from "../profile/business/info";

const MembershipDetails = () => {
    const { allBusiness } = useSelector((state) => state.browseBusiness);
    const { id } = useParams();
    const business = allBusiness.filter((business) => { return business._id === id })[0];
    const { memberships } = useSelector((state) => state.membership);
    const membership = memberships?.filter(m => m.businessId === id)[0];

    const { user: currentUser } = useSelector((state) => state.auth);
    const review = business?.reviews?.filter(review =>
        review.subscriberId === currentUser._id)[0];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!allBusiness) {
            dispatch(getAllBusiness());
        }
        if (!memberships) {
            dispatch(getMemberships());
        }
    });

    const chatClick = (business) => {
        dispatch(setRoom({
            user1: { ...currentUser, senderType: "subscriber" },
            user2: business
        }));
        // socket.emit('join_room', { name: currentUser.name, roomId: roomId });
        navigate(`/subscriber/chats/${business._id}`);
    };

    const handleDelete = () => {
        userService.deleteReview({ businessId: business._id })
            .then(() => {
                dispatch(getAllBusiness());
            }).catch((err) => {
                console.log(err);
            });
    }

    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

    return (

        <div className="container">
            <header className="jumbotron">
                <button onClick={() => navigate(-1)}>go back</button>
                <BusinessHeader business={business} />
                <button onClick={() => {
                    chatClick(business);
                }}>
                    Chat
                </button>
                <div>Membership ending on: {formatDateFromTimestamp(membership.endDate)}</div>
            </header>

            <BusinessInfo business={business} />

            {review ?
                (<>
                    <h3>Your review:</h3>
                    <StarRatings rating={review.rating}
                        starRatedColor="black"
                        numberOfStars={5}
                        starDimension="20px"
                        starSpacing="15px"
                        name='rating' />
                    <div>{review.comment}</div>
                    <button onClick={() => navigate("review")}>Edit Review</button>
                    <button onClick={handleDelete}>Delete Review</button>
                </>
                ) :
                (<Link to="review">Write a review</Link>)}


        </div>
    );
};

export default MembershipDetails;