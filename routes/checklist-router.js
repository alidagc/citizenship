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

// TO VIEW EDIT CHECKLIST PAGE =============================
router.get('/checklist/edit/:itemIndex',(req, res, next) => {
  const currentIndex = Number(req.params.itemIndex);
  res.locals.previousText = req.user.checklist[currentIndex];

  if (req.user) {
      res.locals.index = currentIndex;
      res.render('checklist-views/edit-checklist-view');
      } else {
       res.render('auth-views/for-access-view');
     }
});

// TO EDIT A CHECKLIST POST =============================
router.post('/checklist/update/:itemIndex',(req, res, next) => {
  const currentIndex = Number(req.params.itemIndex);

  const oldChecklist = req.user.checklist;
  const newChecklist = oldChecklist;
  newChecklist[currentIndex] = req.body.editTextForChecklist;

  UserModel.findByIdAndUpdate(req.user._id,
    {$set: {checklist:newChecklist}},
     (err) => {
      if (err) {
        next(err);
        return;
    }
    res.redirect('/checklist');
  });
});

// TO DELETE A CHECKLIST ITEM ===========================
router.post('/checklist/delete/:itemIndex',(req, res, next) => {
  console.log(req.params.itemIndex);
  // remove the desired checklist item
  req.user.checklist.splice(req.params.itemIndex, 1);
  // save the fact that it was removed
  req.user.save((err, QsfromArray) => {
    if (err) {
      next(err);
      return;
    }
  });
  res.redirect('/checklist');
});

module.exports = router;
