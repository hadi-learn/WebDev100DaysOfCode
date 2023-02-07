import React from "react";
import Title from "./Title";
import Meaning from "./Meaning";

function Entry(props) {
    return (
        
        <div className="term">
            <Title 
                img={props.img}
                name={props.name}
            />
            <Meaning 
                meaning={props.meaning}
            />
        </div>
        
    )
}

export default Entry