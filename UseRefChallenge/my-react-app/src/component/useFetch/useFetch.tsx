import { useEffect } from "react";

type useFetchType = {
  url: string;
}

type DataType = {
  userId :number;
  id: number;
  title: string;
  completed: boolean; 
}

const useFetch = ({url}: useFetchType):DataType=> {

  const [data, setData] = useState<DataType>([]);

  useEffect(()=> {
    async function fetchData(url) {
      const response = await fetch(url);
      const result = response.json();
      return result;
    }
  },[])


  return fetchData();
}

export default useFetch
