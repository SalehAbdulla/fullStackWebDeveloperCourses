import './App.css';
import Card from "../components/Card";

const cardsInfoArray = [{
  id: 1,
  title: "Chuck Norris",
  name: "test",
  url: "https://pbs.twimg.com/profile_images/625247595825246208/X3XLea04_400x400.jpg",
},

{
  id: 2,
  title: "Chuck Norris",
  name: "test",
  url: "https://pbs.twimg.com/profile_images/625247595825246208/X3XLea04_400x400.jpg",
},

{
  id: 3,
  title: "Chuck Norris",
  name: "test",
  url: "https://pbs.twimg.com/profile_images/625247595825246208/X3XLea04_400x400.jpg",
},
];

function App() {
  return (
    <div>
      {cardsInfoArray.map(card => (<Card key={card.id} {...card}/>))}
    </div>
  );
}

export default App;
