var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectid = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});
router.get('/get-data', (req, res, next) => {
  var resultArray = [];
  mongo.connect(url, (err, db) =>{
    assert.equal(null, err);
    let database = db.db('test');
    var userData = database.collection('user-data').find();
    userData.forEach((ele, err) => {
      assert.equal(null, err);
      resultArray.push(ele);
    }, () =>{
      db.close()
      res.render('index', {items: resultArray});
    });
  });
});
router.post('/insert', (req, res, next) => {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  }
  mongo.connect(url, (err, db) => {
    assert.equal(null, err);
    let database = db.db('test');
    database.collection('user-data').insertOne(item, (err, result) => {
      assert.equal(null, err);
      console.log('item inserted');
      db.close();
    })
  });
  res.redirect('/');
});
router.post('/update', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  var id = req.body.id;

  mongo.connect(url, (err, db) => {
    assert.equal(null, err);
    let database = db.db('test');
    database.collection('user-data').updateOne(
      {"_id": objectid(id)},
      {"$set": item}, 
      (err, result) => {
      assert.equal(null, err);
      console.log('item update');
      db.close();
    })
  });
});
router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  mongo.connect(url, (err, db) => {
    assert.equal(null, err);
    let database = db.db('test');
    database.collection('user-data').deleteOne(
      {"_id": objectid(id)},
      (err, result) => {
      assert.equal(null, err);
      console.log('item delete');
      db.close();
    })
  });
});
/* GET home page. */
/*router.get('/users', function(req, res, next) {
  res.send('Respond with resource');
});*/
/*router.get('/user/:id', function(req, res, next) {
  res.render('user id', {output: req.params.id});
});
router.post('/user/submit', function(req, res, next) {
  var id = req.body.id;
  res.redirect('/user/'+id);
});*/
module.exports = router;
