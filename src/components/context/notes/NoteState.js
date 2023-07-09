//this will provide all the states of the notes

import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const notesInitial =
        [
            {
                "_id": "64a85117a194391febba0fcf3",
                "user": "64a77ec6d37109974f7b90bc",
                "title": "My title-sree",
                "description": "First note sree",
                "tag": "Personally",
                "date": "2023-07-07T17:55:06.214Z",
                "__v": 0
            },
            {
                "_id": "64a82517a194391febba0fcf3",
                "user": "64a77ec6d37109974f7b90bc",
                "title": "My title-sree",
                "description": "First note sree",
                "tag": "Personally",
                "date": "2023-07-07T17:55:06.214Z",
                "__v": 0
            },
            {
                "_id": "64a83517a194391febba0fcf3",
                "user": "64a77ec6d37109974f7b90bc",
                "title": "My title-sree",
                "description": "First note sree",
                "tag": "Personally",
                "date": "2023-07-07T17:55:06.214Z",
                "__v": 0
            },
            {
                "_id": "64a84517a194391febba0fcf3",
                "user": "64a77ec6d37109974f7b90bc",
                "title": "My title-sree",
                "description": "First note sree",
                "tag": "Personally",
                "date": "2023-07-07T17:55:06.214Z",
                "__v": 0
            },
            {
                "_id": "64a85517a194391febba0fcf3",
                "user": "64a77ec6d37109974f7b90bc",
                "title": "My title-sree",
                "description": "First note sree",
                "tag": "Personally",
                "date": "2023-07-07T17:55:06.214Z",
                "__v": 0
            },
            {
                "_id": "64a85617a194391febba0fcf3",
                "user": "64a77ec6d37109974f7b90bc",
                "title": "My title-sree",
                "description": "First note sree",
                "tag": "Personally",
                "date": "2023-07-07T17:55:06.214Z",
                "__v": 0
            },
            {
                "_id": "64a8517a1974391febba0fcf3",
                "user": "64a77ec6d37109974f7b90bc",
                "title": "My title-sree",
                "description": "First note sree",
                "tag": "Personally",
                "date": "2023-07-07T17:55:06.214Z",
                "__v": 0
            },
            {
                "_id": "64a8517a1894391febba0fcf3",
                "user": "64a77ec6d37109974f7b90bc",
                "title": "My title-sree",
                "description": "First note sree",
                "tag": "Personally",
                "date": "2023-07-07T17:55:06.214Z",
                "__v": 0
            },
            {
                "_id": "64a8517a1943991febba0fcf3",
                "user": "64a77ec6d37109974f7b90bc",
                "title": "My title-sree",
                "description": "First note sree",
                "tag": "Personally",
                "date": "2023-07-07T17:55:06.214Z",
                "__v": 0
            },
            {
                "_id": "64a8517a194392221febba0fcf3",
                "user": "64a77ec6d37109974f7b90bc",
                "title": "My title-sree",
                "description": "First note sree",
                "tag": "Personally",
                "date": "2023-07-07T17:55:06.214Z",
                "__v": 0
            },
            {
                "_id": "64a85190194395551febba0fcf5",
                "user": "64a77ec6d37109974f7b90bc",
                "title": "My title",
                "description": "First note ",
                "tag": "Personal",
                "date": "2023-07-07T17:55:28.745Z",
                "__v": 0
            }
        ]
        const[notes,setNotes]=useState(notesInitial);
        //Add a note
        const addNote=(title,description,tag)=>{
            const note={
                "_id": "64a8519019439566551febba0fcf5",
                "user": "64a77ec6d37109974f7b90bc",
                "title":title,
                "description": description,
                "tag": tag,
                "date": "2023-07-07T17:55:28.745Z",
                "__v": 0
            }
            setNotes(notes.concat(note)) //concating a new object in the notes array
        }
        //Delete a Node
        const deleteNote=()=>{
            
        }

        //Edit a note
        const editNote=()=>{
            
        }
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}} >
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;