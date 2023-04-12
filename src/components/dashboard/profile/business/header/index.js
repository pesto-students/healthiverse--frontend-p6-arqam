import ProfileHeader from "../../header";
import BusinessRating from "../rating";



const BusinessHeader = ({ business }) => {
    return (
        <div className="flex flex-col">
            <ProfileHeader item={business} />
            <BusinessRating business={business} />
        </div>

    )
}

export default BusinessHeader;