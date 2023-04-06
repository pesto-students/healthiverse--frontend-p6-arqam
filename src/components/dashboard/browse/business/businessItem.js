import { Avatar } from "@mui/material";
import StarRatings from "react-star-ratings";

const BusinessItem = ({ item }) => {
    return (
        <>
            <div><Avatar src={item.userImage} style={{ width: "50px", height: "50px" }} /></div>
            <div><strong>{item.name}</strong></div>
            <div>
                {item.averageRating &&
                    <>
                        <span>{item.averageRating}</span>
                        <StarRatings rating={item.averageRating}
                            starRatedColor="black"
                            numberOfStars={5}
                            starDimension="20px"
                            starSpacing="15px"
                            name='rating' />
                        <span>({item.reviews.length})</span>
                    </>}
            </div>
            {item.address ?
                (<div>Address: {item.address}</div>) :
                (<div>About: {item.about}</div>)
            }
            <div>Contact: {item.contact}</div>
        </>
    )
}

export default BusinessItem;