import { useNavigate } from "react-router-dom";
import MembershipItem from "../item";

const MembershipGroup = ({ memberships, type }) => {
    const navigate = useNavigate();
    return (
        <div className="rounded-xl overflow-hidden w-full min-w-max">
            <div className="bg-gray-200 px-3">
                <h1 className=" font-bold text-xl py-2">
                    {type.charAt(0).toUpperCase() + type.slice(1) + " Membership"}
                </h1>
            </div>
            {memberships.map(item => {
                return (
                    <div key={item._id}>
                        <MembershipItem item={item} />
                    </div>
                )
            })}
        </div>
    )
}

export default MembershipGroup;