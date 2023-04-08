import { Avatar } from "@mui/material";

const BusinessReviews = ({ business }) => {
    return (
        <div className="flex flex-col w-full ml-4 mr-4">
            <div className="mt-2 ml-4 mr-4">
                <span className="text-lg font-bold">Reviews:</span>
            </div>
            {business?.reviews.length === 0 ? (<p className="mt-2 ml-4 mr-4 mb-4">No reviews</p>) :
                (
                    business.reviews.map(review => {
                        return (
                            <div className="mt-2 ml-4 mr-4 mb-4 flex w-full">
                                <div>
                                    <Avatar
                                        src={review.subscriberImage}
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <div className="font-bold ml-2">{review.subscriberName}</div>
                                    <p className="ml-2 max-w-full break-all">{review.comment}</p>
                                </div>

                            </div>
                        )
                    })
                )
            }
        </div>
    )
}

export default BusinessReviews;