import React, { useState, useEffect } from "react";

import userService from "../../../services/user.service";

const AllMembership = () => {
    const [gyms, setGyms] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [dieticians, setDieticians] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        userService.getMemberships().then((res) => {
            setGyms(res.data.gym);
            setTrainers(res.data.trainer);
            setDieticians(res.data.dietician);
            setIsLoading(false);
        })
            .catch((err) => {
                const _content = (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                    err.message || err.toString();
                console.log(_content);
                setIsLoading(false);
            });
    }, [])

    return (
        <div className="container">
            <div className="gyms">
                <h3>Gyms</h3>
                {isLoading && <p>Loading...</p>}

                {(!isLoading && gyms.length === 0) ?
                    (<p>No active membership</p>) :
                    (gyms.map((item, index) => {
                        return (<li key={index}>{item.name}</li>)
                    }))}
            </div>
            <div className="trainers">
                <h3>Trainers</h3>
                {isLoading && <p>Loading...</p>}
                {(!isLoading && trainers.length === 0) ?
                    (<p>No active membership</p>) :
                    (trainers.map((item, index) => {
                        return (<li key={index}>{item.name}</li>)
                    }))}
            </div>
            <div className="dieticians">
                <h3>Dieticians</h3>
                {isLoading && <p>Loading...</p>}
                {(!isLoading && dieticians.length === 0) ?
                    (<p>No active membership</p>) :
                    (dieticians.map((item, index) => {
                        return (<li key={index}>{item.name}</li>)
                    }))}
            </div>

        </div>
    );
}

export default AllMembership;