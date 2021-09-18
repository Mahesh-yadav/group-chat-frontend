import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Spinner from '../components/UI/Spinner';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');

  const history = useHistory();
  const { state } = useLocation();

  const { from } = state || { from: { pathname: '/' } };

  const onSignIn = async () => {
    try {
      setSignInError('');

      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      history.replace(from);
    } catch (error) {
      setSignInError(error.message);
    }
  };

  return (
    <div className="full-height-page">
      <div className="centered-container  space-before">
        {signInError ? (
          <div>
            <p className="error-message">{signInError}</p>
          </div>
        ) : null}

        <input
          type="email"
          value={email}
          placeholder="Email address"
          className="full-width space-after"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          value={password}
          placeholder="Password"
          className="full-width space-after"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="full-width" onClick={onSignIn}>
          Sign In
        </button>
      </div>
    </div>
  );
}
