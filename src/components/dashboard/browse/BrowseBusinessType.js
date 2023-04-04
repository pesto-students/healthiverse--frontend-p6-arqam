import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { getAllBusiness } from "../../../slices/browseBusiness";
import { Avatar } from "@mui/material";
import StarRatings from "react-star-ratings";

const BrowseBusinessType = () => {
    const { isLoading, allBusiness } = useSelector((state) => state.browseBusiness);
    const { type } = useParams();
    const businesses = allBusiness?.filter(business => business.businessType === type);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const businessTypeObj = {
        gym: "Gyms",
        trainer: "Trainers",
        dietician: "Dieticians"
    };
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

    return (
        <div className="container">
            <div className="businesses">
                <button onClick={() => navigate(-1)}>go back</button>
                <h3>{`${businessTypeObj[type]}`}</h3>
                {isLoading ?
                    (<p>Loading...</p>) :
                    ((businesses?.length === 0) ?
                        (<p>No businesses found</p>) :
                        (businesses?.map((item, index) => {
                            return (<div key={index} style={{ width: "300px", backgroundColor: "grey", margin: "10px", cursor: "pointer" }} onClick={() => navigate(`${item._id}`)} >
                                <div><Avatar src={item.userImage} style={{ width: "50px", height: "50px" }} /></div>
                                <div><strong>{item.name}</strong></div>
                                <div>
                                    {item.averageRating &&
                                        <>
                                            <span>{item.averageRating}</span>
                                            <StarRatings rating={item.averageRating}
                                                starRatedColor="black"
                                                numberOfStars={5}
                                                starDimension="20px"
                                                starSpacing="15px"
                                                name='rating' />
                                            <span>({item.reviews.length})</span>
                                        </>}
                                </div>
                                <div>Address: {item.address}</div>
                                <div>Open Hours: {item.openTime.from} to {item.openTime.to}</div>
                            </div>)
                        })
                        )
                    )
                }
            </div>


        </div>
    );
}

export default BrowseBusinessType;