import React from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { decreaseItemQuantitie, increaseItemQuantitie } from './userCart';

function UpdateItemQuantity({ id, currQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button type="round" onClick={() => dispatch(decreaseItemQuantitie(id))}>
        -
      </Button>
      <span className="text-sm font-medium">{currQuantity}</span>
      <Button type="round" onClick={() => dispatch(increaseItemQuantitie(id))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
