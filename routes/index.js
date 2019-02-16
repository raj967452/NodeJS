var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Tutorial', condition:false, anyArray: [1,2,3,4,5] });
});
/* GET home page. */
router.get('/users', function(req, res, next) {
  res.send('Respond with resource');
});
/* GET home page. */
router.get('/user/details', function(req, res, next) {
  res.send('user details');
});
module.exports = router;
