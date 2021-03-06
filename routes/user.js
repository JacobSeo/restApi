const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require('crypto');

router.get('/sign_up', function(req, res, next) {
  res.render("user/signup");
});

router.post("/sign_up", function(req,res,next){
  let body = req.body;

  let inputPassword = body.password;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  let result = models.user.create({
    name: body.userName,
    email: body.userEmail,
    password: hashPassword,
    salt: salt
  })

  res.redirect("/users/sign_up");
})

// 메인 페이지
router.get('/', function(req, res, next) {
  res.send('환영합니다~');
});

// 로그인 GET
router.get('/login', function(req, res, next) {
  let session = req.session;

  res.render("user/login", {
    session : session
  });
});

// 로그인 POST
router.post("/login", async function(req,res,next){
  let body = req.body;

  let result = await models.user.findOne({
    where: {
      email : body.userEmail
    }
  });

  let dbPassword = result.dataValues.password;
  let inputPassword = body.password;
  let salt = result.dataValues.salt;
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(dbPassword === hashPassword){
    console.log("비밀번호 일치");
    // 세션 설정
    req.session.email = body.userEmail;
    req.session.issession = true;
    res.redirect("/");
  }
  else{
    console.log("비밀번호 불일치");
    res.redirect("/users/login");
  }
});

// 로그아웃
router.get("/logout", function(req,res,next){
  req.session.destroy();
  res.clearCookie('sid');

  res.redirect("/");
})


router.get('/list', async function(req, res, next) {
  let result = await models.user.findAll().then(function(users){
      let data = new Array();
      for(var index in users){
        let user = {};
        user.name = users[index].dataValues.name;
        user.email = users[index].dataValues.email;
        user.salt = users[index].dataValues.salt;
        user.createdAt = users[index].dataValues.createdAt;
        data.push(user);
      }

      data = JSON.parse(JSON.stringify(data));
      console.log(data);
      res.render("user/userM", {data : data});
  });
});
 
module.exports = router;