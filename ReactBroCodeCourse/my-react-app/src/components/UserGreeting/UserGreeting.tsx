import "./UserGreeting.css";

type Props = {
    isLoggedIn? : boolean,
    username? : string
}

const UserGreeting = ({isLoggedIn = false, username = "Guest"}: Props) => {

    const welcomeMessage = <h2 className="welcome-message" >Welcome {username}</h2>;
    const promptMessage = <h2 className="login-prompt">Please Sign in</h2>;
    return ((isLoggedIn) ?  welcomeMessage: promptMessage);

};

export default UserGreeting;
