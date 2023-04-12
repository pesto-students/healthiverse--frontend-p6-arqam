const OrderSummary = ({ items }) => {

    return (

        <>
            {items.map(item => {
                return (
                    <p className="border-b mt-2 flex justify-between">
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

export default OrderSummary;