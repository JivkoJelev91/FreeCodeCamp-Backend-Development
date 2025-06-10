const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/api/whoami', (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
  const language = req.headers['accept-language']?.split(',')[0];
  const software = req.headers['user-agent']?.split(') ')[0].split(' (')[1];
  if(ip) {
    return res.json({
      ipaddress: ip,
      language,
      software
    });
  }
});

router.get('/headerParser', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/headerParser.html'));
});

router.get('/headerParser.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/headerParser.css'));
});

module.exports = router;
