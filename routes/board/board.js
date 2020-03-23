
var express  = require('express');
var router = express.Router();
var Dao = require('./dao/BoardDao');

// Index 
router.get('/', function(req, res){
    Dao.getList(req, res);
});

// New
router.get('/new', function(req, res){
    res.render('board/BoardI');
  });
  
// create
router.post('/', function(req, res){
    
    var body = req.body;
    Dao.getInsert(req, res, body);
});

// show
router.get('/:id', function(req, res){
    var param = req.params.id;
    Dao.getDetail(req,res,param);
});

// edit
router.get('/:id/edit', function(req, res){
});

// update
router.put('/:id', function(req, res){
});

// destroy
router.delete('/:id', function(req, res){
});
  

module.exports = router;