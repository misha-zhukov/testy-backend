const { ObjectID } = require('mongodb');
const CourseRepository = require('./courseRepository');

class CourseService {
  constructor() {
    this.repository = new CourseRepository();
  }

  list() {
    return Promise.all([
      this.repository.list(),
    ])
      .then(([data]) => {
        return data.toArray();
      });
  }

  getCourseById(id) {
    return Promise.all([
      this.repository.findById(id),
    ])
      .then(([data]) => {
        return data;
      });
  }

  getLessonByIds(courseId, lessonId) {
    return Promise.all([
      this.repository.findLessonByIds(courseId, lessonId),
    ])
      .then(([course]) => {
        return course.lessons[0];
      });
  }

  updateCourse(course) {
    let id = course._id;
    if(!id) {
      id = new ObjectID();
    }
    delete course._id;
    course.lessons.forEach(lesson => {
      if (!lesson._id) {
        lesson._id = new ObjectID();
      }

      lesson.steps.forEach(step => {
        if (!step._id) {
          step._id = new ObjectID();
        }
      });
    });

    return Promise.all([
      this.repository.edit(id, course),
    ])
      .then(([data]) => {
        console.log(data);
      });
  }
}

module.exports = CourseService;