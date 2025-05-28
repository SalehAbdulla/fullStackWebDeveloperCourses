import { Link } from "react-router-dom";
import "./LessonSix.css";
import { FaCartArrowDown } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";

const LessonSix = () => {
  const styles = { backgroundColor: "red", color: "white", padding: "1rem" };

  return (
    <div className="wrapper">


      <section>
        <h1 style={styles}>Inline Style</h1>
      </section>

      <main>

        <FaCartArrowDown />
        <FaComputer />

      </main>


      <div>
        <Link to={"/"}>Back To Home</Link>
      </div>

      <footer className="footer">
        © Copy Right {new Date().getFullYear()}
      </footer>

      
    </div>
  );
};

export default LessonSix;
