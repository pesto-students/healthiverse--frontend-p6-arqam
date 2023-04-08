import { Avatar } from "@mui/material"
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const BusinessHeader = ({ business }) => {
    return (
        <div className="flex flex-col">
            <div className="flex justify-center content-center">
                <Avatar src={business.userImage}
                    className="h-40 w-40" />
            </div>

            <div className="text-3xl font-bold text-center mt-2 mb-2">
                {business.name}
            </div>
            <div className="text-xs text-center">
                {business.averageRating &&
                    <div className="flex justify-center">
                        <div className="mt-0.5">{business.averageRating.toFixed(1)}</div>
                        <div className="ml-2">
                            <StarRatings rating={business.averageRating}
                                starRatedColor="black"
                                numberOfStars={5}
                                starDimension="14px"
                                starSpacing="2px"
                                name='rating'
                                className="align-top" />
                        </div>
                        <div className="ml-2 mt-0.5">({business.reviews.length})</div>
                    </div>}
            </div>
        </div>

    )
}

export default BusinessHeader;