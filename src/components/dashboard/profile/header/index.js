import { CardBody, Typography } from "@material-tailwind/react";
import { Avatar } from "@mui/material";

const ProfileHeader = ({ item }) => {
    return (
      <>
        <div className="flex justify-center content-center">
          <Avatar alt="Avatar" src={item.userImage?item.userImage:""} className="h-40 w-40" />
        </div>
        <CardBody className="text-center">
          <Typography variant="h5" className="mb-2">
            {item.name}
          </Typography>
          <Typography>{item.about}</Typography>
        </CardBody>
      </>
    );
}

export default ProfileHeader;