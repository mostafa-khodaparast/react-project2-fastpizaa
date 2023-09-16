import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { decreaseItemQuantity, deleteItem, increaseItemQuantity } from "./cartSlice";


const CartItem = ({ item }) => {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch()



  return (
    <li className='py-3'>
      <p>
        <span className="font-semibold">{quantity}&times;</span> {name}
      </p>
      <div className="flex items-center justify-between">
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
        <div className="space-x-3">
          <Button size="small" onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
          <Button size="small" onClick={() => dispatch(increaseItemQuantity(pizzaId))}>+</Button>
          <Button size="small" onClick={() => dispatch(deleteItem(pizzaId))}>Delete</Button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
