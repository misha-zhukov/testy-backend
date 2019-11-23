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

  updateCourse(course) {
    const id = course._id;
    delete course._id;
    return Promise.all([
      this.repository.edit(id, course),
    ])
      .then(([data]) => {
        console.log(data);
      });
  }
}

module.exports = CourseService;