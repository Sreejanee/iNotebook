
import React, { useContext } from 'react'
import noteContext from './context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
const Notes = () => {
  const context = useContext(noteContext);
  const { notes} = context;
  return (
    <div>
      <AddNote/>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note}/>;//passing the note as prop to the note item
        })}
      </div>
    </div>
  )
}

export default Notes
