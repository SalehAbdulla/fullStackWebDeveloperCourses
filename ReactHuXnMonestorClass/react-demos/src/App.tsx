import "./App.css";
import Footer from "./components/Challenges/ChallengeOne/Footer/Footer";
import Header from "./components/Challenges/ChallengeOne/Header/Header";
import MainContent from "./MainContent/MainContent";

import { createContext } from "react";

export const UserGlobalData = createContext<string>("");

export const App = () => {
  return (
    <div className="wrapper">

      <section>
        <Header />
      </section>

      <UserGlobalData.Provider value={"Saleh"}>
        <main>
          <MainContent />
        </main>
      </UserGlobalData.Provider>

      <footer>
        <Footer />
      </footer>
      
    </div>
  );
};
