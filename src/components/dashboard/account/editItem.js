import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import React, { useState } from "react";
const EditItem = ({ label, defaultValue, updateData }) => {
    const [editOn, setEditOn] = useState(false);
    const showPassword = (e) => {
        e.preventDefault();
        let x = document.getElementById("Password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
    return (
        <>
            <label htmlFor={label}
                className="text-sm font-semibold text-gray-600 dark:text-white">
                {label}
            </label>

            <div class="flex flex-row justify-center my-2 space-x-2">
                <input
                    className="flex-1 rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                    id={label}
                    type={(label === "Password") ? "password" : "text"}
                    name="email"
                    defaultValue={defaultValue}
                    disabled={!editOn}
                    onChange={updateData}
                />
                {label === "Password" && <button onClick={showPassword}>
                    <VisibilityTwoToneIcon />
                </button>}
                <button onClick={(e) => {
                    e.preventDefault();
                    setEditOn(!editOn);
                }}><EditTwoToneIcon /></button>

            </div></>
    )
}

export default EditItem;