import { Link } from "react-router-dom";
import Screenshot from "./images/Screenshot.jpg";
import Screenshot2 from "./images/Screenshot2.jpg";

// Parent
const ChallengeSix = () => {
  return (
    <div>
      <Person name="Saleh" age={26} />

      <Product name="Ipad" price={10000}>
        <h1>This is a test of passing a children tags</h1>
      </Product>

      <hr />
      <Link to={"/"}>Home</Link>
    </div>
  );
};

//Child
type PersonProp = {
  name: string;
  age: number;
};

const Person = ({ name, age }: PersonProp) => {
  return (
    <>
      <h1>My name is: {name}</h1>
      <h1>My Age is: {age}</h1>
      {/* <Product name="Iphone 19" price={999.9} /> */}
    </>
  );
};

type ProductProp = {
  name: string;
  price: number;
  children?: React.ReactNode;
};

const Product = ({ name, price, children }: ProductProp) => {
  return (
    <div>
      <h1>{name}</h1>
      <h1>{price}</h1>
      {children && <h1>{children}</h1>}
      <img src={Screenshot} alt="Picture-notes" />
      <img src={Screenshot2} alt="Picture-notes" />
      <p>Passing a children within the tags. </p>
      <h1>
        <ul>
          <li>
            children?: React.ReactNode -- makes it optional with approprate type
          </li>
          <li>Render the children inside directly</li>
          <li>Render safely using ternary operator</li>
        </ul>
      </h1>
    </div>
  );
};

export default ChallengeSix;
