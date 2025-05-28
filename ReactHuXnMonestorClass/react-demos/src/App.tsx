import "./App.css"

import Footer from "./components/Challenges/ChallengeOne/Footer/Footer";
import Header from "./components/Challenges/ChallengeOne/Header/Header";
import MainContent from "./components/Challenges/ChallengeOne/MainContent/MainContent";

export const App = () => {
  return (
    <div className="wrapper">
      
      <section>
        <Header />
      </section>

      <main>
        <MainContent />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};
