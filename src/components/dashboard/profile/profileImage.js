import Avatar from "@mui/material/Avatar";
import axios from "axios";
import React, {useState} from "react";

const AvatarUpload = () => {
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    const handleChange = (event) => {
        setImage(event.target.files[0]);
    }
    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image);
        data.append("upload_preset", "tadipaar");
        data.append("cloud_name", "dhkb0cyyy");
        axios.post("https://api.cloudinary.com/v1_1/dhkb0cyyy/image/upload", data)
            .then(res => {
                setUrl(res.data.url);
                console.log("Url set");
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <Avatar
                alt="Avatar"
                src={url}
                style={{ width: "200px", height: "200px" }}
            />
            <div>
                <input
                    // ref={inputFileRef}
                    accept="image/*"
                    id="avatar-image-upload"
                    type="file"
                    onChange={handleChange}
                />
                <label htmlFor="avatar-image-upload">
                    <button onClick={uploadImage}>
                        Upload
                    </button>
                </label>
            </div>
        </>
    )
}

export default AvatarUpload;