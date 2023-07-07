//this will provide all the states of the notes

import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const notesInitial =
        [
            {
                "_id": "64a8517a194391febba0fcf3",
                "user": "64a77ec6d37109974f7b90bc",
                "title": "My title-sree",
                "description": "First note sree",
                "tag": "Personally",
                "date": "2023-07-07T17:55:06.214Z",
                "__v": 0
            },
            {
                "_id": "64a85190194391febba0fcf5",
                "user": "64a77ec6d37109974f7b90bc",
                "title": "My title",
                "description": "First note ",
                "tag": "Personal",
                "date": "2023-07-07T17:55:28.745Z",
                "__v": 0
            }
        ]
        const[notes,setNotes]=useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes,setNotes}} >
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;