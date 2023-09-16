import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const numOfPizzas = useSelector(state => state.cart.cartList.reduce((sum, item) => sum + item.quantity, 0))
  const totalPrice = useSelector(state => state.cart.cartList.reduce((sum, item) => sum + item.totalPrice, 0))

  if(!numOfPizzas) return null

  return (
    <div className="bg-stone-800 text-stone-200 p-4 flex items-center justify-between">
      <p className="space-x-3 md:space-x-8">
        <span>{numOfPizzas} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
