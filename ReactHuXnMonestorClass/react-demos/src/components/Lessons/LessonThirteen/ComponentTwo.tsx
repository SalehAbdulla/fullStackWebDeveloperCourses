
type ComponentTwoProp = {
    count: number;
    onClickHandler: () => void;
}

const ComponentTwo = ({ count, onClickHandler }: ComponentTwoProp) => {
  return (
    <div>
      <p>{count}</p>
      <button onClick={onClickHandler}>Increment</button>
    </div>
  );
};

export default ComponentTwo;
