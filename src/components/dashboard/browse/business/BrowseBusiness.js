import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllBusiness } from "../../../../slices/browseBusiness";
import BusinessItem from "./businessItem";

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
        <div className="container">
            <div className="gyms">
                <h3>Gyms</h3>
                {(!isLoading) && gyms?.length > 0 && <button onClick={() => navigate("gym")}>see all</button>}
                {isLoading ?
                    (<p>Loading...</p>) :
                    ((gyms?.length === 0) ?
                        (<p>No gyms found</p>) :
                        (gyms?.slice(0, 2).map((item, index) => {
                            return (<div key={index} style={{ width: "300px", backgroundColor: "grey", margin: "10px", cursor: "pointer" }} onClick={() => navigate(`gym/${item._id}`)} >
                                <BusinessItem item={item} />
                            </div>)
                        })
                        )
                    )
                }
            </div>
            <div className="trainers">
                <h3>Trainers</h3>
                {(!isLoading) && trainers?.length > 0 && <button onClick={() => navigate("trainer")}>see all</button>}
                {isLoading ?
                    (<p>Loading...</p>) :
                    ((trainers?.length === 0) ?
                        (<p>No trainers found</p>) :
                        (trainers?.slice(0, 2).map((item, index) => {
                            return (<div key={index} style={{ width: "300px", backgroundColor: "grey", margin: "10px", cursor: "pointer" }} onClick={() => navigate(`trainer/${item._id}`)} >
                                <BusinessItem item={item} />
                            </div>)
                        })
                        )
                    )
                }
            </div>
            <div className="dieticians">
                <h3>Dieticians</h3>
                {(!isLoading) && dieticians?.length > 0 && <button onClick={() => navigate("dietician")}>see all</button>}
                {isLoading ?
                    (<p>Loading...</p>) :
                    ((dieticians?.length === 0) ?
                        (<p>No dieticians found</p>) :
                        (dieticians?.slice(0, 2).map((item, index) => {
                            return (<div key={index} style={{ width: "300px", backgroundColor: "grey", margin: "10px", cursor: "pointer" }} onClick={() => navigate(`dietician/${item._id}`)} >
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

export default BrowseBusiness;