const ProfileInfo = ({ items }) => {

    return (

        <>
            {items.map(item => {
                return (
                    <p className="mt-2 flex">
                        <span className="text-lg font-bold">{item.heading}</span>
                        <span className="text-lg ml-2 flex flex-wrap">
                            {item.value}
                        </span>
                    </p>
                )
            })}
        </>
    )
}

export default ProfileInfo;