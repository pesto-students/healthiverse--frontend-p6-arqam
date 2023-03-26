import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { buyMembership } from "../../../slices/membership";

const BuyMembership = () => {
    const { allBusiness } = useSelector((state) => state.browseBusiness);
    const { memberships } = useSelector((state) => state.membership);
    const { id } = useParams();
    const business = allBusiness.filter((business) => { return business._id === id })[0];
    const existingMembership = memberships.filter((m) => { return m.businessId === id })[0];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [duration, setDuration] = useState("");
    const [alert, setAlert] = useState("");

    const handleChange = (e) => {
        setDuration(e.target.value);
        console.log(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const months = Number(duration);
        let date = new Date();
        date.setMonth(date.getMonth() + months);
        const data = {
            id: id,
            endDate: date,
            businessType: business.businessType
        }
        console.log(data);
        console.log(memberships);
        console.log(existingMembership);
        if (existingMembership) { setAlert("You are already subscribed to the business") }
        else {
            dispatch(buyMembership(data)).unwrap()
                .then((res) => {
                    console.log(res);
                    navigate("/subscriber/memberships");
                })
        }
    }
    return (

        <div className="container">
            <header className="jumbotron">
                <Link to="/subscriber/browse">back</Link>
                <h3>
                    <strong>{business.name}</strong> Profile
                </h3>

            </header>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <p>Please select membership duration:</p>
                <input type="radio" id="one" name="business" value="1" />
                <label htmlFor="one">One month = {business.membership.one}</label>
                <input type="radio" id="three" name="business" value="3" />
                <label htmlFor="three">Three months = {business.membership.three}</label>
                <input type="radio" id="six" name="business" value="6" />
                <label htmlFor="six">Six months = {business.membership.six}</label>
                <input type="radio" id="twelve" name="business" value="12" />
                <label htmlFor="twelve">One year = {business.membership.twelve}</label>

                <button type="submit" >Buy</button>
            </form>
            {alert && (
                <div className="form-group">
                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        {alert}
                    </div>
                </div>
            )}


        </div>
    );
};

export default BuyMembership;