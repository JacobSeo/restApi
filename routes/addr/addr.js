var express  = require('express');
var router = express.Router();

router.get("/", function(req, res){
    res.render("addr/addrM");
}); 

router.get("/uri", function(req, res){
    res.render("addr/uriM");
}); 

module.exports = router;