import React, { useState } from "react"
import AddIcon from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab'
import Zoom from '@mui/material/Zoom'
import axios from "axios"

const client = axios.create({
  baseURL: "http://localhost:8000/notes"
})

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [isExpanded, setExpanded] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  ////////  DATA ADDITION BY PARENT  /////////////
  function submitNote(event) {
    event.preventDefault();
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
  }

  ////////  ADD DATA IMMEDIATELY  /////////////
  // function submitNote(event) {
  //   event.preventDefault();
  //   client.post('', {
  //     title: note.title,
  //     content: note.content
  //   })
  //   .then(res => {
  //       console.log(res.data)
  //     })
  //   .catch(err => {
  //       console.log(err)
  //     })
  //   setNote({
  //     title: "",
  //     content: ""
  //   });
  // }

  function inputClickHandler() {
    setExpanded(true) 
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />}
        <textarea
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
          onClick={inputClickHandler}
          onChange={handleChange}
          value={note.content}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon 
            />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
