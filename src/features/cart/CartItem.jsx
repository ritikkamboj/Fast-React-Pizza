import Button from '../../ui/Button';
import { formatCurrency } from '../../utilities/helpers';
import React from 'react';
import DeleteItem from './DeleteItem';
import UpdateItemQuantity from './updateItemQuantity';
import { getCurrentQuanityById } from './userCart';
import { useSelector } from 'react-redux';

function CartItem({ item }) {
  const { id, name, numOfItems, totalPrice } = item;

  const currQuantity = useSelector(getCurrentQuanityById(id));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {numOfItems}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p>{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity id={id} currQuantity={currQuantity} />
        <DeleteItem id={id} />
      </div>
    </li>
  );
}

export default CartItem;
