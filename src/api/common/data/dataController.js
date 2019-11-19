const express = require('express');
const router = express.Router();

router.get('/courses', (req, res) => {
  return res.send('aa');
});

module.exports = router;
