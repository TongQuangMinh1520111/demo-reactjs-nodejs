const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../modals/users");
const users = express.Router();
const jwt = require("jsonwebtoken");
const Order = require("../modals/order");
//register Method
users.post("/register", (req, res) => {
  let users = new Users(req.body);
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      users.password = hashedPassword;

      // save the new user
      users
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          res.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          res.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      res.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

//login

users.post("/login", async (req, res) => {
  try {
    let user = await Users.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(401).send({
        message: "User not found",
      });
    }

    let comparePass = await bcrypt.compare(req.body.password, user.password);

    if (comparePass) {
      //   create JWT token
      const token = jwt.sign(
        {
          userId: user._id,
          userEmail: user.email,
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );

      // convert return schema object to Json obj
      // let user = user.toJSON();

      const { password, ...userData } = user.toJSON();
      //   return success response
      return res.status(200).send({
        message: "Login Successful",
        user: userData,
        token,
      });
    } else {
      return res.status(400).send({
        message: "Passwords does not match",
        error,
      });
    }
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
  res.send({
    success: false,
  });
});
//get profile

users.get("/profile", async (req, res) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "RANDOM-TOKEN");
    console.log("decoded", decoded);
    if ((req.user = decoded)) {
      let profile = await Users.findOne({
        email: req.user.userEmail,
      });
      console.log("profile", profile);
      if (!profile) {
        return res.status(401).send({
          message: "profile not found",
        });
      } else {
        const { password, ...profileData } = profile.toJSON();
        console.log(profileData);
        return res.status(200).send({
          message: "get profile Successful",
          profile: profileData,
        });
      }
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
});
//check token
users.post("/checktoken", async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    res.status(500).send({
      message: "token was not hashed successfully",
      error,
    });
  }
});

//order

users.post("/order", async (req, res) => {
  let order = new Order(req.body);
  if (order) {
    console.log(order)
    order
      .save()
      // return success if the new user is added to the database successfully
      .then((result) => {
        res.status(201).send({
          message: "User Created Successfully",
          result,
        });
      })
      // catch error if the new user wasn't added successfully to the database
      .catch((error) => {
        res.status(500).send({
          message: "Error creating user",
          error,
        });
      });
  } else {
    res.status(500).send({
      message: "Error creating user",
    });
  }
});
module.exports = users;
