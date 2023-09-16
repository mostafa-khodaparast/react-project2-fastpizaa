import { useSelector } from "react-redux"

const Username = () => {
    const userName = useSelector(state => state.user.username)

    return <div className="text-sm font-semibold md:text-xl">
        {userName}
    </div>
}

export default Username