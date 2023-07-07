//this will provide all the states of the notes

import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    const s1={
        "name":"Sreejanee",
        "class":"12"
    }
    const [state,setState]=useState(s1);
    const update=()=>{
        setTimeout(() => {
            setState({
                "name":"Sumi",
                "class":"0"
            })
        }, 2000);
    }
    return(
        <NoteContext.Provider value={{state,update}} >
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;