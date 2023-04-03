import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { getBusinessProfile } from "../../../slices/businessProfile";

const BusinessProfileDetails = () => {
    const { businessProfiles } = useSelector((state) => state.business);
    const { id } = useParams();
    const business = businessProfiles?.filter((business) => { return business?._id === id })[0];
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = () => {
            dispatch(getBusinessProfile());
        };
        if (!businessProfiles) fetchData();
    })

    return (

        <div className="container">
            <header className="jumbotron">
                <Link to="/business">back</Link>
                <Avatar
                    alt="Avatar"
                    src={business?.userImage}
                    style={{ width: "200px", height: "200px" }}
                />

                <h3>
                    <strong>{business?.name}</strong> Profile
                </h3>
                <Link to={`/business/${id}/edit`}>Edit Profile</Link>
                <div>
                    {business?.otherImages?.map((url) => (
                        <img key={url} src={url} alt="uploaded" style={{ width: "200px", height: "200px" }} />
                    ))}
                </div>
            </header>
            <p>
                <strong>About:</strong> {business?.about}
            </p>
            <p>
                <strong>Adress:</strong> {business?.address}
            </p>
            <p>
                <strong>Contact:</strong> {business?.contact}
            </p>

        </div>
    );
};

export default BusinessProfileDetails;