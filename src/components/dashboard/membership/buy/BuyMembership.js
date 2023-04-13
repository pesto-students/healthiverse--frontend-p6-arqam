import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { buyMembership } from "../../../../slices/membership";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BusinessHeader from "../../profile/business/header";
import OrderSummary from "../orderSummary";

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

    const orderSummary = [
        { heading: "Amount", value: business.membership[duration] },
        { heading: "GST(18%)", value: business.membership[duration] * 0.18 },
        { heading: "Total membership price", value: business.membership[duration] * 1.18 }

    ]

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
        <div className="flex w-full h-max justify-center content-center py-4">
            <div className="w-full max-w-xl px-4 min-w-max bg-gray-50 shadow-xl rounded-xl flex flex-col">
                <header className="border-b w-auto pb-3 flex flex-col content-center">
                    <div className="flex justify-start">
                        <button onClick={() => navigate(-1)}
                            className="text-base mt-3 hover:bg-gray-300 px-2 py-1 rounded-xl">
                            <FontAwesomeIcon icon="fa-arrow-left" />
                        </button>
                    </div>
                    <BusinessHeader business={business} id={id} />

                </header>
                <div className=" ml-4 mr-4 flex flex-col content-center">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="membership-label" className="my-1">Membership Period</InputLabel>
                        <Select
                            labelId="membership-label"
                            id="membership"
                            label="Age"
                            value={duration}
                            onChange={handleChange}
                        >
                            {
                                Object.keys(business.membership).map((key) => {
                                    return (
                                        <MenuItem key={key} value={key}>{membershipObject[key].option}</MenuItem>
                                    )
                                })
                            }
                        </Select>
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
                    </FormControl>

                    <OrderSummary items={orderSummary} />

                    <div className="flex justify-center">
                        <button type="button"
                            class=" mt-3 mb-3 inline-block px-3 py-2 hover:scale-105 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-purple-700 to-pink-500 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"
                            onClick={handleSubmit}>
                            <FontAwesomeIcon icon="fa-credit-card" />
                            <span className="ml-2">Pay ₹{business.membership[duration] * 1.18}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default BuyMembership;