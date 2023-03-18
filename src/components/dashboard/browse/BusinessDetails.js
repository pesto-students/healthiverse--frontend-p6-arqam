import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const BusinessDetails = ()=>{
    const {gyms, trainers, dieticians } = useSelector((state) => state.businessAndMembership);
    const allBusiness = gyms.concat(trainers,dieticians);
    const {id} = useParams();
    const businessArr = allBusiness.filter((business)=>{return business._id===id});
    const business = businessArr[0];
    return(
        <div>
            <h3>{business.name}</h3>
            <button>Buy Membership</button>
        </div>
    );
};

export default BusinessDetails;