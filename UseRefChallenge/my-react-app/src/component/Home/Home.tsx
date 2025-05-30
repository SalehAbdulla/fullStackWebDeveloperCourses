import { useEffect, useState } from "react"

type DataType = {
  useId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Home = () => {

  const [data, setData] = useState<DataType[]>();

  useEffect(()=> {
    const fetchData = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const result = await response.json();
      setData(result);
    }

    fetchData();

  }, []);


  return (
    <div>
      {(data && data.length) && data.map((element, index) => <section key={index}>
        <h1>{element.title}</h1>
      </section>)}
    </div>
  )
}

export default Home
