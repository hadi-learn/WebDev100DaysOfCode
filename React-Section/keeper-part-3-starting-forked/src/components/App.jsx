import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {

  const [notes, setNotes] = useState([])

  function createNote(noteItem, index) {
    const {title, content} = noteItem
    return (
      <Note 
        key={index}
        id={index}
        title={title}
        content={content}
        onDelete={handleDelete}
      />
    )
  }

  function addItem(newNote) {
    setNotes(prevItems => {
      return [...prevItems, newNote]
    })
  }

  function handleDelete(id) {
    setNotes(prevItems => {
      return prevItems.filter((item, index) => {
        return index !== id
      })
    })
  }

  return (
    <div>
      <Header />
      <CreateArea 
        onAdd={addItem}
      />
      {notes.map(createNote)}
      <Footer />
    </div>
  );
}

export default App;
