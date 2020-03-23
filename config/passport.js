var dbHelper = require('./db_info');	//사용자 정의한 함수 사용
const LocalStrategy = require('passport-local').Strategy; 

module.exports = (passport) => { 
	// 로그인이 성공하면, serializeUser 메서드를 이용하여 사용자 정보를 Session에 저장할 수 있다. 
	passport.serializeUser((user, done) => { 
		console.log('serialize'); done(null, user); 
	});

	// 인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴. 
	passport.deserializeUser((user, done) => { 
		console.log('deserialize'); done(null, user); 
	}); 
	
	passport.use(new LocalStrategy({ 
		usernameField : 'userid', 
		passwordField : 'password', 
		passReqToCallback : true 
	}, 
		// 인증 요청 
		function(req, userid, password, done) { 
			if(!userid || !password ) { 
				return done(null, false, req.flash('message','All fields are required.')); 
			}
			dbHelper.getConnection(function(conn) { 
				console.log('conn = ' + conn); 
				conn.query("select * from t_user where user_id = ?", [userid]).then((rows) => { 
					// console.log(rows); 
					if(!rows.length) { 
						return done(null, false, req.flash('message','Invalid username or password.')); 
					}
					var dbPassword = rows[0].password; 
					if(!(dbPassword == password)) { 
						return done(null, false, req.flash('message','Invalid username or password.')); 
					}
					
					return done(null, rows[0]);
					
				}).then((res) => { 
					console.log('res = '+res); 
				// { affectedRows: 1, insertId: 1, warningStatus: 0 } 
					conn.end(); 
				}).catch(err => { 
					//handle error 
					console.log(err); 
					conn.end(); 
					if (err) return done(req.flash('message',err)); 
				}); 
			}); 
		}
	)); 
};
