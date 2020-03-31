var express = require('express');
var router = express.Router();

// Home
router.get('/', function(req, res){
  //let session = req.session;  
  res.render('home/welcome');
});
router.get('/rest', function(req, res){
  res.render('home/rest');
});
router.get('/test', function(req, res){
  let data = {}
  data.id = "test";
  data.name="테스터";
  res.json({data});
});

module.exports = router;