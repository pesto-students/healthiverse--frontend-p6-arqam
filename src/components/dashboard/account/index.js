import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import { updateAccountDetails } from "../../../slices/auth";
import EditItem from "./editItem";
import { Button } from "@mui/material";

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
    <div className="profile-container-outer">
      <div className="profile-container-inner">

        <div className="text-center py-2 border-b">
          <h2 className="font-bold text-xl text-gray-600 dark:text-white">Account Details</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <EditItem label="Name" defaultValue={user.name} updateData={updateData} />
          <EditItem label="Email" defaultValue={user.email} updateData={updateData} />
          <EditItem label="Password" defaultValue={password} updateData={updateData} />

          {Object.keys(formData).length > 0 &&
            <div className="flex justify-center">
              <Button type="submit" variant="contained" className="bg-blue-600">Submit</Button>
            </div>
          }
        </form>


      </div>
    </div>
  );
};

export default Account;