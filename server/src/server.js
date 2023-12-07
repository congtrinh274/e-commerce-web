const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const route = require('./routes');
const db = require('./configs/dbConfig');

db.connect();

const app = express();
const port = 3000;

//Use static folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware handle body data of post method
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

//HTTP logger
app.use(morgan('combined'));

//Routes init
route(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
