import "./SmileButton.css";

const SmileButton = () => {
  function click() {
    console.log("OUCH!");
  }

  function click2(name: string) {
    console.log(`${name} please stop clicking me, it hurts 👀`);
  }

  let count = 0;

  function click3(name: string) {
    if (count < 3) {
      console.log(`You have clicked me ${count} time/s`);
      count++;
    } else {
      console.log(`${name} please stop clicking me, it hurts 👀`);
      count++;
    }
  }


  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        const button = event.currentTarget;
        button.innerText = "OUCH!";
  }


  return (
    <>
      <button className="button" onClick={click}>
        Click Me
      </button>
      <button className="button" onClick={() => click2("Saleh")}>
        Click Me 2
      </button>
      <button className="button" onClick={() => click3("Saleh")}>
        Click Me 3
      </button>

      <button className="button" onClick={(event) => handleClick(event)}>
        Click Me 4
      </button>
    </>
  );
};

export default SmileButton;
