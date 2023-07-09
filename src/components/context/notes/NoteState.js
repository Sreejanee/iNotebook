import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial =[]
    const [notes, setNotes] = useState(notesInitial);
    //Get all note
    const getNotes = async () => {
        //API Call

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",

            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNzdlYzZkMzcxMDk5NzRmN2I5MGJjIn0sImlhdCI6MTY4ODY5ODU2Nn0.GAjX_oZOUMoZOYA2dtb34QXJHt75lkYTF9ZF5xFxJxg"
            }


        });

        const json=await response.json();
        console.log(json);
        setNotes(json)
    }
    //Add a note
    const addNote = async (title, description, tag) => {
        //API Call

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNzdlYzZkMzcxMDk5NzRmN2I5MGJjIn0sImlhdCI6MTY4ODY5ODU2Nn0.GAjX_oZOUMoZOYA2dtb34QXJHt75lkYTF9ZF5xFxJxg"
            },
            
            body: JSON.stringify({title,description,tag}),
        });

        const note = {
            "_id": "64a8519019439566551febba0fcf5",
            "user": "64a77ec6d37109974f7b90bc",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-07-07T17:55:28.745Z",
            "__v": 0
        }
        setNotes(notes.concat(note)) //concating a new object in the notes array
    }
    //Delete a Node
    const deleteNote = async(id) => {
        //API Call

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",

            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNzdlYzZkMzcxMDk5NzRmN2I5MGJjIn0sImlhdCI6MTY4ODY5ODU2Nn0.GAjX_oZOUMoZOYA2dtb34QXJHt75lkYTF9ZF5xFxJxg"
            }
        });

        const json=response.json();
        console.log(json);

        console.log("deleteing node with id", id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //API Call

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNzdlYzZkMzcxMDk5NzRmN2I5MGJjIn0sImlhdCI6MTY4ODY5ODU2Nn0.GAjX_oZOUMoZOYA2dtb34QXJHt75lkYTF9ZF5xFxJxg"
            },
            
            body: JSON.stringify({title,description,tag}),
        });
        const json = response.json();

        //Logic to edit note
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }
    return (
        
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }} >
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;