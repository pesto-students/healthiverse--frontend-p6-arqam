import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";

const BusinessItem = ({ item, to }) => {
    const navigate = useNavigate();
    return (
        <div
            className="bg-gray-50 w-96 rounded-xl shadow-xl ml-3 mt-3 px-3 py-3 hover:cursor-pointer hover:scale-105"
            onClick={() => navigate(`${to}${item._id}`)}
        >
            <div className="flex">
                <div>
                    <Avatar src={item.userImage}
                        className="w-24 h-24" />
                </div>
                <div className="flex flex-col justify-center ml-3">
                    <div className="text-xl font-bold">
                        {item.name}
                    </div>
                    <div className="text-xs mt-2 ">
                        {item.averageRating &&
                            <div className="flex ">
                                <div className="mt-0.5">{item.averageRating.toFixed(1)}</div>
                                <div className="ml-2">
                                    <StarRatings rating={item.averageRating}
                                        starRatedColor="black"
                                        numberOfStars={5}
                                        starDimension="14px"
                                        starSpacing="2px"
                                        name='rating'
                                        className="align-top" />
                                </div>
                                <div className="ml-2 mt-0.5">({item.reviews.length})</div>
                            </div>}
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-3 text-lg">
                {item.address ?
                    (<div className="overflow-hidden overflow-ellipsis whitespace-nowrap">Address: {item.address}</div>) :
                    (<div>About: {item.about}</div>)
                }
                <div >Contact: {item.contact}</div>
            </div>
        </div>
    )
}

export default BusinessItem;