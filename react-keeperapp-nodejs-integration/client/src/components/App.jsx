import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios"

const client = axios.create({
  baseURL: "http://localhost:8000/notes"
})

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/notes`)
    .then((res) => res.json())
    .then((data) => setNotes(data))
  })

  function createNote(noteItem, index) {
    return (
      <Note
        key={index}
        id={noteItem._id}
        title={noteItem.title}
        content={noteItem.content}
        onDelete={deleteNote}
      />
    );
  }

  ///////////  ADD USING FETCH //////////////
  // function addNote(newNote) {
  //   fetch('http://localhost:8000/notes', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(newNote),
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log('Success:', data);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
  // }

  //////////////// USING AXIOS //////////////////
  function addNote(newNote) {
    try {
      client.post('', newNote)
    } catch(e) {
      console.log(e)
    }
  }
    
  function deleteNote(id) {
    client.delete(`/${id}`)
    .then((res) => alert(res.data.message))
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map(createNote)}
      <Footer />
    </div>
  );
}

export default App;
