const router = require ('express').Router();
const { findById, createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db');
const uniqid = require('uniqid');
const fs = require('fs');
const path = require('path');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    req.body.id = uniqid();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        for (var i = notes.length - 1; i >= 0; --i) {
            if (notes[i] == result) {
                notes.splice(i,1);
                fs.writeFileSync(
                    path.join(__dirname, '../../db/db.json'),
                    JSON.stringify({ notes }, null, 2)
                );
            }
        }
    } else {
        res.send(404);
    }
    res.json(notes);
});

module.exports = router;