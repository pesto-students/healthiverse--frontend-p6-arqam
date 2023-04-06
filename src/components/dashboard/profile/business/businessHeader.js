import { Avatar } from "@mui/material"
import { Link } from "react-router-dom";

const BusinessHeader = ({ business, id }) => {
    return (
        <div>
            <Avatar
                alt="Avatar"
                src={business?.userImage}
                style={{ width: "200px", height: "200px" }}
            />

            <h3>
                <strong>{business?.name}</strong> Profile
            </h3>

            <div>
                {business?.otherImages?.map((url) => (
                    <img key={url} src={url} alt="uploaded" style={{ width: "200px", height: "200px" }} />
                ))}
            </div>
        </div>
    )
}

export default BusinessHeader;