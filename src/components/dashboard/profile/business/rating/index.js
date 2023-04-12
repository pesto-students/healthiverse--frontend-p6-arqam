import { yellow } from "@mui/material/colors";
import StarRatings from "react-star-ratings";

const BusinessRating = ({ business }) => {
    return (
        <div className="text-xs text-center">
            {business?.averageRating &&
                <div className="flex justify-center">
                    <div className="mt-0.5">{business.averageRating.toFixed(1)}</div>
                    <div className="ml-2">
                        <StarRatings rating={business.averageRating}
                            starRatedColor={yellow[700]}
                            numberOfStars={5}
                            starDimension="14px"
                            starSpacing="2px"
                            name='rating'
                            className="align-top" />
                    </div>
                    <div className="ml-2 mt-0.5">({business.reviews.length})</div>
                </div>}
        </div>
    )
}

export default BusinessRating;