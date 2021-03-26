const router = require ('express').Router();
const { findById, createNewNotes } = require('../../lib/notes');

// gotta first make function in lib/notes.js
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

//gotta first make function in lib/notes.js
router.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();


});

module.exports = router;