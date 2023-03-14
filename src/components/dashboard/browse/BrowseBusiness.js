import React, { useState, useEffect } from "react";

import userService from "../../../services/user.service";

const BrowseBusiness = () => {
    const [gyms, setGyms] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [dieticians, setDieticians] = useState([]);

    useEffect(() => {
        userService.getAllBusiness().then((res) => {
            setGyms(res.data.gym);
            setTrainers(res.data.trainer);
            setDieticians(res.data.dietician);
        })
            .catch((err) => {
                const _content = (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                    err.message || err.toString();
                console.log(_content);
            });
    }, [])

    return (
        <div className="container">
            <div className="gyms">
                <h3>Gyms</h3>
                {(gyms.length === 0) ?
                    (<p>Loading...</p>) :
                    (gyms.map((item, index) => {
                        return (<li key={index}>{item.name}</li>)
                    }))}
            </div>
            <div className="trainers">
                <h3>Trainers</h3>
                {(trainers.length === 0) ?
                    (<p>Loading...</p>) :
                    (trainers.map((item, index) => {
                        return (<li key={index}>{item.name}</li>)
                    }))}
            </div>
            <div className="dieticians">
                <h3>Dieticians</h3>
                {(dieticians.length === 0) ?
                    (<p>Loading...</p>) :
                    (dieticians.map((item, index) => {
                        return (<li key={index}>{item.name}</li>)
                    }))}
            </div>
        </div>
    );
}

export default BrowseBusiness;