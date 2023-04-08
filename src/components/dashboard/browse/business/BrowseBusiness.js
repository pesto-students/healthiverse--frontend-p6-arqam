import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllBusiness } from "../../../../slices/browseBusiness";
import BusinessItem from "./businessItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BrowseBusiness = () => {
    const { isLoading, allBusiness } = useSelector((state) => state.browseBusiness);
    const gyms = allBusiness?.filter(business => business.businessType === "gym");
    const trainers = allBusiness?.filter(business => business.businessType === "trainer");
    const dieticians = allBusiness?.filter(business => business.businessType === "dietician");
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
        <div className="w-auto">
            <div className="flex flex-col">
                <div className="flex space-x-7 mt-3">
                    <h3 className="text-3xl font-bold">Gyms</h3>
                    {(!isLoading) && gyms?.length > 0 &&
                        <button
                            className="text-base bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-xl"
                            onClick={() => navigate("gym")}
                            title="see all">
                            <FontAwesomeIcon icon="fa-arrow-right" />
                        </button>}
                </div>
                <div className="flex flex-wrap ">
                    {isLoading ?
                        (<p>Loading...</p>) :
                        ((gyms?.length === 0) ?
                            (<p>No gyms found</p>) :
                            (gyms?.slice(0, 2).map((item, index) => {
                                return (
                                    <BusinessItem key={index} item={item} to="gym/" />
                                )
                            })
                            )
                        )
                    }
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex space-x-7 mt-3">
                    <h3 className="text-3xl font-bold">Trainers</h3>
                    {(!isLoading) && trainers?.length > 0 &&
                        <button
                            className="text-base bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-xl"
                            onClick={() => navigate("trainer")}
                            title="see all">
                            <FontAwesomeIcon icon="fa-arrow-right" />
                        </button>}
                </div>

                <div className="flex flex-wrap">
                    {isLoading ?
                        (<p>Loading...</p>) :
                        ((trainers?.length === 0) ?
                            (<p>No trainers found</p>) :
                            (trainers?.slice(0, 2).map((item, index) => {
                                return (
                                    <BusinessItem key={index} item={item} to="trainer/" />
                                )
                            })
                            )
                        )
                    }
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex space-x-7 mt-3">
                    <h3 className="text-3xl font-bold">Dieticians</h3>
                    {(!isLoading) && dieticians?.length > 0 &&
                        <button
                            className="text-base bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-xl"
                            onClick={() => navigate("dietician")}
                            title="see all">
                            <FontAwesomeIcon icon="fa-arrow-right" />
                        </button>}
                </div>

                <div className="flex flex-wrap">
                    {isLoading ?
                        (<p>Loading...</p>) :
                        ((dieticians?.length === 0) ?
                            (<p>No dieticians found</p>) :
                            (dieticians?.slice(0, 2).map((item, index) => {
                                return (
                                    <BusinessItem key={index} item={item} to="dietician/" />
                                )
                            })
                            )
                        )
                    }
                </div>
            </div>

        </div>
    );
}

export default BrowseBusiness;