const { ObjectID } = require('mongodb');
const BaseRepository = require('../../../db/baseRepository');

class CourseRepository extends BaseRepository {
  constructor() {
    super('courses');
  }

  findLessonByIds(courseId, lessonId) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .findOne({ _id: ObjectID(courseId), 'lessons._id': ObjectID(lessonId) }));
  }
}

module.exports = CourseRepository;
