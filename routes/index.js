const path = require('path');
const router = require('express').Router();
const { notes } = require('../db/db.json');

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// gotta first make function in lib/notes.js
// router.get('/api/notes', (req, res) => {
//     let results = notes;
//     if(req.query) {
//         results = (req.query, results);
//     }
//     res.json(results);
// });

//gotta first make function in lib/notes.js
// router.post('/api/notes', (req, res) => {
//     req.body.id = notes.length.toString();


// });

module.exports = router;