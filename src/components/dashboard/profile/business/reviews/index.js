import { Avatar } from "@mui/material";
import {
    Card,
    CardHeader,
    CardBody,
    Typography
} from "@material-tailwind/react";
import StarRatings from "react-star-ratings";
import { yellow } from "@mui/material/colors";

export default function BusinessReviews({ business }) {
    return (
        <div className="flex flex-col w-full ml-4 mr-4">
            <div className="mt-2 ml-4 mr-4">
                <span className="text-lg font-bold">Reviews:</span>
            </div>
            <div className="ml-4 mr-4 mb-4 flex w-full">
                {(business?.reviews.length === 0) ? (<p>No reviews</p>) :
                    business?.reviews.map(review => {
                        return (
                            <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
                                <CardHeader
                                    color="transparent"
                                    floated={false}
                                    shadow={false}
                                    className="mx-0 flex items-center gap-4 pt-0 pb-1"
                                >

                                    <Avatar
                                        src={review.subscriberImage}
                                        className="h-12 w-12"
                                    />
                                    <div className="flex w-full flex-col gap-0.5">
                                        <div className="flex items-center justify-between">
                                            <Typography variant="h5" color="blue-gray">
                                                {review.subscriberName}
                                            </Typography>
                                            <div className="5 flex items-center gap-0">
                                                <StarRatings rating={review.rating}
                                                    starRatedColor={yellow[700]}
                                                    numberOfStars={5}
                                                    starDimension="14px"
                                                    starSpacing="2px"
                                                    name='rating'
                                                    className="align-top" />
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardBody className="p-0">
                                    <Typography>
                                        &quot;{review.comment}&quot;
                                    </Typography>
                                </CardBody>
                            </Card>
                        )
                    })}
            </div>
        </div >
    );
}
