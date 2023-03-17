const express = require('express');
const app = express();
const exphbs = require ('express-handlebars');
const path = require('path');


const PORT = process.env.PORT || 5000;

// set handle bars Middleware  
// NOTE I had to change exphbs to .engine below.  Stackoverflow was able to fix
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const otherstuff = "Hello there, this is other stuff!";

// set handlebar routes
app.get('/', (req, res) => {
    res.render('home', {
        stuff: otherstuff
    });
});

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server Listening on Port ' + PORT));
