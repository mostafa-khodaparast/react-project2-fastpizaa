import { Link, useNavigate } from "react-router-dom"
import SearchBar from "../features/order/SearchBar"
import Username from "../features/user/Username"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../features/user/userSlice"
import { deleteCart } from "../features/cart/cartSlice"
import UserOrdersID from "../features/user/userOrdersID"
import Button from "./Button"

const Header = () => {
    const signedIn = useSelector(state => state.user.isSignedIn)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogOut() {
        dispatch(logout())
        dispatch(deleteCart())
        navigate('/')
    }

    return (
        <header className="bg-yellow-400 px-4 py-3 border-b-2 border-stone-200 flex items-center justify-between">
            <div>
                <Link to='/' className="uppercase tracking-widest hover:text-stone-400">fast pizza</Link>
                <Username />
            </div>
            <div className="flex items-center space-x-2">
                {signedIn ?
                    <>
                        <Link
                            to='/userOrders'
                            className="button bg-green-500 text-sm text-stone-300 px-3 py-2 hover:bg-green-300 text-stone-600">
                            your orders
                        </Link>
                        <button onClick={handleLogOut} className="logout text-sm">log out</button>
                    </>
                    :
                    null
                }
            </div>
        </header>
    )
}

export default Header