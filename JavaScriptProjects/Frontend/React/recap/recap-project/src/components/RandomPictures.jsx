import React from "react";

const RandomPictures = () => {

    const customStyles = {
        width: "200px",
        height: "200px",
        marginRight: "5px"
    };


    return (

        <>
            <div>
                <img style={customStyles} src="https://picsum.photos/200/300" alt="random-pic"/>
                <img style={customStyles} src="https://picsum.photos/200/300" alt="random-pic"/>
                <img style={customStyles} src="https://picsum.photos/200/300" alt="random-pic"/>
            </div>
        </>


    );
}

export default RandomPictures;