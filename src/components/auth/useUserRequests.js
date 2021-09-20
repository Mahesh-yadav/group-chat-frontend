import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

export const useUserRequests = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userGroupRequests, setUserGroupRequests] = useState([]);

  useEffect(() => {
    async function loadGroupRequests() {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setUserGroupRequests([]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/users/${user.uid}/requests`, {
          headers: {
            AuthToken: await user.getIdToken(),
          },
        });
        if (response.ok) {
          const data = await response.json();
          setIsLoading(false);
          setUserGroupRequests(data);
        } else {
          throw new Error('Unable to fetch data');
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setUserGroupRequests([]);
      }
    }

    loadGroupRequests();
  }, []);

  return { isLoading, userGroupRequests };
};
