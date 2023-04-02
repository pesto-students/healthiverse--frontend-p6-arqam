import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllBusiness } from "../../../slices/browseBusiness";

const BrowseTrainers = () => {
    const { isLoading, allBusiness } = useSelector((state) => state.browseBusiness);
    const trainers = allBusiness?.filter(business => business.businessType === "trainer");
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
            <div >

                <button onClick={() => navigate(-1)}>go back</button>
                <h3>Trainers</h3>
                {isLoading ?
                    (<p>Loading...</p>) :
                    ((trainers?.length === 0) ?
                        (<p>No gyms found</p>) :
                        (trainers?.map((item, index) => {
                            return (<li key={index}><Link to={item._id}>{item.name}</Link></li>)
                        })
                        )
                    )
                }
            </div>


        </div>
    );
}

export default BrowseTrainers;