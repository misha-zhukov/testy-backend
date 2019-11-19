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
}

module.exports = CourseService;