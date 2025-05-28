import "./Header.css"

const Header = () => {
  return (
    <header className="website-header">
      <h1 style={{color: "black"}} >Welcome to My WebSite</h1>
      <nav className="items">
        <a>Home</a>
        <a>About</a>
        <a>Contact</a>
      </nav>
    </header>
  );
};

export default Header;
