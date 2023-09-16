import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <div className='mt-4 ml-4 space-y-8'> 
      <Link to="/menu" className=' m-5 text-sm text-blue-500 hover:text-blue-600'>&larr; Back to menu</Link>

      <p className='bg-red-200 font-semibold rounded-xl text-center p-4 text-red-500'>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
