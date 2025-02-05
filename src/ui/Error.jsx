import { useNavigate, useRouteError } from 'react-router-dom';
import React from 'react';
import LinkButton from './LinkButton';
function Error() {
  const navigate = useNavigate();
  const err = useRouteError();
  console.log(err);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{err.data}</p>
      <p>{err.message}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
