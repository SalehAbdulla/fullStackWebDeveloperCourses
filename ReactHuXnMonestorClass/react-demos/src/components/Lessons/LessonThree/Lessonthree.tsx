import { Link } from "react-router-dom";

const Lessonthree = () => {
  const userInfo = [
    {
      username: "Saleh",
      email: "Test@gmail.com",
      location: "BH",
    },
    {
      username: "John",
      email: "John@gmail.com",
      location: "SA",
    },
    {
      username: "ALEX",
      email: "ALEX@gmail.com",
      location: "UAE",
    },
    {
      username: "JORDAN",
      email: "JORDAN@gmail.com",
      location: "QA",
    },
  ];

  return (
    <main>
      {userInfo.map(({username, email, location}, index) => (
        <ul key={index}>
          <li>{username}</li>
          <li>{email}</li>
          <li>{location}</li>
        </ul>
      ))}


      <Link to={"/"}>Home</Link>
    </main>
  );
};

export default Lessonthree;
