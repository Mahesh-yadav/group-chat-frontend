import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useUser = () => {
  const [userInfo, setUserInfo] = useState(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const isLoading = !user;

    return {
      isLoading,
      user,
    };
  });

  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, (user) => {
      setUserInfo({
        isLoading: false,
        user,
      });
    });
  }, []);

  return userInfo;
};
