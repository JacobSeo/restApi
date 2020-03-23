var express = require('express');
var router = express.Router();

// Home
router.get('/', function(req, res){
  res.render('home/welcome');
});
router.get('/rest', function(req, res){
  res.render('home/rest');
});

module.exports = router;