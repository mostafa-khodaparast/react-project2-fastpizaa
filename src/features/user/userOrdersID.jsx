import { useSelector } from "react-redux"
import SearchBar from "../order/SearchBar"
import { Link } from "react-router-dom"

const UserOrdersID = () => {
    const ordersId = useSelector(state => state.user.ordersId)

    return (
        <div className="flex flex-col justify-center items-center mt-5">
            <SearchBar />
            <ul className="pt-4">
                {ordersId.map(id =>
                    <Link to={`/order/${id}`}
                        className="font-semibold tracking-widest "
                        key={id}>
                        <li className="border-b-2 border-stone-300 pt-5 text-center">
                            {id}
                        </li>
                    </Link>)
                }
            </ul>
        </div>
    )
}


export default UserOrdersID