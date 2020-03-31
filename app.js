var express = require('express');
var http = require('http');
var path = require('path')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
const session = require('express-session');


var app = express();
/*======================= sequelize ==================================*/
const models = require("./models/index.js");

models.sequelize.sync().then( () => {
  console.log(" DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
})
/*====================================================================*/

/*====================================================================*/

// DB setting
/*
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;
db.once('open', function(){
  console.log('DB connected');
});
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});
*/

/*====================================================================*/
// Other settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

/*===============================session=====================================*/
app.use(session({
  key: 'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
  }
}));
/*===========================================================================*/
app.use(function(req, res, next){
  let issession = req.session.issession;
  console.log(issession);
  res.locals.issession = issession;
  next();
});

app.use('/', require('./routes/home'));
app.use('/users', require('./routes/user'));
app.use('/board', require('./routes/board/board'));
app.use('/addr', require('./routes/addr/addr'));
app.use('/searchfolder', require('./routes/searchfolder/searchfolder'));

process.on('uncaughtException', (err) => {
  console.error('예기치 못한 에러', err);  
  process.exit(1);
});

var port = 9001;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});