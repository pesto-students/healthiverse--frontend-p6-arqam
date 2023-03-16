import React, { useState, useEffect } from "react";
import userService from "../../../services/user.service";

const BrowseClients = () => {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        userService.getClients().then((res) => {
            setClients(res.data);
            setIsLoading(false);
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
            <div className="clients">
                <h3>Clients</h3>
                {isLoading && <p>Loading...</p>}

                {(!isLoading && clients.length === 0) ?
                    (<p>No active clients</p>) :
                    (clients.map((item, index) => {
                        return (<li key={index}>Name: {item.name} End Date: {item.endDate}</li>)
                    }))}
            </div>
        </div>
    );
}

export default BrowseClients;