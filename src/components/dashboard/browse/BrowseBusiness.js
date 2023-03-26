import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBusiness } from "../../../slices/browseBusiness";

const BrowseBusiness = () => {
    const { isLoading, allBusiness } = useSelector((state) => state.browseBusiness);
    const gyms = allBusiness?.filter(business=>business.businessType==="gym");
    const trainers = allBusiness?.filter(business=>business.businessType==="trainer");
    const dieticians = allBusiness?.filter(business=>business.businessType==="dietician");
    const dispatch = useDispatch();

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

        fetchData();

    }, []);

    return (
        <div className="container">
            <div className="gyms">
                <h3>Gyms</h3>
                {isLoading ?
                    (<p>Loading...</p>) :
                    ((gyms?.length === 0) ?
                        (<p>No gyms found</p>) :
                        (gyms?.map((item, index) => {
                            return (<li key={index}><Link to={item._id}>{item.name}</Link></li>)
                        })
                        )
                    )
                }

            </div>
            <div className="trainers">
                <h3>Trainers</h3>
                {isLoading ?
                    (<p>Loading...</p>) :
                    ((trainers?.length === 0) ?
                        (<p>No trainers found</p>) :
                        (trainers?.map((item, index) => {
                            return (<li key={index}><Link to={item._id}>{item.name}</Link></li>)
                        })
                        )
                    )
                }
            </div>
            <div className="dieticians">
                <h3>Dieticians</h3>
                {isLoading ?
                    (<p>Loading...</p>) :
                    ((dieticians?.length === 0) ?
                        (<p>No dieticians found</p>) :
                        (dieticians?.map((item, index) => {
                            return (<li key={index}><Link to={item._id}>{item.name}</Link></li>)
                        })
                        )
                    )
                }
            </div>

        </div>
    );
}

export default BrowseBusiness;