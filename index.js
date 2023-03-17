// stock market portfolio app by cory martin finished

const express = require('express');
const app = express();
const exphbs = require ('express-handlebars');
const path = require('path');
const request = require ('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// set handle bars Middleware  
// NOTE I had to change exphbs to .engine below.  Stackoverflow was able to fix
// API KEY pk_0cfabf1461ba4955a7769f170b30031e
// create call_api function


function call_api(finishedAPI, ticker){
request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_0cfabf1461ba4955a7769f170b30031e', {json: true }, (err, res, body) => {
if (err) {return console.log(err);}
if(res.statusCode === 200){
    //console.log(body);
    finishedAPI(body);
};
});
}

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const otherstuff = "Hello there, this is other stuff!";

// set handlebar GET route
app.get('/', (req, res) => {
    call_api(function(doneAPI){
         res.render('home', {
        stock: doneAPI
    });
    },"fb");

});

// set handlebar index POST route
app.post('/', (req, res) => {
    call_api(function(doneAPI){
        //posted_stuff = req.body.stock_ticker;
         res.render('home', {
        stock: doneAPI,
        //posted_stuff: posted_stuff
    });
    }, req.body.stock_ticker);

});

// create about page route
app.get('/about.html', (req, res) => {
    res.render('about');
});
// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server Listening on Port ' + PORT));
