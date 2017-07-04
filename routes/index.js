const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index',{
    pageName: "index"
  });
});


// Checklist page
router.get('/checklist',(req, res, next) => {
  if (req.user) {
       res.render('checklist-view');
     } else {
       res.render('auth-views/for-access-view');
     }
});

module.exports = router;
