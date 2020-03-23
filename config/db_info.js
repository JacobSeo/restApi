var  mysql = require('mysql');
var os = require('os');  //호스트 이름을 가져오기 위한 모듈

var dbconnInfo = {
	dev:{
		host: 'localhost',
		port: '3306',
		user: 'node',
		password: 'node123',
		database: 'nodejs',
		multipleStatements : true
	}
};

var dbconnection = {
	init : function(){
		return mysql.createConnection(dbconnInfo.dev);	//로컬개발환경
	},

	dbopen : function(con){
		con.connect(function(err){
			if(err){
				console.error("mysql connection error : " + err);
			}else{
				console.info("mysql connection successfully.");
			}
		});
	},
	release : function(con){
		return con.end();
	}
};


module.exports = dbconnection;
