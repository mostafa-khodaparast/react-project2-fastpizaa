import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from "../cart/cartSlice";


const MenuItem = ({ pizza }) => {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch()
  const isAdded = useSelector(state => state.cart.cartList.find(item => item.pizzaId === id)?.quantity) > 0
  

  function handleAddItem() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    }
    dispatch(addItem(newItem))
  }

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`} />
      <div className="flex flex-col grow">
        <p className="font-medium">{name}</p>
        <p className="text-stone-500 italic capitalize text-sm">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {soldOut ?
            <p className="text-sm font-semibold uppercase text-stone-500">Sold out</p>
            :
            <>
              <p className="text-sm font-semibold">{formatCurrency(unitPrice)}</p>
              <button className='button' disabled={isAdded} onClick={handleAddItem}>{isAdded ? 'added' : 'add to cart'}</button>
            </>
          }

        </div>
      </div>
    </li>
  );
}

export default MenuItem;
