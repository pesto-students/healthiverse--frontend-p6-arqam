import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMemberships } from "../../../../slices/membership";
import { Button } from "@mui/material";
import { setRoom } from "../../../../slices/chatRooms";
import userService from "../../../../services/user.service";
import { getAllBusiness } from "../../../../slices/browseBusiness";
import BusinessHeader from "../../profile/business/header";
import BusinessInfo from "../../profile/business/info";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BusinessReviews from "../../profile/business/reviews";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReviewIcon from '@mui/icons-material/Reviews';

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
        <>
            <div className="profile-container-outer">
                <div className="profile-container-inner">
                    <header className="profile-header">
                        <div className="flex justify-between content-center">
                            <button onClick={() => navigate(-1)}
                                className="text-base hover:bg-gray-300 px-2 py-1 rounded-xl">
                                <FontAwesomeIcon icon="fa-arrow-left" />
                            </button>

                        </div>
                        <BusinessHeader business={business} id={id} />


                    </header>

                    <BusinessInfo business={business} />
                    {review ?
                        (
                            <>
                                <BusinessReviews business={{ reviews: Array(review) }} page="member" />
                                <div className="flex justify-center gap-7">
                                    <Button onClick={() => navigate("review")} variant="outlined" startIcon={<EditIcon />}>
                                        Edit
                                    </Button>
                                    <Button onClick={handleDelete} variant="outlined" startIcon={<DeleteIcon />}>
                                        Delete
                                    </Button>
                                </div>
                            </>
                        ) :
                        (
                            <div className="flex justify-center mt-3">
                                <Button onClick={() => navigate("review")} variant="outlined" startIcon={<ReviewIcon />}>
                                    Give a review
                                </Button>
                            </div>
                        )}

                </div>
            </div>


        </>
    );
};

export default MembershipDetails;