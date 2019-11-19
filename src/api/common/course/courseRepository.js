const BaseRepository = require('../../../db/baseRepository');

class CourseRepository extends BaseRepository {
  constructor() {
    super('courses');
  }
}

module.exports = CourseRepository;
