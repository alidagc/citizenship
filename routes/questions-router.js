const express = require('express');
const QuestionModel = require('../models/question-model.js');
const UserModel = require('../models/user-model.js');

const router  = express.Router();

// MAIN STUDY PAGE ======================================
router.get('/question/0',(req, res, next) => {
  res.locals.pageName = "study";

  const counter = 0;
  QuestionModel.findOne(
      (err, QfromArray) => {
    if (err) {
      // use next() to skip to the ERROR PAGE
      next(err);
      return;
    }

  res.locals.oneQ = QfromArray;
  res.locals.counter = counter + 1;
  res.render('questions-views/study-question-view');
});
});



// FROM BUTTONS ON STUDY PAGE "RIGHT OR WRONG" =================
router.post('/question/:counter', (req, res, next) => {
res.locals.pageName = "study";
  const counter = Number(req.params.counter);
  QuestionModel.find()
    .limit(1)
    .skip(counter)
    .exec((err, QfromArray) => {
      if (err) {
        // use next() to skip to the ERROR PAGE
        next(err);
        return;
      }

      const theActualQuestion = QfromArray[0];

      if (req.body.failure) {
        UserModel.findByIdAndUpdate(req.user._id, {
             "$push" : {weakQuestions: theActualQuestion._id},
           }, (err, response) => {
              if (err){
                console.log("Question not saved to user");
                next(err);
                return;
              }

              res.locals.oneQ = theActualQuestion;
              res.locals.counter = counter + 1;
              res.render('questions-views/study-question-view');
            });
      }
      else {
        res.locals.oneQ = theActualQuestion;
        res.locals.counter = counter + 1;
        res.render('questions-views/study-question-view');
      }
  });
});


// WEAK QUESTIONS VIEW  ======================================
router.get('/weakQuestions',(req, res, next) => {
  if (req.user) {
    QuestionModel.find(
        { _id: req.user.weakQuestions },
        (err, QsfromArray) => {
          if (err) {
            next(err);
            return;
          }
        res.locals.wrongArray = QsfromArray;
        res.render('questions-views/wrong-questions-view');
      });
     } else {
       res.render('auth-views/for-access-view');
     }
});

//When specific question in list of weak questions is clicked
// oneQ
router.get('/weakQuestions/:QId', (req, res, next) => {
  QuestionModel.findById(
  req.params.QId,       //1st arguemnt is the id to find in the db
  (err, theWeakQuestion) => { // 2nd argument -> callback
    if (err) {
      next(err);
      return;
    }
      res.locals.theWeakQuestion = theWeakQuestion;
      res.render('questions-views/one-weak-question');
  });
});

// When "REMOVE WEAK QUESTION" IS CLICKED
router.post('/weakQuestions/:QId/remove', (req, res, next) => {
  UserModel.findByIdAndUpdate(req.user._id,
    {"$pull" : {weakQuestions: req.params.QId},
    },(err, question) => {
        if (err){
          console.log("Question not removed from user");
          next(err);
          return;
        }
        res.redirect('/weakQuestions');
  });
});



module.exports = router;
