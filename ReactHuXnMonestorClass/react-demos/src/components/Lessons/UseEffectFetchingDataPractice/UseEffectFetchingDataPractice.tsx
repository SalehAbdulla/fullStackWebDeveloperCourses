import { useEffect, useState } from "react";

type dataProp = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const UseEffectFetchingDataPractice = () => {

  const [data, setData] = useState<dataProp[]>([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const result = await response.json();
      if (result && result.length) setData(result);
    }
    getData();
  });

  return (
    <div>
      <h1>use Effect Practice</h1>
      {data.map((element, index) => (
        <section key={index}>
          <h1>{element.title}</h1>
          <p>{element.body}</p>
        </section>
      ))}
    </div>
  );
};

export default UseEffectFetchingDataPractice;
