const { Router } = require('express');

const LogEntry = require('../models/LogEntry');

const {
  API_KEY,
  DATABASE_URL,
} = process.env;

const router = Router();

const rateLimitDelay = 10 * 1000; // 10 second delay


router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
 