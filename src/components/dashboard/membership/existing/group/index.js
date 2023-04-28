import { useNavigate } from "react-router-dom";
import MembershipItem from "../item";

const MembershipGroup = ({ memberships, type }) => {
    const navigate = useNavigate();
    return (
        <div className="rounded-xl mt-4 border  w-full min-w-max">
            
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