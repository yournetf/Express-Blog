var express = require('express');
var router = express.Router();
var fs = require("fs");

const postDBFilePath = ("./model/postDB.json");

function readPostDB() {
    let data = fs.readFileSync(postDBFilePath, "utf-8");
    return JSON.parse(data);
}


router.get('/*', function(req, res, next) {
    let postDB = readPostDB();
    let correctPostTitle;
    let correctPostEntry; 
    for(post of postDB){
        if(req.params['0'] === post.id){
            console.log(post);
            correctPostTitle = post.title;
            correctPostBody = post.body;
        }
    }
    res.render("readpost", {postTitle: correctPostTitle, postBody: correctPostEntry});
});

module.exports = router;
