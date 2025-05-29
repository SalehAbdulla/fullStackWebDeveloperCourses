
type ComponentTwoProp = {
    count: number;
    onClickHandler: () => void;
}


const ComponentOne = ({count, onClickHandler}: ComponentTwoProp) => {
  return (
    <div>
      <p>{count}</p>
      <button onClick={onClickHandler}>Increment</button>
    </div>
  )
}

export default ComponentOne
