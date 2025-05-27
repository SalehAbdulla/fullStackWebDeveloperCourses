import { Link } from "react-router-dom";

export const Cart = () => {
  const items = ["Wireless Eabuds", "Power Bank", "New SSD", "Hoddie"];

  return (
    <div>
      <h1>Cart 🛒</h1>
      {items.length && (
        <h1>
          You have {items.length} items in the cart{" "}
          <ul>
            {items.map((element, index) => (
              <li key={index}>{element}</li>
            ))}
          </ul>
        </h1>
      )}
    </div>
  );
};

const ValidPassword = () => <h1>Valid Password</h1>;
const InValidPassword = () => <h1>Invalid Password</h1>;

type PassProp = {
  isValid: boolean;
};

const Password = ({ isValid }: PassProp) => {
  return isValid ? <ValidPassword /> : <InValidPassword />;
};

function LessonFive() {
  return (
    <div>
      <h1>This is an Application to learn how to use ternary operator</h1>
      <Password isValid={true} />
      <Link to={"/cart"}>Go to Cart</Link>
    </div>
  );
}

export default LessonFive;
