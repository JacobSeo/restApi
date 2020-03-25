var express = require('express');
var http = require('http');
var path = require('path')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

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


/*===========================================================================*/

// Routes
app.use('/', require('./routes/home'));
app.use('/board', require('./routes/board/board'));
app.use('/searchfolder', require('./routes/searchfolder/searchfolder'));

process.on('uncaughtException', (err) => {
  console.error('예기치 못한 에러', err);  
  process.exit(1);
});

var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});