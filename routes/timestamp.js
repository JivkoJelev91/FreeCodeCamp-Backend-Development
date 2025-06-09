const express = require('express');
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

module.exports = router;
