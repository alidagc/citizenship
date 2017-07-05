const express = require('express');
const QuestionModel = require('../models/question-model.js');
const UserModel = require('../models/user-model.js');

const router  = express.Router();

// ALL CHECKLIST ITEMS PAGE ============================
router.get('/checklist',(req, res, next) => {
  if (req.user) {
        res.locals.checklistArray = req.user.checklist;
        res.render('checklist-views/all-checklist-view');
      } else {
       res.render('auth-views/for-access-view');
     }
});

// WHEN YOU CLICK TO ADD A NEW ITEM TO CHECKLIST ========
router.get('/checklist/add',(req, res, next) => {
  if (req.user) {
       res.render('checklist-views/add-checklist-view');
     } else {
       res.render('auth-views/for-access-view');
     }
});

// THE POST TO ADD A NEW ITEM FROM NEW ITEM FORM =========
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

// TO EDIT A CHECKLIST POST =============================


// TO DELETE A CHECKLIST ITEM ===========================
router.post('/checklist/delete',(req, res, next) => {
        res.redirect('/checklist');
});

module.exports = router;
