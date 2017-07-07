const express = require('express');
const QuestionModel = require('../models/question-model.js');
const UserModel = require('../models/user-model.js');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.user) {
    res.locals.userName = req.user.firstName;
    res.render('index');
  } else {
    res.render('index');
  }

});

module.exports = router;
