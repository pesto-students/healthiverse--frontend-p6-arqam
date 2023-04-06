import { Avatar } from "@mui/material";

const BusinessReviews = ({ business }) => {
    return (
        <div>
            <strong>Reviews:</strong>
            {business?.reviews.length === 0 ? (<p>No reviews</p>) :
                (
                    business.reviews.map(review => {
                        return (
                            <div>
                                <Avatar
                                    src={review.subscriberImage}
                                    style={{ width: "50px", height: "50px" }}
                                />
                                <p>{review.subscriberName}</p>
                                <p>{review.comment}</p>
                            </div>
                        )
                    })
                )
            }
        </div>
    )
}

export default BusinessReviews;