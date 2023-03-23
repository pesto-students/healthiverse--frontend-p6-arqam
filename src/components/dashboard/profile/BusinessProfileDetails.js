import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BusinessProfileDetails = () => {
    const { businessProfiles } = useSelector((state) => state.business);
    const { id } = useParams();
    const businessArr = businessProfiles.filter((business) => { return business._id === id });
    const business = businessArr[0];
    return (

        <div className="container">
            <header className="jumbotron">
                <Link to="/business">back</Link>
                <h3>
                    <strong>{business.name}</strong> Profile
                </h3>
                <Link to="/business/profile/">Edit Profile</Link>
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

export default BusinessProfileDetails;