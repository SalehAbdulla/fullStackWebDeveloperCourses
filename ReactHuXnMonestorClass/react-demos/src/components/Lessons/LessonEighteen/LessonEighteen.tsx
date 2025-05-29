import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type dataProp = {
   userId: number;
   id: number;
   title: string;
   body: string;
}


const LessonEighteen = () => {
  const [data, setData] = useState<dataProp[]>([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      if (data && data.length) setData(data);
    }

    getData();
  }, []);

  return (
    <div>
      <ul>{data.map((element, index) => <li key={index}>{element.body}</li>)}</ul>
      <Link to={"/"}>Back To Home</Link>
    </div>


  );
};

export default LessonEighteen;
