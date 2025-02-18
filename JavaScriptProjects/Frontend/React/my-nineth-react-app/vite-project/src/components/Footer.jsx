import React from "react";
import './styles/footer.css';

const Footer = () => {


  function getYear() {
    return new Date().getFullYear(); 
  }

  const currentYear = getYear();

  return (
    <div className="footer">
      <footer>
        <p>©️ copyright {currentYear} </p>
      </footer>
    </div>
  );
};

export default Footer;
