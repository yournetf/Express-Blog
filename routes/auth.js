const { error } = require('console');
var express = require('express');
var router = express.Router();
const fs = require("fs");
const userDBFileName = "./model/userDB.json";

function readUserDB() {
    let data = fs.readFileSync(userDBFileName, "utf-8");
    return JSON.parse(data);
}

function writeUserDB(users){
    let data = JSON.stringify(users, null, 2);
    fs.writeFileSync(userDBFileName, data, "utf-8");
}

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/signup', function(req, res, next) {
    res.render('signup');
});

router.post("/login/submit", (req, res) => {
    let userDB = readUserDB();
    const username = req.body.username;
    const password = req.body.password;
    for(user of userDB){
        if(user.username === username
             && user.password === password){
                res.redirect("/home");
        }
        else{
            const loginError = {
                message:    "Login failed. Please try again",
                status:     "403 forbidden",
                stack:      ""
            }
            res.render("error", {error: loginError})
        }
    }
});

router.post("/signup/submit", (req, res) => {
    let userDB = readUserDB();
    const username = req.body.username;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const email    = req.body.email;

    for(user of userDB){
        if(username === user.username || email === user.email){
            const signupError = {
                message:    "The email or username is already taken",
                status:     "403 forbidden access",
                stack:      ""
            }
            res.render(error, {error: signupError});
        }
        else{
            userDB.push({
                username: username,
                password: password,
                fullName: fullName,
                email: email
            });
            writeUserDB(userDB);
            res.redirect("/login");
        }
    }



})

module.exports = router;