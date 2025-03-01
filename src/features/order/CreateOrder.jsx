import React from 'react';
import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/userCart';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store/store';
import { formatCurrency } from '../../utilities/helpers';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  // console.log(withPriority);

  const username = useSelector((state) => state.user.username);

  const navigation = useNavigation();
  console.log(navigation);

  const formErrors = useActionData();

  const isSubmitting = navigation.state === 'submitting';

  // const cart = fakeCart;

  const cart = useSelector(getCart);
  console.log(cart);
  const TotalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? TotalCartPrice * 0.2 : 0;
  const totalPrice = TotalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col items-center gap-2 sm:flex-row">
          <label className="sm:basis-40">First Name</label>
          {/* <input type="text" name="customer" required className="input" /> */}
          <div className="grow">
            <input
              className="input"
              type="text"
              name="customer"
              required
              defaultValue={username}
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col items-center gap-2 sm:flex-row">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-200 p-2 text-sm text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col items-center gap-2 sm:flex-row">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input" type="text" name="address" required />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? 'Placing Order...'
              : `Place Order from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  console.log(formData);
  const data = Object.fromEntries(formData);
  console.log(data);
  const cart = JSON.parse(data.cart).map((item) => ({
    pizzaId: item.id,
    quantity: item.numOfItems,
    // Include other fields if required by the API
    name: item.name,
    unitPrice: item.unitPrice,
    totalPrice: item.totalPrice,
  }));
  const order = {
    ...data,
    cart,
    priority: data.priority === 'true',
  };

  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please Provide us right phone number. As it needs to contact you';

  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  console.log(newOrder);

  //below code is kind of hack try to avoid it
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
