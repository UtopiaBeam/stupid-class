const express = require('express');
const { join } = require('path');
const { urlencoded, json } = require('body-parser');

const app = express();
let users = [];

app.use(express.static(join(__dirname, './public')));
app.use(urlencoded({ extended: true }));
app.use(json());
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', { users });
})

app.get('/ping', (req, res) => {
    res.send({ message: 'pong!' });
});

app.post('/addUser', (req, res) => {
    if (!req.body.firstName || !req.body.lastName) {
        res.status(400).send({
            message: 'Please fill `firstName` and `lastName`.'
        });
    } else {
        users.push(req.body);
        res.send({ message: 'User added' });
    }
});

app.delete('/deleteUser/:id', (req, res) => {
    const { id } = req.params;
    if (id < 0 || id >= users.length) {
        res.status(400).send({
            message: 'Invalid id'
        });
    } else {
        users.splice(id, 1);
        res.send({ message: 'User deleted' });
    }
});

app.listen(3000, () => console.log('Listening to port 3000'));