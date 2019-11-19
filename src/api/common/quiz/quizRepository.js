const BaseRepository = require('../../../db/baseRepository');

class QuizRepository extends BaseRepository {
  constructor() {
    super('quizes');
  }
}

module.exports = QuizRepository;
