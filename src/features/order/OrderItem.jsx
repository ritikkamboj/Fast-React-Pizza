import { formatCurrency } from '../../utilities/helpers';
import React from 'react';

function OrderItem({ item, isLoadingIngredients, ingredients = [] }) {
  const { quantity, name, totalPrice } = item;
  console.log(ingredients.join(', '));

  return (
    <li className="py-3">
      <div className="flex items-center justify-between text-sm">
        <p className="font-bold">
          <span>{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="">
        {isLoadingIngredients ? 'Loading...' : ingredients.join(',')}
      </p>
    </li>
  );
}

export default OrderItem;
