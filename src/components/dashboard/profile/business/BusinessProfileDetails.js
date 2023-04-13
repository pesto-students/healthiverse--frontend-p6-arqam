import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessProfile } from "../../../../slices/businessProfile";
import BusinessHeader from "./header";
import BusinessInfo from "./info";
import BusinessReviews from "./reviews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const BusinessProfileDetails = ({ editable }) => {
    const { businessProfiles } = useSelector((state) => state.business);
    const { id } = useParams();
    console.log(id);
    const business = businessProfiles?.filter((business) => { return business._id === id })[0];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = () => {
            dispatch(getBusinessProfile());
        };
        if (!businessProfiles) fetchData();
        console.log(business);
    })

    return (


        <div className="flex w-full h-max justify-center content-center">
            <div className="w-full max-w-xl min-w-max mt-4 bg-gray-50 shadow-xl rounded-xl flex flex-col">
                <header className="border-b w-auto ml-4 mr-4 flex flex-col content-center">
                    <div className="mt-3 flex justify-between content-center">
                        <button onClick={() => navigate(-1)}
                            className="text-base hover:bg-gray-300 px-2 py-1 rounded-xl">
                            <FontAwesomeIcon icon="fa-arrow-left" />
                        </button>
                        {editable === true &&
                            <Link to={`/business/${id}/edit`} >
                                <FontAwesomeIcon
                                    icon="user-pen"
                                    title="Edit profile"
                                    className="text-blue-600  hover:scale-110 " />
                            </Link>
                        }
                    </div>
                    <BusinessHeader business={business} id={id} />


                </header>

                <BusinessInfo business={business} />
                <BusinessReviews business={business} />

            </div>
        </div>

    );
};

export default BusinessProfileDetails;