const mongoose = require('mongoose');
const random   = require('mongoose-simple-random');
const Schema = mongoose.Schema;

const myQuestionSchema = new Schema ({
    category: {type: String},
    subcategory: {type: String},
    question: {type: String},
    answers: {type:[String]},
    specialQuestion: {type: Boolean},
    stateDependent: {type: Boolean},
    timeSensitive: {type: Boolean}
  });

myQuestionSchema.plugin(random);
const QuestionModel = mongoose.model ('Question', myQuestionSchema);

module.exports = QuestionModel;
