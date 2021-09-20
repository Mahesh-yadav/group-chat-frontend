import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

export const useUserGroups = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    async function loadGroups() {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setUserGroups([]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/users/${user.uid}/groups`, {
          headers: {
            AuthToken: await user.getIdToken(),
          },
        });
        if (response.ok) {
          const data = await response.json();
          setIsLoading(false);
          setUserGroups(data);
        } else {
          throw new Error('Unable to fetch data');
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setUserGroups([]);
      }
    }

    loadGroups();
  }, []);

  return { isLoading, userGroups };
};
