const QuizRepository = require('./quizRepository');

class QuizService {
  constructor() {
    this.repository = new QuizRepository();
  }
  getOneQuiz(id) {
    return Promise.all([
      this.repository.findByIdField(id),
    ])
      .then(([data]) => {
        return data;
      });
  }

  
}

module.exports = QuizService;