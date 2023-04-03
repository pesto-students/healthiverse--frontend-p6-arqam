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

    const [duration, setDuration] = useState("one");
    const [alert, setAlert] = useState("");

    const membershipObject = {
        one: { value: 1, option: "1 Month" },
        three: { value: 3, option: "3 Months" },
        six: { value: 6, option: "6 Months" },
        twelve: { value: 12, option: "12 Months" }
    }

    const handleChange = (e) => {
        setDuration(e.target.value);
        console.log(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const months = Number(membershipObject[duration].value);
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
                <button onClick={() => navigate(-1)}>go back</button>
                <h3>
                    <strong>{business.name}</strong> Profile
                </h3>

            </header>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <label for="membership">Membership Period:</label>
                <select id="membership" name="membership">
                    {
                        Object.keys(business.membership).map((key) => {
                            return (
                                <option value={key}>{membershipObject[key].option}</option>
                            )
                        })
                    }
                </select>
                <div>Amount: <span>{business.membership[duration]}</span></div>
                <div>Total membership price: <span>{business.membership[duration]}</span></div>
                <div>GST(18%): <span>{business.membership[duration]*0.18}</span></div>
                <div>Total outstanding price: <span>{business.membership[duration]*1.18}</span></div>
                <button type="submit" >Pay ₹{business.membership[duration]*1.18}</button>
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