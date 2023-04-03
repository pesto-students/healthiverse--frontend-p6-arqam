import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMemberships } from "../../../slices/membership";
import { Avatar } from "@mui/material";
import { setRoom } from "../../../slices/chatRooms";
import StarRatings from "react-star-ratings";
import userService from "../../../services/user.service";
import { getAllBusiness } from "../../../slices/browseBusiness";

const MembershipDetails = () => {
    const { allBusiness } = useSelector((state) => state.browseBusiness);
    const { id } = useParams();
    const businessArr = allBusiness.filter((business) => { return business._id === id });
    const business = businessArr[0];
    const { user: currentUser } = useSelector((state) => state.auth);
    const review = business?.reviews?.filter(review =>
        review.subscriberId === currentUser._id)[0];
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    return (

        <div className="container">
            <header className="jumbotron">
                <button onClick={() => navigate(-1)}>go back</button>
                <Avatar src={business.userImage} style={{ width: "100px", height: "100px" }} />
                <h3>
                    <strong>{business.name}</strong> Profile
                </h3>
                <div>
                    {business?.otherImages?.map((url) => (
                        <img key={url} src={url} alt="uploaded" style={{ width: "200px", height: "200px" }} />
                    ))}
                </div>

                <button onClick={() => {
                    chatClick(business);
                }}>
                    Chat
                </button>
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