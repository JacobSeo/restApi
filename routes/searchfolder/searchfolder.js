var express  = require('express');
var router = express.Router();
var fs = require('fs');

// Index 
router.get('/', function(req, res){
    res.render('searchfolder/searchfolderM',{list : []});
});

router.post('/', function(req, res){   
    var path = req.body.path;
    var files = new Array();
    try{
        fs.readdir(path, function(error, filelist){
            //console.log(filelist);
            filelist.forEach(file =>{
                files.push(file);
            })
            console.log(files);
            res.render('searchfolder/searchfolderM',{list : files});
        })
    }catch(exception){
        console.log(exception);
        //res.render('searchfolder/searchfolderM',{list : []});
    }   
});

module.exports = router;