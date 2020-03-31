var express  = require('express');
var router = express.Router();

router.get("/", function(req, res){
    res.render("addr/addrM");
}); 

module.exports = router;