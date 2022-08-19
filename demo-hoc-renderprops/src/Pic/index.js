import React from "react";
import pic from "../assets/pic.jpeg";

const Pic = (props) => {
    const mouseLoc = props.mouseLoc;
    
    return (
        <React.Fragment>
            <img src={pic} alt="canvas"/>
            <p>Mouse position: x: {mouseLoc.x}, y:{mouseLoc.y}</p>
        </React.Fragment>
    );
};

export default Pic;