import {Link} from "react-router-dom";

// Parent
const LessonFour = () => {
  return (
    <UserChild
      img="https://picsum.photos/200/300"
      name="Saleh"
      age={22}
      hobbies={["Coding", "Reading", "Learning"]}
      isMarried={true}
    />
  );
};

type Props = {
  name: string;
  img: string;
  age: number;
  hobbies: string[];
  isMarried: boolean;
};

// Child
const UserChild = ({ name, img, age, hobbies, isMarried }: Props) => {
  return (
    <div>
        
      <img width={"200px"} height={"100px"} src={img} alt="picture" />
      <h1>{name}</h1>
      <h1>{age}</h1>
      <h1>
        Hobbies{" "}
        {hobbies.map((element, index) => (
          <li key={index}>{element}</li>
        ))}
      </h1>
      <h2>isMarried: {isMarried ? "yes" : "No"}</h2>

      <hr/>
      <Link to={"/"}>Home</Link>

    </div>
  );
};

export default LessonFour;
