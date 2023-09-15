const express = require('express');
const app = express.Router();

// GET route
// respond with "hello world" when a GET request is made to the homepage
// specify the path within the '/'
app.get('/', (req, res) => {
    res.send('This is your user data');
});

// POST route
app.post('/', (req, res) => {
    res.send('User created')
});

app.put('/', (req, res) => {
    res.send('User updated')
});

app.delete('/', (req, res) => {
    res.send('User deleted')
});

module.exports = router;