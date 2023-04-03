import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllBusiness } from "../../../slices/browseBusiness";
import { Avatar } from "@mui/material";

const BrowseGyms = () => {
    const { isLoading, allBusiness } = useSelector((state) => state.browseBusiness);
    const gyms = allBusiness?.filter(business => business.businessType === "gym");
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
            <div className="gyms">
            <button onClick={() => navigate(-1)}>go back</button>
                <h3>Gyms</h3>
                {isLoading ?
                    (<p>Loading...</p>) :
                    ((gyms?.length === 0) ?
                        (<p>No gyms found</p>) :
                        (gyms?.map((item, index) => {
                            return (<div style={{width: "200px",     backgroundColor: "grey", margin: "10px", cursor: "pointer" }} onClick={() => navigate(`gyms/${item._id}`)} >
                                <div><Avatar src={item.userImage} style={{ width: "50px", height: "50px" }} /></div>
                                <div><strong>{item.name}</strong></div>
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

export default BrowseGyms;