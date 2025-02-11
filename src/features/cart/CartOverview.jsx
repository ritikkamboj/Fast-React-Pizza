import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { getCartQuantity, getTotalCartPrice } from './userCart';
import { formatCurrency } from '../../utilities/helpers';

function CartOverview() {
  const numOfItems = useSelector(getCartQuantity);
  const totalPrice = useSelector(getTotalCartPrice);

  if (!totalPrice) {
    return null;
  }
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{numOfItems} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
