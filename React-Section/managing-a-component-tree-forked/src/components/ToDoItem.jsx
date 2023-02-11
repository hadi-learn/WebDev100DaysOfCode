import React, { useState } from "react";

function ToDoItem(props) {

    const [clicked, setClicked] = useState(false)

    function clickedHandler() {
        setClicked(prevValue => !prevValue)
    }

    return (
        <div>
            <li
                onClick={clickedHandler}
                style={{textDecoration: clicked? "line-through" : "none"}}
            >
            {props.todoItem}
            </li>
        </div>
    )
}

export default ToDoItem