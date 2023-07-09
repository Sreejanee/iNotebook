const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');//to validate the notes


const router = express.Router();
//ROUTE 1:Get all the notes from a loggedd in user using: GET "/api/notes/fetchallnotes". Log In required
router.get('/fetchallnotes', fetchuser, async (req, res) =>//this endpoint will fetch all notes of a loggedin user from the DB
{
    try {

        const notes = await Notes.find({ user: req.user.id })//find all the notes of the user whose id is given
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});
//ROUTE 2:Add a new note using: POST "/api/notes/addnote". Log In required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const { title, description, tag } = req.body;
    //if there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savenote = await note.save();
        res.json(savenote)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});
//ROUTE 3:Update an existing note using: PUT "/api/notes/updatenote". Log In required        //for updating we use PUT request
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //create a note object which will contain all the updated fields
        const newNote = {};
        //if the user input a title then that means that the user wants to update the title otherwise if(title) will give false
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the node to be updated and update it but before that do some verifications
        let note = await Notes.findById(req.params.id);//it will have the id which will be passed as parameter in the endpoint .basically the id which the client is trying to  update
        if (!note) { return res.status(404).send("Not Found") }//the id of the note that the client has asked to update doesn't exist
        if (note.user.toString() !== req.user.id)//if the loggedin person's id does not match with the user id of the note that he is trying to change then do not allow (jo banda logged in h wo kisi or ka note access karne ka try kar rha h)
        {
            return res.status(401).send("Not Allowed");
        }
        //Find the node to be updated and update it 
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });//{new:true} is done so that if any new content comes then it will be updated
        res.json(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

//ROUTE 4:deleting an existing note using: DELETE "/api/notes/deletenote". Log In required        //for updating we use PUT request
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        //Find the node to be deleted and delete it but before that do some verifications
        let note = await Notes.findById(req.params.id);//it will have the id which will be passed as parameter in the endpoint .basically the id which the client is trying to  delete
        if (!note) { return res.status(404).send("Not Found") }//the id of the note that the client has asked to delete doesn't exist
        if (note.user.toString() !== req.user.id)//if the loggedin person's id does not match with the user id of the note that he is trying to change then do not allow (Allow deletion only if the user owns this note)
        {
            return res.status(401).send("Not Allowed");
        }
        //Find the node to be updated and update it 
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "The Note has been deleted", note: note });
    }

catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
}
    
});
module.exports = router;