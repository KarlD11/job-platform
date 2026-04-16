import { useState, useCallback } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false); // Changed from null to false
  const [error, setError] = useState(null);

  const fn = useCallback(async (token, ...args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(token, {}, ...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [cb]);

  return { data, loading, error, fn };
};

export default useFetch;