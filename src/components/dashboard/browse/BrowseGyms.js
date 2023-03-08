import React, { useState, useEffect } from "react";

import userService from "../../../services/user.service";

const BrowseGyms = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        userService.getGyms().then((res) => {
            setContent(res.data);
        })
            .catch((err) => {
                const _content = (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                    err.message || err.toString();
                setContent(_content);
            });
    }, [])

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
}

export default BrowseGyms;