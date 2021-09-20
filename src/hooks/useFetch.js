import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setIsLoading(false);
          setData(data);
        } else {
          throw new Error('Unable to fetch data');
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setData([]);
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, data };
};
