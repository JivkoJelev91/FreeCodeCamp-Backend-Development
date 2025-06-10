const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;
  if (dateParam) {
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  } else {
    date = new Date();
  }
  if(isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

router.get('/timestamp', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/timestamp.html'));
});

router.get('/timestamp.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/timestamp.css'));
});

module.exports = router;
