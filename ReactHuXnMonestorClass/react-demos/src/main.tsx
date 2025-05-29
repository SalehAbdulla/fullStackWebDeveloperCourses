import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import LessonOne from "./components/Lessons/LessonOne/LessonOne";
import WelcomeMessage from "./components/Challenges/ChallengeTwo/WelcomeMessage/WelcomeMessage";
import JsxRule from "./components/Challenges/ChallengeThree/JsxRule";
import LessonTwo from "./components/Lessons/LessonTwo/LessonTwo";
import ChallengeFour from "./components/Challenges/ChallengeFour/ChallengeFour";
import Lessonthree from "./components/Lessons/LessonThree/Lessonthree";
import ChallengeFive from "./components/Challenges/ChallengeFive/ChallengeFive";
import LessonFour from "./components/Lessons/LessonFour/LessonFour";
import ChallengeSix from "./components/Challenges/ChallengeSix/ChallengeSix";
import LessonFive, { Cart } from "./components/Lessons/LessonFive/LessonFive";
import ChallengeSeven from "./components/Challenges/ChallengeSeven/ChallengeSeven";
import UserStatus from "./components/Challenges/ChallengeSeven/UserStatus";
import ChallengeSevenGreeting from "./components/Challenges/ChallengeSeven/ChallengeSevenGreeting/ChallengeSevenGreeting";
import LessonSix from "./components/Lessons/LessonSix/LessonSix";
import ChallengeEight from "./components/Challenges/ChallengeEight/ChallengeEight";
import LessonSeven from "./components/Lessons/LessonSeven/LessonSeven";
import LessonEight from "./components/Lessons/LessonEight/LessonEight";
import HandleUpdateComponent from "./components/Lessons/LessonEight/HandleUpdateComponent";
import CrudApp from "./components/Lessons/LessonNine/CrudApp";
import CrudPractice from "./components/Lessons/LessonNine/CrudPractice";
import LessonEleven from "./components/Lessons/LessonEleven/LessonEleven";
import LessonTwelve from "./components/Lessons/LessonTwelve/LessonTwelve";
import LessonThirteen from "./components/Lessons/LessonThirteen/LessonThirteen";
import LessonFourteen from "./components/Lessons/LessonFourteen/LessonFourteen";
import LessonFifteen from "./components/Lessons/LessonFifteen/LessonFifteen";
import ChallengeNine from "./components/Challenges/ChallengeNine/ChallengeNine";
import ChallengeTen from "./components/Challenges/ChallengeTen/ChallengeTen";
import LessonSixteen from "./components/Lessons/LessonSixteen/LessonSixteen";
import LessonSixteenCopy from "./components/Lessons/LessonSixteenCopy/LessonSixteenCopy";
import LessonSeventeen from "./components/Lessons/LessonSeventeen/LessonSeventeen";
import LessonEighteen from "./components/Lessons/LessonEighteen/LessonEighteen";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/welcome", element: <WelcomeMessage /> },
  { path: "*", element: <NotFoundPage /> },
  { path: "/lessonOne", element: <LessonOne /> },
  { path: "/challengeThree", element: <JsxRule /> },
  { path: "/lessonTwo", element: <LessonTwo /> },
  { path: "/challengeFour", element: <ChallengeFour /> },
  { path: "/lessonThree", element: <Lessonthree /> },
  { path: "/challengeFive", element: <ChallengeFive /> },
  { path: "/lessonFour", element: <LessonFour /> },
  { path: "/challengeSix", element: <ChallengeSix /> },
  { path: "/lessonFive", element: <LessonFive /> },
  { path: "/cart", element: <Cart /> },
  { path: "/challengeSeven", element: <ChallengeSeven temp={40} /> },
  {
    path: "/UserStatus",
    element: <UserStatus isLoggedIn={true} isAdmin={true} />,
  },
  {
    path: "/challengeSevenGreeting",
    element: <ChallengeSevenGreeting timeOfDay="morning" />,
  },
  { path: "/lessonsix", element: <LessonSix /> },
  { path: "/challengeEight", element: <ChallengeEight /> },
  { path: "/lessonseven", element: <LessonSeven /> },
  { path: "/lessoneight", element: <LessonEight /> },
  { path: "/handleupdatecomponent", element: <HandleUpdateComponent /> },
  { path: "/fullcrud", element: <HandleUpdateComponent /> },
  { path: "/fullcrud2", element: <CrudApp /> },
  { path: "/crudpractice", element: <CrudPractice/> },
  { path: "/moviesApp", element: <LessonEleven/> },
  { path: "/stateWithObject", element: <LessonTwelve/> },
  { path: "/stateWithComponent", element: <LessonThirteen/> },
  { path: "/stateWithExamples", element: <LessonFourteen/> },
  { path: "/statelocalStorage", element: <LessonFifteen/> },
  { path: "/challengeNine", element: <ChallengeNine/> },
  { path: "/challengeTen", element: <ChallengeTen/>},
  { path: "/portal", element: <LessonSixteen/>},
  { path: "/CopyClipboard", element: <LessonSixteenCopy/> },
  { path: "/useEffectHook", element: <LessonSeventeen/> },
  { path: "/useEffectFetchingData", element: <LessonEighteen/>},

]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
