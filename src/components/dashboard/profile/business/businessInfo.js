import { Avatar } from "@mui/material"

const BusinessInfo = ({business}) => {
    return (
        <div>
            <p>
                <strong>About:</strong> {business?.about}
            </p>
            <p>
                <strong>Activities:</strong>
                <ul>
                    {business?.activities.map((item) => {
                        return <li>{item}</li>
                    })}
                </ul>
            </p>
            {business?.businessType === "gym" && <p>
                <strong>Address:</strong> {business?.address}
            </p>}
            <p>
                <strong>Contact:</strong> {business?.contact}
            </p>
            
        </div>
    )
}

export default BusinessInfo;