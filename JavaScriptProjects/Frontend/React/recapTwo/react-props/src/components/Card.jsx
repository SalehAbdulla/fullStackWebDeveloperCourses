import React from "react";
import './Card.css';


const Emoji = (props) => {
    return (
        <>
            <div className='emoji-box'>
                <dl>
                    <h1 className="emoji">{props.emoji}</h1>
                    <dt>{props.name}</dt>
                    <dd>
                        {props.meaning}
                    </dd>
                </dl>
            </div>
        </>
    );
};

export default Emoji;