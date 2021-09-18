import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import Spinner from '../UI/Spinner';

export default function PrivateRoute({
  isLoggedIn,
  isLoading,
  children,
  ...rest
}) {
  const location = useLocation();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Route {...rest}>
      {isLoggedIn ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/sign-in',
            state: {
              from: location,
            },
          }}
        />
      )}
    </Route>
  );
}
