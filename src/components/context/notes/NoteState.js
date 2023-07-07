//this will provide all the states of the notes

import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    
    return(
        <NoteContext.Provider  >
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;