import { Link } from "react-router-dom";

type UserStatesProp = {
  isLoggedIn: boolean;
  isAdmin: boolean;
};

const UserStatus = ({ isLoggedIn, isAdmin }: UserStatesProp) => {
  const UserStatus = () => {
    return isLoggedIn && isAdmin ? (
      <>
        <h1>Welcome Admin</h1>
        <Link to={"/"}>Back Home</Link>
      </>
    ) : (
      <>
        <h1>Welcome User</h1>
        <Link to={"/"}>Back Home</Link>
      </>
    );
  };

  return (
    <div>
      <h1>{UserStatus()}</h1>
    </div>
  );
};

export default UserStatus;
