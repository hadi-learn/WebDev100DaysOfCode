const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

var items = ['Buy food', 'Cook food', 'Eat food'];

app.get('/', function(req, res) {
    var today = new Date();
    var currentDay = today.getDay();
    // var currentDay = 7;

    // using switch method then pass it to html page

    // var day ='';

    // switch (currentDay) {
    //     case 0:
    //       day = "Sunday";
    //       break;
    //     case 1:
    //       day = "Monday";
    //       break;
    //     case 2:
    //        day = "Tuesday";
    //       break;
    //     case 3:
    //       day = "Wednesday";
    //       break;
    //     case 4:
    //       day = "Thursday";
    //       break;
    //     case 5:
    //       day = "Friday";
    //       break;
    //     case 6:
    //       day = "Saturday";
    //       break;
    //     default:
    //     console.log('Error: current day is equal to: ' + currentDay);
    //   }

    // Using javascript toLocaleDateString

    var options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    };

    var day = today.toLocaleDateString('en-US', options);
    
      res.render('list', {kindOfDay: day, newListItems: items});
})

app.post('/', (req, res) => {
    const nextItem = req.body.nextItem;
    console.log(nextItem);
    items.push(nextItem);
    res.redirect('/');
})



app.listen(port, () => {
    console.log('Server started on port 3000');
})