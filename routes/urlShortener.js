const express = require('express');
const dns = require('dns');
const path = require('path');
const router = express.Router();

const urlDatabase = {};

router.post('/api/shorturl', (req, res) => {
  let hostname;
  const original_url = req.body.url;

  try {
    hostname = new URL(original_url).hostname;
  } catch (err) {
    return res.json({ error: 'invalid url' });
  }

  dns.lookup(hostname, (err, address) => {
    if (err) {
      return res.json({ error: 'invalid url' });
    }
    const short_url = Object.keys(urlDatabase).length + 1;
    urlDatabase[short_url] = original_url;
    res.json({
      original_url,
      short_url
    });
  });
});

router.get('/api/shorturl/:short_url', (req, res) => {
  const shortUrl = req.params.short_url;
  const originalUrl = urlDatabase[shortUrl];
  if (originalUrl) {
    return res.redirect(originalUrl);
  } else {
    return res.json({ error: 'No short URL found for the given input' });
  }
});

router.get('/urlShortener', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/urlShortener.html'));
});

router.get('/urlShortener.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/urlShortener.css'));
});

module.exports = router;
