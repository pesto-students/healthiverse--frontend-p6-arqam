import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMemberships } from "../../../slices/membership";

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
                <h3>
                    <strong>{business.name}</strong> Profile
                </h3>
                <button onClick={handleClick}>Buy Membership</button>
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

            <div className="credentials">
                <p>
                    <h2>Credentials</h2>
                </p>
                <p>
                    <strong>Email:</strong> {business.email}
                </p>
                <p>
                    <strong>Password:</strong> **********
                </p>

            </div>


        </div>
    );
};

export default BusinessDetails;