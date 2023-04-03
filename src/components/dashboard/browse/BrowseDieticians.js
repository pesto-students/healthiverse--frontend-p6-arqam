import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllBusiness } from "../../../slices/browseBusiness";
import { Avatar } from "@mui/material";
import StarRatings from "react-star-ratings";

const BrowseDieticians = () => {
    const { isLoading, allBusiness } = useSelector((state) => state.browseBusiness);
    const dieticians = allBusiness?.filter(business => business.businessType === "dietician");
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
            <div >

                <button onClick={() => navigate(-1)}>go back</button>
                <h3>Dieticians</h3>
                {isLoading ?
                    (<p>Loading...</p>) :
                    ((dieticians?.length === 0) ?
                        (<p>No dieticians found</p>) :
                        (dieticians?.map((item, index) => {
                            return (<div key={index} style={{width: "300px",     backgroundColor: "grey", margin: "10px", cursor: "pointer" }} onClick={() => navigate(`gyms/${item._id}`)} >
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
                                <div>About: {item.about}</div>
                                <div>Contact: {item.contact}</div>
                            </div>)
                        })
                        )
                    )
                }
            </div>


        </div>
    );
}

export default BrowseDieticians;