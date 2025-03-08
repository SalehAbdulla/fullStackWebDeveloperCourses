import React from "react";
import './componentsStyles/styles.css';

const Footer = ()=>{
    return (
        <>
            <div className="footer">
                <p>©️ Copyright {new Date().getFullYear()} </p>
            </div>
        </>
    );
};

export default Footer;