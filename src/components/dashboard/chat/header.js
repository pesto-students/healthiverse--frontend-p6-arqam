import { useSelector } from "react-redux"


const Header = () => {
    const { user2 } = useSelector(state => state.chatRoom);
    return (
        <div className="chatHeader">
            <h3>{user2.name}</h3>
        </div>
    )
}

export default Header;