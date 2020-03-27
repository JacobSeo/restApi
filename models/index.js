/* 
  Sequelize 
  sequelize란 nodeJS에서 mysql을 사용할 때 raw Query문을 사용하지 않고 더욱 쉽게 다룰 수 있도록
  도와주는 라이브러리이다.
  sequelize는 ORM(Object-Relational Mapping)로 분류가 됩니다.
  ORM이란 객체와 관계형 데이터베이스의 관계를 매핑 해주는 도구이다.
  sequelize를 사용하면 raw Query문을 사용하지 않고 자바스크립트를 이용해서 mysql을 사용할 수 있다.
*/
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
