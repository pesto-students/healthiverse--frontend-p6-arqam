import React, { useState, useEffect } from "react";
import userService from "../../../services/user.service";

const BrowseClients = () => {
    const [clients, setClients] = useState("");

    useEffect(() => {
        userService.getClients().then((res) => {
            setClients(res.data);
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
                {clients.map((item, index) => {
                    return (<li key={index}>{item.name}</li>)
                })}
            </div>
        </div>
    );
}

export default BrowseClients;