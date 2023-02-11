import React, { useState } from "react";

function CreateArea(props) {

  const [note, setNote] = useState({
    title: "",
    content: ""
  })

  function handleChange(e) {
    const {value: newValue, name: fieldName} = e.target

    ///// USING TERNARY OPERATOR /////

    // setNote(prevValue => {
    //   return (fieldName === "title") ? {title: newValue, content: prevValue.content} : {title: prevValue.title, content: newValue}
    // })

    ///// USING SPREAD OPERATOR //////

    setNote(prevValue => {
      return {
        ...prevValue,
        [fieldName]: newValue
      }
    })
  }

  function addItem(e) {
    props.onAdd(note)
    setNote({
      title: "",
      content: ""
    })
    e.preventDefault()
  }

  return (
    <div>
      <form>
        <input 
          name="title" 
          placeholder="Title" 
          value={note.title}
          onChange={handleChange}
        />
        <textarea 
          name="content" 
          placeholder="Take a note..." 
          rows="3" 
          value={note.content}
          onChange={handleChange}
        />
        <button onClick={addItem}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
