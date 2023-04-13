import ProfileInfo from "../../info";

const BusinessInfo = ({ business }) => {
    return (
        <div className="border-b pb-2">
            <ProfileInfo items={[{ heading: "About:", value: business?.about }]} />
            <ProfileInfo items={[{
                heading: "Activities:", value: business?.activities.map((item) => {
                    return <div className="ml-2 text-base bg-gray-200 text-slate-650 px-2 rounded-xl">{item}</div>
                })
            }]} />
            {business?.businessType === "gym" &&
                <ProfileInfo items={[{ heading: "Address:", value: business?.address }]} />

            }
            <ProfileInfo items={[{ heading: "Contact:", value: business?.contact }]} />

        </div>
    )
}

export default BusinessInfo;