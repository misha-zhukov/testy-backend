const express = require('express');
const CourseService = require('../course/courseService');
const courseService = new CourseService();
const router = express.Router();

router.get('/courses', (req, res) => {
  courseService.list().then(data => {
    return res.send(data);
  });
});

module.exports = router;
