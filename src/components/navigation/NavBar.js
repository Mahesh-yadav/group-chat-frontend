import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';

export default function NavBar({ user }) {
  const history = useHistory();

  const onSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      history.push('/sign-in');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav>
      <Link to="/">
        <h1 className="app-heading">Group Chat App</h1>
      </Link>
      {user ? (
        <>
          <button className="sign-out-button" onClick={onSignOut}>
            Sign Out
          </button>
          <p className="logged-in-as space-before">Signed In as {user.email}</p>
        </>
      ) : null}
    </nav>
  );
}
