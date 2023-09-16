import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"

import Home from "./ui/Home"
import Menu, { menuLoader } from "./features/menu/Menu"
import Cart from "./features/cart/Cart"
import CreateOrder, { createOrderAction } from "./features/order/CreateOrder"
import Order, { orderLoader } from "./features/order/Order"
import Layout from "./ui/Layout"
import NotFound from "./ui/NotFound"
import UserOrdersID from "./features/user/userOrdersID"


const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />} errorElement={<NotFound />}>
    <Route path="/" element={<Home />} />,
    <Route path="menu" element={<Menu />} loader={menuLoader} />,
    <Route path="/cart" element={<Cart />} />,
    <Route path="/order/new" element={<CreateOrder />} action={createOrderAction} />,
    <Route path="/order/:orderId" element={<Order />} loader={orderLoader} />
    <Route path="/userOrders" element={<UserOrdersID />} />
  </Route>
))


const App = () => {
  return (
    <RouterProvider router={router} />
  )


}

export default App