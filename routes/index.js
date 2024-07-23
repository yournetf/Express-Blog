const { error } = require('console');
var express = require('express');
var router = express.Router();
var fs = require("fs");
var { v4 } = require('uuid');


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("jo");
  res.render('index');
});

router.get('/home', function(req, res, next) {
  let postDB = readPostDB();
  res.render("home", {postArray: postDB});
});

router.get('/compose', function(req, res, next) {
  res.render("compose");
});

const postDBFilePath = ("./model/postDB.json");

function readPostDB() {
  let data = fs.readFileSync(postDBFilePath, "utf-8");
  return JSON.parse(data);
}

function writePostDB(posts){
  let data = JSON.stringify(posts, null, 2);
  fs.writeFileSync(postDBFilePath, data, "utf-8");
}

router.post("/post/submit", (req, res)=>{
  const title = req.body.title;
  const body  = req.body.body;
  let id = v4();


  let postDB = readPostDB();

  postDB.push({
    id: id,
    title: title,
    body: body, 
    timePosted: new Date().toLocaleString()
  });

  writePostDB(postDB);
  res.redirect("/home");
});

module.exports = router;
