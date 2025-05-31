import { useState, useEffect } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState([{
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  }]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, [url]);

  return data;
};

export default useFetch;
