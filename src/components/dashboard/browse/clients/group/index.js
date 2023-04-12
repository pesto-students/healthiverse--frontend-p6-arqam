import { useNavigate } from "react-router-dom";
import ClientItem from "../item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ClientGroup = ({ clients, type, page }) => {
    const navigate = useNavigate();
    let to = "";
    page==="primary"?to=(type+"/"):to="";
    return (
        <div className="bg-gray-300 w-full min-w-max">
            <div className="flex gap-7 px-3">
                {page==="secondary" && <button
                    className="hover:scale-110"
                    onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon="arrow-left" />
                </button>}
                <h1 className="font-bold text-xl py-2">{type.charAt(0).toUpperCase() + type.slice(1) + " Clients"}</h1>
                {page === "primary" && <button
                    className="hover:scale-110"
                    onClick={() => navigate(type)}>
                    <FontAwesomeIcon icon="arrow-right" />
                </button>}
            </div>
            {clients.slice(0, 2).map(item => {
                return (
                    <div key={item._id}>
                        <ClientItem item={item} to={to} />
                    </div>
                )
            })}
        </div>
    )
}

export default ClientGroup;