
function Button() {

  const style = {
    display: "block",
    backgroundColor: "hsl(200, 100%, 50%)",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    width: "100px",
    height: "50px",
  }

  return <button style={style}>Click Me</button>;
}

export default Button;
