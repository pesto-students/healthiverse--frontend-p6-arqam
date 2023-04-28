import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMemberships } from "../../../../slices/membership";
import { getAllBusiness } from "../../../../slices/browseBusiness";
import { Avatar, CircularProgress } from "@mui/material";
import MembershipGroup from "./group";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

const AllMembership = () => {
    const { allBusiness } = useSelector((state) => state.browseBusiness);
    let { isLoading, memberships } = useSelector((state) => state.membership);
    memberships = memberships?.map(m => {
        let business = allBusiness?.filter(b => b._id === m.businessId)[0];
        business = { ...business, endDate: m.endDate };
        return business;
    });

    const gymMembership = memberships?.filter(m => m.businessType === "gym");
    const trainerMembership = memberships?.filter(m => m.businessType === "trainer");
    const dieticianMembership = memberships?.filter(m => m.businessType === "dietician");
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!allBusiness) { dispatch(getAllBusiness()) }
        if (memberships.length === 0) { dispatch(getMemberships()) }
    }, []);

    const data = [
        {
            label: "Gym",
            value: "gym",
        },
        {
            label: "Trainer",
            value: "trainer",
        },
        {
            label: "Dietician",
            value: "dietician",
        },
    ];

    const [selected, setSelected] = useState("gym");

    return (
        <>{
            isLoading ?
                (<div className="flex mt-24 justify-center content-center" >
                    <CircularProgress />
                </div >) :
                (<div className="flex flex-col justify-start content-center h-max my-4 w-full max-w-xl">
                    <Tabs value="gym">
                        <TabsHeader>
                            {data.map(({ label, value }) => (
                                <Tab key={value} value={value}
                                onClick={()=>setSelected(value)}
                                >
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    {selected==="gym" && gymMembership?.length > 0 &&
                        <MembershipGroup memberships={gymMembership} type="gym" />
                    }

                    {selected==="trainer" && trainerMembership?.length > 0 &&
                        <MembershipGroup memberships={trainerMembership} type="trainer" />
                    }

                    {selected==="dietician" && dieticianMembership?.length > 0 &&
                        <MembershipGroup memberships={dieticianMembership} type="dietician" />
                    }

                </div>)
        }
        </>


    );
}

export default AllMembership;