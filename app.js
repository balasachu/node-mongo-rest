const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan');
const mongoose = require('mongoose')
const dbConfig = require('./db.config') //database configuration

// set the port
const port = process.env.PORT || 3000;

// connection to mongodb
mongoose.connect(dbConfig.dbURL);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// allow-cors
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', require('./router'));

// express doesn't consider not found 404 as an error so we need to handle 404 it explicitly
// handle 404 error
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err);
    if (err.status === 404)
        res.status(404).json({ message: "Not found" });
    else
        res.status(500).json({ message: "Something looks wrong :( !!!" });
})

app.listen(port, () => {
    console.log(`App Server Listening at ${port}`);
})