import { formatCurrency } from '../../utilities/helpers';
import React from 'react';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart, getCurrentQuanityById } from '../cart/userCart';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';
function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currQuantity = useSelector(getCurrentQuanityById(id));
  console.log(name, currQuantity);

  const isInCart = currQuantity > 0;
  function handleAddtoCart() {
    console.log(id);
    const newItem = {
      id,
      name,
      unitPrice,
      numOfItems: 1,
      totalPrice: unitPrice * 1,
    };

    dispatch(AddToCart(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium capitalize">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex gap-3 sm:gap-8">
              <UpdateItemQuantity id={id} currQuantity={currQuantity} />
              <DeleteItem id={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddtoCart}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
