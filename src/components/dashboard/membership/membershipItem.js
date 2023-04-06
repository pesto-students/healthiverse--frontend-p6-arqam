import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MembershipItem = ({ item }) => {

    const navigate = useNavigate();
    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

    return (
        <>
            <Avatar
                alt="Avatar"
                src={item.userImage}
                style={{ width: "50px", height: "50px" }}
                onClick={() => navigate(`${item._id}`)}
            />
            <p>
                {item.name}
            </p>
            <p>End Date: {formatDateFromTimestamp(item.endDate)}</p>
        </>
    )
}

export default MembershipItem;