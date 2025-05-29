import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
type PostsProp = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const ChallengeEleven3 = () => {
  const [posts, setposts] = useState<PostsProp[]>([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const result = await response.json();
      if (result && result.length) setposts(result);
    }

    getData();
  }, []);

  return (
    <div>
      {posts.map((element, id) => ( id === 0 ?
        <section key={id}>
          <h1>{element.title}</h1>
          <p>{element.body}</p>
        </section> : null
      ))}

      <Link to={"/"}>Back to Home</Link>
    </div>
  );
};

export default ChallengeEleven3;
