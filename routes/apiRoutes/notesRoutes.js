const router = require ('express').Router();
const { findById, createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json');
const uniqid = require('uniqid');

router.get('/api/notes', (req, res) => {
    let results = notes;
    if(req.query) {
        results = (req.query, results);
    }
    res.json(results);
});

router.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/api/notes', (req, res) => {
    req.body.id = uniqid();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        result.splice(1, 1);
    } else {
        res.send(404);
    }
});

module.exports = router;