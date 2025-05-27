import "./ProductList";
import ProductList from "./ProductList";
import { Link } from "react-router-dom";

const ChallengeFive = () => {
  const users = [
    { id: 1, name: "Saleh", age: 26 },
    { id: 2, name: "Alice", age: 25 },
    { id: 3, name: "Bob", age: 30 },
    { id: 4, name: "Charlie", age: 22 },
  ];

  return (
    <div>
      <h1>UserList</h1>
      <ol>
        {users.map(({ name, age }, index) => (
            <li key={index}>{name} | {age}</li>
        ))}
      </ol>

      <hr/>
      <h1>Product List</h1>
      <ProductList />

      <hr/>

      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default ChallengeFive;
