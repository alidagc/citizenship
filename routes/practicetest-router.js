const express = require('express');
const QuestionModel = require('../models/question-model.js');
const UserModel = require('../models/user-model.js');
const router  = express.Router();

//10 QUESTION PRACTICE VIEW TEST ========================
router.get('/practicetest',(req, res, next) => {
  if (req.user) {
    if (req.user.practiceTest.length === 0){
      // console.log(req.user.practiceTest.length);
      QuestionModel.findRandom({}, {}, {limit: 10},
        (err, results)=> {
          if (err) {
          next(err);
          return;
        }
        // console.log(results);
        req.user.practiceTest = results;
        req.user.save((err, QsfromArray) => {
          if (err) {
            console.log("Error in saving to the user");
            next(err);
            return;
          }
        });
        // console.log("THE NEW ARRAY" + req.user.practiceTest);
        res.locals.practiceQuestions = req.user.practiceTest ;
        res.render('practice-test-views/practice-test-view');
        });

        } else {
          res.locals.practiceQuestions = req.user.practiceTest;
          res.render('practice-test-views/practice-test-view');
        }
    } else {
      res.render('auth-views/for-access-view');
       }
});

// WHEN BUTTON ON MODAL TO ADD TO WEAK IS CLICKED =============
router.post('/practicetest/addweak/:QId', (req, res, next) => {
  UserModel.findByIdAndUpdate(req.user._id,
    {"$push" : {weakQuestions: req.params.QId},
  }, (err, question) => {
      if (err){
        console.log("Question not saved to user");
        next(err);
        return;
      }
      res.redirect('/practicetest');
    });
});

// BUTTON TO REGENERATE 10 NEW QUESTIONS
router.post('/practicetest/regenerate', (req, res, next) => {
  req.user.practiceTest = [];
  req.user.save((err, QsfromArray) => {
    if (err) {
      console.log("Error in saving to the user");
      next(err);
      return;
    }
  });
  res.redirect('/practicetest');
});

module.exports = router;
