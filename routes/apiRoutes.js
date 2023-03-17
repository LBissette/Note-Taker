const router = require('express').Router()
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        res.json(JSON.parse(data))
    })
});

module.exports = router;
