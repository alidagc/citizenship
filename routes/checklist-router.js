const express = require('express');
const QuestionModel = require('../models/question-model.js');
const UserModel = require('../models/user-model.js');

const router  = express.Router();

// Checklist page
router.get('/checklist',(req, res, next) => {
  if (req.user) {
    UserModel.find(
        req.user.checklist,
        (err, checklistArray) => {
          if (err) {
            next(err);
            return;
          }
        res.locals.checklistArray = usersChecklist;
        console.log(checklistArray);
        res.render('checklist-views/all-checklist-view');
      });
     } else {
       res.render('auth-views/for-access-view');
     }
});

router.get('/checklist/add',(req, res, next) => {
  if (req.user) {
       res.render('checklist-views/add-checklist-view');
     } else {
       res.render('auth-views/for-access-view');
     }
});

router.post('/checklist/add/new',(req, res, next) => {
  UserModel.findByIdAndUpdate(req.user._id, {
       "$push" : {checklist:req.body.textForChecklist},
        }, (err, response) => {
        if (err){
          console.log("Checklist item not saved to user");
          next(err);
          return;
        }
        res.redirect('/checklist');
      });
});

module.exports = router;
