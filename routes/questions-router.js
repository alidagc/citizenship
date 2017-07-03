const express = require('express');
const QuestionModel = require('../models/question-model.js');

const router  = express.Router();

// MAIN STUDY PAGE ======================================
router.get('/question/0',(req, res, next) => {
  const counter = Number(req.params.counter);
  QuestionModel.findOne(
      (err, QfromArray) => {
    if (err) {
      // use next() to skip to the ERROR PAGE
      next(err);
      return;
    }
  res.locals.pageName = "study";
  res.locals.oneQ = QfromArray;
  res.locals.counter = counter;
  res.render('questions-views/a-question-view');
});
});

//FROM "I GOT IT RIGHT" BUTTON ============================
router.get('/question/:counter', (req, res, next) => {
  const counter = Number(req.params.counter);
  console.log(counter);
  QuestionModel.find()
  .limit(1)
   .skip(counter)
  .exec((err, QfromArray) => {
    if (err) {
    // use next() to skip to the ERROR PAGE
      next(err);
      return;
    }
    res.locals.pageName = "study";
    console.log("THIS IS OUR RESULT" + QfromArray);
res.locals.pie = "I LOVE PIE";
    res.locals.oneQ = QfromArray;
    res.locals.counter = counter;
    res.render('questions-views/a-question-view');
  });
});


module.exports = router;
