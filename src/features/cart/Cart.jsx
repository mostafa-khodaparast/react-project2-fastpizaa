import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart } from './cartSlice';
import EmptyCart from './EmptyCart';


const Cart = () => {
  const userName = useSelector(state => state.user.username)
  const cartList = useSelector(state => state.cart.cartList)
  const dispatch = useDispatch()

  if(cartList.length == 0) return <EmptyCart />

  return (
    <div className='mt-4 ml-4'>
      <Link to="/menu" className='text-sm text-blue-500 hover:text-blue-600'>&larr; Back to menu</Link>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {userName}</h2>
      <ul className='mt-3 divide-y divide-stone-300 border-b border-stone-300'>
        {cartList.map(item => <CartItem item={item} key={item.pizzaId} />)}
      </ul>
      <div className='mt-6 space-x-4'>
        <Button to="/order/new" size="medium">Order pizzas</Button>
        <Button size="delete" onClick={() => dispatch(deleteCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
