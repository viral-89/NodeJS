const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const userModel = require("./model/user.model");
const bcrypt = require("bcrypt");
// server memory temporary
// user ni req server pase jai tyare sever ne, user kon chhe te khaber hoti nathi, mate darek req sathe user ne authorize karvo pade chhe

// user req --> server ne khaber nathi hoti user kon chhe

// cookie parser ==> save token into browser stroage
const cookieParser = require("cookie-parser");

app.use(express.json())
app.use(express.urlencoded({ extended: true}));

app.use(cookieParser());

app.get("/", (req, res)=> {
    res.cookie("username", "test@user");
    res.send("Server Homepage");
});

// data --> convert jwt --> save cookie
app.get("/jwt", (req, res) => {
    let data = {username: "test", email: "test@gmail.com", role: "admin"};

   let token = jwt.sign(data, "aabbccdd");
   console.log(token);

   res.cookie("token", token);
   res.send("go to appication and check cookie storage")
} )

// signup page
app.get("/singup", async (req, res) => {
    let createdUser = await userModel.create({
        username: "test_user",
        email: "test@user.com",
        password: "test123",
    });
    res.send(createdUser);
})

// for encrypt your password use --> bcrypt package 
// use case: when your data leack your password is safe, if you encrypt your all user password
// encrypt password stages:
// your password + salt (default 10 char) => create a hash
// in database we save hash not password
app.get("/hash", (req, res) => {
    let password = "abc@123"
    // bcrypt.hash("password", "number", (err, hash) => {})
    bcrypt.hash(password, 10, (err,hash) => {
        console.log(hash);
        res.send(hash);
    });
});
// login -- password compare (user system)



app.listen(2026, () => {
    console.log("Server is Running 🎈")
});
