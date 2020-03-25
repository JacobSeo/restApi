var express  = require('express');
var router = express.Router();
var fs = require('fs');
var extname  = require('../common/common');

// Index 
router.get('/', function(req, res){
    res.render('searchfolder/searchfolderM',{list : []});
});

router.post('/', function(req, res){   
    var path = req.body.data;
    var files = new Array();
    try{
        if(fs.lstatSync(path).isDirectory()){
            fs.readdir(path, function(error, filelist){
                //console.log(filelist);
                filelist.forEach(file =>{
                    files.push(file);
                })
                //console.log(files);
                //res.render('searchfolder/searchfolderM',{list : files});
                res.json({msg:"list", data : files});
            })
        }else{
            fileNM = path.split("/");
            console.log(fileNM.slice(-1)[0]);
            var result = extname.extname(fileNM.slice(-1)[0]);
            res.json({msg:"file", data : []});
        }
    }catch(exception){
        console.log(exception);
        //res.render('searchfolder/searchfolderM',{list : []});
    }   
});

module.exports = router;