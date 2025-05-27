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
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
