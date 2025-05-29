import "./MainContext.css";
import { Link } from "react-router-dom";

const MainContent = () => {
  return (
    <main>
      <div className="simple-text">
        <h2 style={{ color: "black" }}>Main Content</h2>
        <br />
        <p style={{ color: "black" }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea,
          consequuntur iste! Est ab optio nemo sequi mollitia eaque excepturi
          repudiandae ipsum quos at dolor officiis omnis veritatis neque quam
          harum, obcaecati esse eveniet deserunt eos modi veniam. Esse impedit
          possimus distinctio unde alias blanditiis voluptas repellat nam,
          earum, officiis itaque consequuntur ad pariatur. Sunt dolor voluptatem
          magnam labore esse incidunt, inventore nemo, veritatis debitis omnis,
          libero est at quas eveniet natus vero veniam quam. Illo corrupti
          quidem excepturi nam incidunt quia, ullam sint cumque, accusantium hic
          tempora repellendus? Illum quod ex reprehenderit quidem dolor incidunt
          iure amet placeat cumque voluptatibus!
        </p>
      </div>

      <div className="winning">
        <div className="react-challenges">
          <h1 style={{ color: "black" }}>React Challenges</h1>
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

            <li>
              <Link to="/challengeSeven">
                Challenge Seven -- Ternary operator
              </Link>
            </li>

            <li>
              <Link to="/challengeEight">
                Challenge Eight -- Inline Styling
              </Link>
            </li>

            <li>
              <Link to="/challengeNine">
                Challenge Nine -- State Hook- Counter Saved on local Storage
              </Link>
            </li>

            <li>
              <Link to="/challengeTen">
                Challenge Ten -- State Hook - To Do List CRUD
              </Link>
            </li>

            <li>
              <Link to="/challengeEleven">
                Challenge Ten -- useEffect Challenge
              </Link>
            </li>
          </ol>
        </div>

        <div className="react-lessons">
          <h1 style={{ color: "black" }}>React lessons</h1>
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

            <li>
              <Link to={"/lessonsix"}>Lesson Six - Inline Styling</Link>
            </li>

            <li>
              <Link to={"/lessonseven"}>Lesson Seven - Event Handelers</Link>
            </li>

            <li>
              <Link to={"/lessoneight"}>Lesson Eight - State Hooks</Link>
            </li>

            <li>
              <Link to={"/fullcrud"}>Lesson Nine - State FULL CRUD</Link>
            </li>

            <li>
              <Link to={"/fullcrud2"}>Lesson TEN - State Hook 2</Link>
            </li>

            <li>
              <Link to={"/moviesApp"}>Lesson Eleven - State Hook 3</Link>
            </li>

            <li>
              <Link to={"/stateWithObject"}>Lesson Twelve - State Hook 4</Link>
            </li>

            <li>
              <Link to={"/stateWithComponent"}>
                Lesson Thirteen - State Hook 5
              </Link>
            </li>

            <li>
              <Link to={"/stateWithExamples"}>
                Lesson Fourteen - State Hook 6
              </Link>
            </li>

            <li>
              <Link to={"/statelocalStorage"}>
                Lesson Fifteen - State LocalStorage
              </Link>
            </li>

            <li>
              <Link to={"/portal"}>Lesson Sixteen - Portal</Link>
            </li>

            <li>
              <Link to={"/CopyClipboard"}>
                Lesson Sixteen2 - Make a copy Clipboard
              </Link>
            </li>

            <li>
              <Link to={"/useEffectHook"}>
                Lesson Seventeen - useEffectHook
              </Link>
            </li>

            <li>
              <Link to={"/useEffectFetchingData"}>
                Lesson Seventeen - useEffectHook - Fetching data
              </Link>
            </li>

            <li>
              <Link to={"/useEffectFetchingDataPractice"}>
                Lesson Eighteen - useEffectHook - Fetching data Practice
              </Link>
            </li>


            <li>
              <Link to={"/LessonNineteen"}>
                Lesson Nineteen - useContext()
              </Link>
            </li>

          </ol>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
