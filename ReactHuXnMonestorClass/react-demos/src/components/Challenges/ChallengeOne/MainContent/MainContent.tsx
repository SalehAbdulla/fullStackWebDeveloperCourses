import "./MainContext.css";
import { Link } from "react-router-dom";

const MainContent = () => {
  return (
    <main>
      <h2>Main Content</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea,
        consequuntur iste! Est ab optio nemo sequi mollitia eaque excepturi
        repudiandae ipsum quos at dolor officiis omnis veritatis neque quam
        harum, obcaecati esse eveniet deserunt eos modi veniam. Esse impedit
        possimus distinctio unde alias blanditiis voluptas repellat nam, earum,
        officiis itaque consequuntur ad pariatur. Sunt dolor voluptatem magnam
        labore esse incidunt, inventore nemo, veritatis debitis omnis, libero
        est at quas eveniet natus vero veniam quam. Illo corrupti quidem
        excepturi nam incidunt quia, ullam sint cumque, accusantium hic tempora
        repellendus? Illum quod ex reprehenderit quidem dolor incidunt iure amet
        placeat cumque voluptatibus!
      </p>
      <div className="winning">
        <div className="react-challenges">
          <h1>React Challenges</h1>
          <ol>
            <li>
              <Link to="/welcome">Challenge Two -- Welcome App</Link>
            </li>
            <li>
              <Link to="/challengeThree">
                Challenge Three -- Simple JSXRule
              </Link>
            </li>

            <li>
              <Link to="/challengefour">Challenge Four -- Simple JSXRule</Link>
            </li>

            <li>
              <Link to="/challengeFive">Challenge Five -- Map Loop</Link>
            </li>

            <li>
              <Link to="/challengesix">Challenge Six -- Passing Props</Link>
            </li>
          </ol>
        </div>

        <div className="react-lessons">
          <h1>React lessons</h1>
          <ol>
            <li>
              <Link to={"/lessonOne"}>Lesson One</Link>
            </li>
            <li>
              <Link to={"/lessontwo"}>Lesson Two</Link>
            </li>

            <li>
              <Link to={"/lessonthree"}>Lesson Three</Link>
            </li>

            <li>
              <Link to={"/lessonFour"}>Lesson Four</Link>
            </li>

            <li>
              <Link to={"/lessonFive"}>Lesson Five</Link>
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
