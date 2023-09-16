import { Outlet, useNavigation } from "react-router-dom"
import Header from "./Header"
import CartOverview from "../features/cart/CartOverview"
import Isloading from "./Isloading"

const Layout = () => {
    const navigation = useNavigation()
    const isLoading = navigation.state === 'loading'
    return (
        <div className="grid grid-rows-[auto_1fr_auto] h-screen">
            <Header />
            <div className="overflow-y-scroll">
                {isLoading && <Isloading />}
                <main className="mx-auto max-w-3xl">
                    <Outlet />
                </main>
            </div>
            <CartOverview />
        </div>
    )
}

export default Layout