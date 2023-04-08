import { Avatar } from "@mui/material"

const BusinessInfo = ({ business }) => {
    return (
        <div className="border-b ml-4 mr-4">
            <p className="mt-2 ml-4 mr-4">
                <span className="text-lg font-bold">About:</span>
                <span className="text-lg ml-2">
                    {business?.about}
                </span>
            </p>
            <div className="mt-2 ml-4 mr-4 flex">
                <div className="text-lg font-bold">Activites:</div>
                <div className="text-lg ml-2 flex flex-wrap">
                    {business?.activities.map((item) => {
                        return <div className="ml-2 text-base bg-gray-200 px-2 rounded-xl">{item}</div>
                    })}
                </div>
            </div>

            {business?.businessType === "gym" &&
                <p className="mt-2 ml-4 mr-4">
                    <span className="text-lg font-bold">Address:</span>
                    <span className="text-lg ml-2">
                        {business?.address}
                    </span>
                </p>
            }
            <p className="mt-2 ml-4 mr-4">
                <span className="text-lg font-bold">Contact:</span>
                <span className="text-lg ml-2">
                    {business?.contact}
                </span>
            </p>

        </div>
    )
}

export default BusinessInfo;