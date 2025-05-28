import "./ChallengeEight.css";
import { FaBeer } from "react-icons/fa";
import {Link} from "react-router-dom";

const ProfileCard = () => {
  const styles = {
    backgroundColor: "lightgray",
    padding: "15px",
    borderRadius: "8px",
    margin: "30px",
  };

  return (
    <section style={styles} className="profile-wrapper">
      <div className="inner-profile-wrapper">
        <h1>Header</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam
          earum est vitae eos libero consequatur perferendis impedit reiciendis
          alias reprehenderit!
        </p>
      </div>
    </section>
  );
};

const IconComponent = () => {
  return (
    <>
      <FaBeer style={{marginLeft: "12"}} />
    </>
  );
};

const ChallengeEight = () => {
  return (
    <>
      <div className="challengeeight-wrapper">
        <div className="smashing-class">
          <h1>Hello MEE</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem
            officia fuga fugiat. Voluptatem modi accusantium quam quisquam
            debitis vel qui.
          </p>
        </div>
      </div>
      <ProfileCard />
      <div style={{display: "flex", justifyContent: "center" ,fontSize: "100px", color: "gold", margin: "30px"}}>
        <Link to={"/"}>Back To Home</Link>
        
        <IconComponent />

      </div>
    </>
  );
};

export default ChallengeEight;
