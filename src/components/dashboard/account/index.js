import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { updateAccountDetails } from "../../../slices/auth";

const Account = () => {
  const { user } = useSelector((state) => state.auth);
  const { password } = JSON.parse(localStorage.getItem("user"));
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [formData, setFormData] = useState({});

  const updateData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  const showPassword = (e) => {
    e.preventDefault();
    let x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // setSuccessful(false);
    // dispatch(updateAccountDetails(formValue))
    //   .unwrap()
    //   .then(() => {
    //     setSuccessful(true);

    //   })
    //   .catch(() => { setSuccessful(false) });
  };

  return (
    <div className="account">

      <p>
        <h2>Your Account</h2>
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          className="form-control mx-1"
          id="name"
          name="name"
          defaultValue={user.name}
          disabled={!editName}
          onChange={updateData}
        />
        <button onClick={(e) => {
          e.preventDefault();
          setEditName(!editName);
        }}>Edit Name</button>
        <label htmlFor="email">Email: </label>
        <input
          className="form-control mx-1"
          id="email"
          name="email"
          defaultValue={user.email}
          disabled={!editEmail}
          onChange={updateData}
        />
        <button onClick={(e) => {
          e.preventDefault();
          setEditEmail(!editEmail);
        }}>Edit Email</button>
        <label htmlFor="password">Password: </label>
        <input
          className="form-control mx-1"
          type="password"
          id="password"
          name="password"
          defaultValue={password}
          disabled={!editPassword}
          onChange={updateData}
        />
        <button onClick={showPassword}>
          Show Password
        </button>
        <button onClick={(e) => {
          e.preventDefault();
          setEditPassword(!editPassword);
        }}>Edit Password</button>
        <br />
        {(editEmail || editName || editPassword) && <button type="submit">Submit</button>}
      </form>
      {/* <p>
        <strong>Name:</strong> {user.name}
        <Link to="edit">Edit Name</Link>
      </p>
      <p>
        <strong>Email:</strong> {user.email}
        <Link to="edit">Edit Email</Link>
      </p>
      <p>
        <strong>Password:</strong> **********
        <Link to="edit">Edit Password</Link>
      </p> */}

    </div>

  );
};

export default Account;