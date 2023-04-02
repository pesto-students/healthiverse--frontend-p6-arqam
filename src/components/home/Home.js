import React, { useState, useEffect } from "react";
import userService from "../../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  // useEffect(() => {
  //     userService.getPublicContent()
  //         .then((res) => { setContent(res.data) })
  //         .catch((err) => {
  //             const _content = (err.response && err.response.data) ||
  //                 err.message ||
  //                 err.toString();
  //             setContent(_content);
  //         })

  // }, [])

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Landing Page</h3>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </header>
    </div>
  );
};

export default Home;
