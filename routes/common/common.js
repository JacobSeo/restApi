var path = require('path');

var result = false;

var data = {
  extname : function(val){
    var ext = path.extname(val||'').split('.');
    if(ext[1] !== 'txt'){
        result = true;
    }
    return result;
  }
};

module.exports = data;
