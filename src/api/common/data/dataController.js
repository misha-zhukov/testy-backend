const express = require('express');
const CourseService = require('../course/courseService');
const courseService = new CourseService();
const QuizService = require('../quiz/quizService');
const quizService = new QuizService();
const router = express.Router();

router.get('/courses', (req, res) => {
  courseService.list().then(data => {
    return res.send(data);
  });
});

router.get('/quiz/:id', (req, res) => {
  quizService.getOneQuiz(req.params.id).then(data => {
    return res.send(data);
  });
});

module.exports = router;
