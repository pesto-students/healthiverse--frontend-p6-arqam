import { Avatar } from "@mui/material";

const SubscriberHeader = ({ subscriberProfileData }) => {
    return (
        <>
            <div className="flex justify-center content-center">
                <Avatar
                    alt="Avatar"
                    src={subscriberProfileData.userImage}
                    className="h-40 w-40"
                />
            </div>
            <div className="text-3xl font-bold text-center mt-2 mb-2">
                {subscriberProfileData.name}
            </div>
        </>
    )
}

export default SubscriberHeader;