import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { getAllBusiness } from "../../../../slices/browseBusiness";
import BusinessItem from "./businessItem";

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
        <div className="container">
            <div className="businesses">
                <button onClick={() => navigate(-1)}>go back</button>
                <h3>{`${businessTypeObj[type]}`}</h3>
                {isLoading ?
                    (<p>Loading...</p>) :
                    ((businesses?.length === 0) ?
                        (<p>No businesses found</p>) :
                        (businesses?.map((item, index) => {
                            return (<div key={index} style={{ width: "300px", backgroundColor: "grey", margin: "10px", cursor: "pointer" }} onClick={() => navigate(`${item._id}`)} >
                                <BusinessItem item={item} />
                            </div>)
                        })
                        )
                    )
                }
            </div>


        </div>
    );
}

export default BrowseBusinessType;