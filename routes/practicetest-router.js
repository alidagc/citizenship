const express = require('express');
const QuestionModel = require('../models/question-model.js');
const UserModel = require('../models/user-model.js');
const router  = express.Router();

//10 QUESTION PRACTICE VIEW TEST ========================
router.get('/practicetest',(req, res, next) => {
  if (req.user) {
    QuestionModel.findRandom({}, {}, {limit: 10},
      (err, results)=> {
        if (err) {
        next(err);
        return;
      }
      res.locals.practiceQuestions = results;
      res.render('practice-test-views/practice-test-view');
      });
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
      return;
    });
});

// //  WHEN SPECIFIC QUESTION IN TEST IS CLICKED TO SEE ANSWER ====
// router.get('/practicetest/:QId', (req, res, next) => {
//   QuestionModel.findById(
//   req.params.QId,       //1st arguemnt is the id to find in the db
//   (err, thePracticeQuestion) => { // 2nd argument -> callback
//     if (err) {
//       next(err);
//       return;
//     }
//       res.locals.thePracticeQuestion = thePracticeQuestion;
//       res.render('practice-test-views/one-practice-question');
//   });
// });

module.exports = router;

// <button class="bttn-unite bttn-sm bttn-primary">
//   <a href="/practicetest/<%=oneQ._id%>">See answer</a>
// </button>

// <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-sm">Small modal</button>
//
// <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
//   <div class="modal-dialog modal-sm" role="document">
//     <div class="modal-content">
//       <div class="row">
//         <p>Answer/s: </p>
//         <% thePracticeQuestion.answers.forEach((oneAns)=>{ %>
//           <p>☆ <%=oneAns%></p>
//         <%})%>
//       </div>
//     </div>
//   </div>
// </div>
