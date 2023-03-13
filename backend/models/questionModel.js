const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  choices: [
    {
      text: {
        type: String,
        required: true,
        trim: true,
      },
      isCorrect: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
