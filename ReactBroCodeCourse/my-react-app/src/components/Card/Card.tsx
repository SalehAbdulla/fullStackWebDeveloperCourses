import "./card.css";

const Card = () => {
  return (
    <>
      <div className="card">
        <img
          className="card-img"
          alt="profile-img"
          src="https://picsum.photos/150"
        ></img>
        <h2 className="card-header">Saleh ProCoder</h2>
        <p className="card-para">I'm Learning React</p>
      </div>
    </>
  );
};

export default Card;
