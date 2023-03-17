const router = require('express').Router()
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        res.json(JSON.parse(data))
    })
});

router.post('/notes', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        };
        readAndAppend(newNote, './db/db.json');
    } else{
        res.errored('Error in adding note')
    }
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data)=> {
        if (err) {
            console.error(err);
        } else {
            const parsedNote = JSON.parse(data);
            parsedNote.push(content);
            fs.writeFile(file, JSON.stringify(parsedNote), (err) => {
                if (err) throw err;
                console.log('Note created!')
            });
        }
    });
};

router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;

    fs.readFile('./db/db.json', 'utf-8', (err,data) => {
        if (err) throw err
        const parsedData = JSON.parse(data);
        const newDb = parsedData.filter((item) => item.id !== noteId)
        fs.writeFile('./db/db.json', JSON.stringify(newDb), (err) => {
            if (err) throw err;
            console.log('Note deleted successfully!')
        });
    })
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

module.exports = router;
