import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import store from '../../store'
import { deleteCart } from "../cart/cartSlice";
import { fetchAddress, saveOrdersID } from "../user/userSlice";


const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);



const CreateOrder = () => {
  // const [withPriority, setWithPriority] = useState(false);
  const { username, address, error, status } = useSelector(state => state.user)
  const cartList = useSelector(state => state.cart.cartList)
  const formErrors = useActionData()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const isLoading = status === 'loading'
  const dispatch = useDispatch()


  function handleGetPosition(e) {
    e.preventDefault()
    dispatch(fetchAddress())
  }


  return (
    <div className="my-5">
      <h2 className="px-4 italic text-sm font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="my-6">
          <input type="text" defaultValue={username} name="customer" placeholder="name" className="customeInput" required />
        </div>

        <div className="my-4">
          <input type="tel" name="phone" placeholder="phone" className="customeInput" required />
          {formErrors?.phone && <p className="px-4 text-red-600">{formErrors.phone}</p>}
        </div>

        <div className="my-4 flex items-baseline justify-between space-x-2">
          <div className="grow">
            <input type="text" name="address" defaultValue={address} placeholder="address" className="customeInput" required />
            {error ? <p className="px-4 text-red-600">{error}</p> : null}
          </div>
          <button
            onClick={handleGetPosition}
            className="button px-4 py-2"
            disabled={isLoading}
          >
            {isLoading ? 'loading' : 'get position'}
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center mb-3 gap-x-2">
            <input
              type="checkbox"
              name="priority"
              id="priority"
              className="h-4 w-4 accent-yellow-400 outline-none focus:outline-none"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
            />
            <label htmlFor="priority">Want to yo give your order priority?</label>
          </div>
          <input type="hidden" name="cart" value={JSON.stringify(cartList)} />
          <Button disabled={isSubmitting || isLoading} size="medium">
            {isSubmitting ? "is submitting" : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}


export async function createOrderAction({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const newOrder = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on'
  }

  //error handling
  const errors = {}
  if (!isValidPhone(newOrder.phone)) errors.phone = 'please enter a valid phone number...'
  if (Object.keys(errors).length > 0) return errors

  const order = await createOrder(newOrder) //got back the order to use its ID for redirect
  store.dispatch(deleteCart())  //forced to import store directly because dispatch is not allowed in a normal function
  store.dispatch(saveOrdersID(order.id))

  return redirect(`/order/${order.id}`)
  //we can not use useNavigate. because it is a hook.instead we use redirect here.
}


export default CreateOrder;
