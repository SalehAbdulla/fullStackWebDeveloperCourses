import {Link} from "react-router-dom";

const LessonTwo = () => {
    
  const myName = "Saleh";
  const multiply = (a:number, b:number) => {
    return a * b;
  };

  const specialClass = "simple-class";

  return (
    <section>
      <h1>{myName}</h1>
      <p>2 + 2 = {2 + 2}</p>
      <p>2 * 2 = {multiply(2, 2)}</p>


    <p className={specialClass} >This is special class</p>

    <Link to={'/'}>Home</Link>

    </section>
  );
};

export default LessonTwo;
