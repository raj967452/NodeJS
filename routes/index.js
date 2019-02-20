var express = require('express');
var router = express.Router();
var url = 'mongodb://localhost:27017/test';

var db = require('monk')(url);
var userData = db.get('user-data');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/get-data', (req, res, next) => {
  var resultArray = [];
  userData.find({}).then((docs) => {
    console.log(docs);
    res.render('index', {items: docs});
  }).catch(function (err) {
    console.log(err);
  });
});

router.post('/insert', (req, res, next) => {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  }
  userData.insert(item);
  res.redirect('/');
});
router.post('/update', (req, res, next) => {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  var id = req.body.id;
  userData.update({"_id": db.id(id)}, item);
  //userData.updateById(id, item);

});
router.post('/delete', (req, res, next) => {
  var id = req.body.id;
  userData.removeById(id);
});
db.close();

module.exports = router;
