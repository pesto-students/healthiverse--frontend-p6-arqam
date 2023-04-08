import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { getAllBusiness } from "../../../../slices/browseBusiness";
import BusinessItem from "./businessItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BrowseBusinessType = () => {
    const { isLoading, allBusiness } = useSelector((state) => state.browseBusiness);
    const { type } = useParams();
    const businesses = allBusiness?.filter(business => business.businessType === type);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const businessTypeObj = {
        gym: "Gyms",
        trainer: "Trainers",
        dietician: "Dieticians"
    };
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

        <div className="mt-3">
            <button onClick={() => navigate(-1)}
                className="text-base bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-xl">
                <FontAwesomeIcon icon="fa-arrow-left" />
            </button>
            <h3 className="text-3xl font-bold mt-3">{`${businessTypeObj[type]}`}</h3>
            <div className="flex flex-wrap ">
                {isLoading ?
                    (<p>Loading...</p>) :
                    ((businesses?.length === 0) ?
                        (<p>No businesses found</p>) :
                        (businesses?.map((item, index) => {
                            return (
                                <BusinessItem key={index} item={item} to="" />
                            )
                        })
                        )
                    )
                }
            </div>
        </div>


    );
}

export default BrowseBusinessType;