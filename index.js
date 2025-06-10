// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

const timestampRouter = require('./routes/timestamp');
const headerParserRouter = require('./routes/headerParser');
const urlShortenerRouter = require('./routes/urlShortener');
const exerciseTrackerRouter = require('./routes/exerciseTracker');
const fileMetaDataRouter = require('./routes/fileMetaData');

app.use(timestampRouter);
app.use(headerParserRouter);
app.use(urlShortenerRouter);
app.use(exerciseTrackerRouter);
app.use(fileMetaDataRouter);

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

require('./config/db');
