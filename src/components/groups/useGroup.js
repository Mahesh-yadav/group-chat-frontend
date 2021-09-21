import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

const defaultValue = {
  owner: {},
  messages: [],
  requests: [],
};

export const useGroup = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [group, setGroup] = useState(defaultValue);

  useEffect(() => {
    async function loadData() {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setGroup(defaultValue);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(url, {
          headers: {
            AuthToken: await user.getIdToken(),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoading(false);
          setGroup(data);
        } else {
          throw new Error('Unable to fetch data');
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setGroup(defaultValue);
      }
    }

    loadData();
  }, [url]);

  return { isLoading, group, setGroup };
};
