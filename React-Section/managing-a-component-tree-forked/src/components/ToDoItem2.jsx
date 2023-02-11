import React from "react";

function ToDoItem2(props) {

    return (
        <div onClick={ () => {
            props.onChecked(props.id)
        }}>
            <li >{props.todoItem}</li>
        </div>
    )
}

export default ToDoItem2