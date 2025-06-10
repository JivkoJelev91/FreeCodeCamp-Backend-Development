const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../models/User");

// POST /api/users - create a new user
router.post("/api/users", async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }
  try {
    let existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const user = new User({ username });
    await user.save();
    res.json({ username: user.username, _id: user._id });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/users - get all users
router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, "username _id");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/users/:_id/exercises - add exercise to user
router.post("/api/users/:_id/exercises", async (req, res) => {
  const { _id } = req.params;
  const { description, duration } = req.body;
  let date = req.body.date ? new Date(req.body.date) : new Date();
  if (!description || !duration) {
    return res.status(400).json({ error: "Description and duration are required" });
  }
  if (typeof description !== 'string' || isNaN(Number(duration))) {
    return res.status(400).json({ error: "Invalid input format" });
  }
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const exercise = {
      description: String(description),
      duration: Number(duration),
      date
    };
    user.log.push(exercise);
    await user.save();
    res.json({
      username: user.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString(),
      _id: user._id
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/users/:_id/logs - get user's exercise log
router.get("/api/users/:_id/logs", async (req, res) => {
  const { _id } = req.params;
  let { from, to, limit } = req.query;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    let log = user.log || [];
    if (from) {
      const fromDate = new Date(from);
      log = log.filter(entry => entry.date >= fromDate);
    }
    if (to) {
      const toDate = new Date(to);
      log = log.filter(entry => entry.date <= toDate);
    }
    if (limit) {
      log = log.slice(0, Number(limit));
    }
    const formattedLog = log.map(entry => ({
      description: String(entry.description),
      duration: Number(entry.duration),
      date: entry.date instanceof Date ? entry.date.toDateString() : new Date(entry.date).toDateString()
    }));
    res.json({
      username: user.username,
      count: formattedLog.length,
      _id: user._id,
      log: formattedLog
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/exerciseTracker", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/exerciseTracker.html"));
});

router.get("/exerciseTracker.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exerciseTracker.css"));
});

module.exports = router;
