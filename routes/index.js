var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Tutorial', condition:false, anyArray: [1,2,3,4,5] });
});
/* GET home page. */
/*router.get('/users', function(req, res, next) {
  res.send('Respond with resource');
});*/
router.get('/user/:id', function(req, res, next) {
  res.render('user id', {output: req.params.id});
});
router.post('/user/submit', function(req, res, next) {
  var id = req.body.id;
  res.redirect('/user/'+id);
});
module.exports = router;
