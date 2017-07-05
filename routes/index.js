const express = require('express');
const QuestionModel = require('../models/question-model.js');
const UserModel = require('../models/user-model.js');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index',{
    pageName: "index"
  });
});

module.exports = router;
