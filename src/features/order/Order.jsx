import { calcMinutesLeft, formatCurrency, formatDate } from "../../utils/helpers";
import { getOrder } from "../../services/apiRestaurant";
import { useLoaderData } from "react-router-dom";
import OrderItem from "./OrderItem";
import { useDispatch } from "react-redux";
import Button from "../../ui/Button";


//we can not use useParams in this function.Because it is not a component
//and hooks are only used in component. Instead we use {params}
export async function orderLoader({ params }) {
  const order = await getOrder(params.orderId)
  return order
}

const Order = () => {
  const order = useLoaderData()

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  
  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{id} Status</h2>
        <div className="space-x-2 space-y-1 flex flex-col  sm:flex sm:flex-row ">
          {priority && <span className="bg-red-500 tracking-wider text-stone-300 py-1 px-2 text-center sm:p-3 rounded-full">Priority</span>}
          <span className="bg-green-500  tracking-wider text-stone-300 py-1 px-2 text-center sm:p-3 rounded-full">{status} order</span>
        </div>
      </div>

      <div className="bg-stone-300 p-4">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul className="divide-y-2 divide-stone-300">
        {cart.map(item => <OrderItem item={item} key={item.pizzaId} />)}
      </ul>

      <div className="bg-stone-300 p-4">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-semibold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      <div className="flex justify-center my-4">
      <Button to='/menu' size='medium'>back to menu</Button>
      </div>
    </div>
  );
}

export default Order;
