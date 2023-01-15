const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const currentDate = date.getDate();
const day = currentDate.day;
const year = currentDate.year;
const today = date.getDay();
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

let pages = [day, 'Work List'];
let items = ['Buy food', 'Cook food', 'Eat food'];
let workItems = [];

app.get('/', function(req, res) {    
      res.render('list', {pages: pages, year: year, listItem: day, newListItems: items});
})

app.post('/', (req, res) => {
    // console.log(req.body); 
    const nextItem = req.body.nextItem;
    // console.log(nextItem);
    if (req.body.button === "Work List") {
      workItems.push(nextItem);
      res.redirect('/work')
    } else {
      items.push(nextItem);
      res.redirect('/');
    }    
})

app.get('/work', (req, res) => {
  res.render('list', {pages: pages, year: year, listItem: "Work List", newListItems: workItems})
})

app.get('/about', (req, res) => {
  res.render('about', {year: year})
})

app.listen(port, () => {
    console.log('Server started on port 3000');
})