const { response } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
})

app.post('/', (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    console.log(firstName);
    console.log(lastName);
    console.log(email);
})


app.listen(port, () => {
    console.log(`Server is running on port 3000`);
})