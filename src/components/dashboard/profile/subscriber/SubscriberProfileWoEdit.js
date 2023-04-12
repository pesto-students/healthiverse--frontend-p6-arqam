import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import SubscriberHeader from "./subscriberHeader";
import SubscriberInfo from "./subscriberInfo";

const SubscriberProfileWoEdit = ({subscriberProfileData}) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col w-full h-max max-w-lg min-w-max mt-4 bg-gray-50 shadow-xl rounded-xl flex flex-col">
            <header className="border-b w-auto ml-4 mr-4 flex flex-col">
                <div className="flex justify-start">
                    <button onClick={()=>navigate(-1)}>
                        <FontAwesomeIcon
                            icon="arrow-left"
                            className="mt-3 hover:scale-110 " />
                    </button>
                </div>
                <SubscriberHeader subscriberProfileData={subscriberProfileData} />
            </header>
            <SubscriberInfo subscriberProfileData={subscriberProfileData} />
        </div>
    )
}

export default SubscriberProfileWoEdit;