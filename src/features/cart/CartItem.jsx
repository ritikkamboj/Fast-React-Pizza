import Button from '../../ui/Button';
import { formatCurrency } from '../../utilities/helpers';
import React from 'react';
import DeleteItem from './DeleteItem';

function CartItem({ item }) {
  const { id, name, numOfItems, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {numOfItems}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p>{formatCurrency(totalPrice)}</p>
        <DeleteItem id={id} />
      </div>
    </li>
  );
}

export default CartItem;
