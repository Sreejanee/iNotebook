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
module.exports = router;