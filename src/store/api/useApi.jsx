import { useState, useEffect } from 'react';

const useApi = (apiFunction, initialState, shouldExecuteOnMount = true) => {
  console.log('Fetching');

  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await apiFunction();
      setData(result);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shouldExecuteOnMount) {
      fetchData();
    }
  }, []);

  const refetch = () => {
    console.log('Refetching')
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useApi;