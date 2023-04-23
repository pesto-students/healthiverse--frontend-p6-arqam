import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getSubscriberProfile } from "../../../../../slices/subscriberProfile";
import { useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
// import SubscriberInfo from "./subscriberInfo";
// import SubscriberHeader from "./subscriberHeader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
 
export default function Example() {
  const { user } = useSelector((state) => state.auth);
  const { subscriberProfileCreated, subscriberProfileData } = useSelector((state) => state.subscriber);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      dispatch(getSubscriberProfile()).unwrap()
        .then((res) => {
          console.log(res);
          setLoading(false);
        }).catch((err) => {
          setLoading(false);
        });
    };
    if (!user) {
      navigate("/login");
    } else if (!subscriberProfileData) {
      fetchData();
    }
  }, []);

  return (
    <Card className="w-96 my-4 py-4">
      <CardHeader color="blue" className="relative h-56 rounded-full">
        <img
          src={subscriberProfileData.userImage}
          className="h-full w-full rounded-full"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          {subscriberProfileData.name}
        </Typography>
        <Typography>
          {subscriberProfileData.about}
        </Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">$899/night</Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          Barcelona, Spain
        </Typography>
      </CardFooter>
    </Card>
  );
}