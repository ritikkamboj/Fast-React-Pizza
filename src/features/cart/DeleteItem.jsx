import React from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { deleteFromCart } from './userCart';

function DeleteItem({ id }) {
  const dispatch = useDispatch();
  return (
    <Button
      type="small"
      onClick={() => {
        console.log(id);
        dispatch(deleteFromCart(id));
      }}
    >
      Delete
    </Button>
  );
}

export default DeleteItem;
