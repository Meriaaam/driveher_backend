var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");


const EMAIL_REGEX =
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


// SIGN UP ROOTS
router.post("/signup", (req, res) => {
  if (
    !checkBody(req.body, [
      "firstName",
      "lastName",
      "phoneNumber",
      "email",
      "password",
    ])
  ) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  // Check if the user has not already been registered
  User.findOne({ email: req.body.email }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        firstName: req.body.firstName.toLowerCase(),
        lastName: req.body.lastName.toLowerCase(),
        phoneNumber: req.body.phoneNumber.toLowerCase(),
        email: req.body.email.toLowerCase(),
        password: hash,
        token: uid2(32),
      });

      if(!EMAIL_REGEX.test(newUser.email)){
        res.json({result:false, error:"Email not valide"})
      }
      else{
        newUser.save().then((newDoc) => {
          res.json({ result: true, user: newDoc });
        });
      }

    } else {
      // User already exists in database
      res.json({ result: false, error: "User already exists" });
    }
  });
});

// SIGN IN ROOTS
router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  // User already exists in database or wrong password
  User.findOne({ email: req.body.email.toLowerCase()}).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, user: data });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

module.exports = router;
