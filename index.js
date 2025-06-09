// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;
  if (dateParam) {
    // Check if the dateParam is a valid number (Unix timestamp)
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      // Try to parse the date string
      date = new Date(dateParam);
    }
  } else {
    // If no date is provided, use the current date
    date = new Date();
  }
  if(isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
