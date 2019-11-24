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

router.get('/course/:id', (req, res) => {
  courseService.getCourseById(req.params.id).then(data => {
    return res.send(data);
  });
});

router.get('/course/:courseId/lesson/:lessonId', (req, res) => {
  courseService.getLessonByIds(req.params.courseId, req.params.lessonId).then(data => {
    return res.send(data);
  });
});

router.post('/course/update', (req, res) => {
  let ret = courseService.updateCourse(req.body);
  res.send(ret);
});

module.exports = router;
