import { Avatar } from "@mui/material";

const ProfileHeader = ({ item }) => {
    return (
        <>
            <div className="flex justify-center content-center">
                <Avatar
                    alt="Avatar"
                    src={item?.userImage}
                    className="h-40 w-40"
                />
            </div>
            <div className="text-3xl font-bold text-center mt-2 mb-2">
                {item?.name}
            </div>
        </>
    )
}

export default ProfileHeader;