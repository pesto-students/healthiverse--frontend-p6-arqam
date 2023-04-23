const ProfileInfo = ({ items }) => {
    return (
        <>
            {items.map(item => {
                return (
                    <div className="w-full mt-2 flex">
                        <div className="w-max text-sm font-bold">{item.heading}</div>
                        <div className="w-full text-sm ml-2 break-words flex flex-wrap">
                            {item.value}
                        </div>
                    </div>
                )
            })}
        </>
    )
}
export default ProfileInfo;