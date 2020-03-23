var dbConObj = require('../../../config/db_info');	//사용자 정의한 함수 사용
var dbconn = dbConObj.init();

var boardDao = {
    defult : function(){
       return "Welcome Board Main Page" ;
    },
    getList : function(req, res){
        dbConObj.dbopen(dbconn);
      	var sql = "select a.seq, a.title, a.ins_cr, date_format(a.ins_dt, '%Y-%m-%d') as ins_dt, (select user_nm from t_user b where b.user_id = a.ins_cr) as ins_nm from t_board a"; // 클럽목록
  	    dbconn.query(sql, function(err, results, field){
    			if(err){
    				console.log(err);
    				console.log("The query has problem");
    			}else{
    				console.log("succesfully");
                }
                
  	     res.render('board/boardM', {title : 'testData list ejs', data : results});
  	   });
    },
    getDetail : function(req, res, seq, type){
		dbConObj.dbopen(dbconn);
      	var sql = 'select seq, title, contents, ins_cr, ins_dt from t_board where seq = ?'; // 클럽목록
  	    dbconn.query(sql, seq,function(err, results, field){
    			if(err){
    				console.log(err);
    				console.log("The query has problem");
    			}else{
                    //console.log("succesfully");                    
                    var parsed = JSON.parse(JSON.stringify(results));
                    console.log(parsed[0]);
                }                
		if(type == "U"){
			res.render('board/boardU', {title : 'BoardV', data : parsed[0]});
		}else{
			res.render('board/boardV', {title : 'BoardV', data : parsed[0]});
		}
  	   });
    },
    getInsert : function(req, res, body){
        dbConObj.dbopen(dbconn);
        var title = body.title;
        var contents = body.contents;
      	var sql = "insert into t_board (title, contents, ins_cr, ins_dt) values (?,?,'1',now())"; // 클럽목록
  	    dbconn.query(sql, [title, contents],function(err, results, field){
    			if(err){
    				console.log(err);
    				console.log("The query has problem");
    			}else{
                    //console.log("succesfully");
                }
                
            res.redirect('/board');
  	   });
    },
    getUpdate : function(req, res, body, id){
        dbConObj.dbopen(dbconn);
        var title = body.title;
        var contents = body.contents;
      	var sql = "update t_board set title= ?, contents =? where seq=?"; // 클럽목록
  	    dbconn.query(sql, [title, contents, id],function(err, results, field){
    			if(err){
    				console.log(err);
    				console.log("The query has problem");
    			}else{
                    //console.log("succesfully");
                }
                
            res.redirect('/board/'+id);
  	   });
    },
    getDelete : function(req, res, id){
        dbConObj.dbopen(dbconn);
      	var sql = "delete from t_board where seq=?"; // 클럽목록
  	    dbconn.query(sql, id,function(err, results, field){
    			if(err){
    				console.log(err);
    				console.log("The query has problem");
    			}else{
                    //console.log("succesfully");
                }
                
            res.redirect('/board');
  	   });
    }
}

module.exports = boardDao;