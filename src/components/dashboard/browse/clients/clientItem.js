import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ClientItem = ({ item }) => {
    const navigate = useNavigate();
    return (
        <>
            <Avatar
                alt="Avatar"
                src={item.userImage}
                style={{ width: "50px", height: "50px" }}
            />
            <p>
                {item.name}
            </p>
            <p>
                End Date: {item.endDate}
            </p>
            
        </>
    )
};

export default ClientItem;