import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BusinessRating from "../../profile/business/rating";

const BusinessItem = ({ item, to }) => {
    const navigate = useNavigate();
    return (
        <div
            className="bg-gray-50 min-w-max rounded-xl shadow-xl ml-3 mt-3 px-3 py-3 hover:cursor-pointer hover:scale-105"
            onClick={() => navigate(`${to}${item._id}`)}
        >
            <div className="flex border-b pb-2">
                <div>
                    <Avatar src={item?.userImage}
                        className="w-24 h-24" />
                </div>
                <div className="flex flex-col justify-center ml-3">
                    <div className="text-xl font-bold">
                        {item.name}
                    </div>
                    <div className="flex justify-start text-xs mt-2 w-40">
                        <BusinessRating business={item} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-2">
                {item.address ?
                    (<div className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">Address: {item.address}</div>) :
                    (<div className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">About: {item.about}</div>)
                }
                <div className="text-sm" >Contact: {item.contact}</div>
            </div>
        </div>
    )
}

export default BusinessItem;