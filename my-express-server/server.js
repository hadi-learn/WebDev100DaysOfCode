

const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(request, response){
    response.send('<h1>Hello, World!</h1>');
});

app.get('/contact', (req, res) => {
    res.send('<h1>Contact me at: hadilearn01@gmail.com</h1>');
});

app.get('/about', (req, res) => {
    res.send(`<h2>Hi I'm Hadi, video engineer turned full stack developer.</h2>`)
});

app.get('/hobbies', (req, res) => {
    res.send(`<ul><li>Code</li><li>Videography</li><li>Coffee</li></ul>`)
})

app.listen(3000, function() {
    console.log('Server has started on port 3000');
    console.log(`Server has started on port ${port}`);
});

