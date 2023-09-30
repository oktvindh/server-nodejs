//filename controller.js
//import model
const userdb = require("../model/model");

//create and save data user
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: " data content cannot be empty! " });
    return;
  }

  //get data request form json / form-url-encoded
  const user = new userdb({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
  });

  user
    .save()
    .then((data) => {
      res.status(201).json({
        message: "success created data user",
        Data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Internal Server Error" });
    });
};

//get data user by parameter or get all data user
exports.find = (req, res) => {
  if (req.query.username) {
    const userName = req.query.username;

    userdb
      .findOne({
        username: userName,
      })
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: " cannot Found User with username " + userName });
        } else {
          res.json({
            message: "success get data user",
            Data: data,
          });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: err.message || "Internal Server Error" });
      });
  }
};

//update data user by parameter username
exports.update = (req, res) => {
  try {
    userdb
      .findOneAndUpdate({ username: req.params.username }, req.body, {
        new: true,
      })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: "Cannot update user with username " + req.params.username,
          });
        } else {
          res.json({
            message: "success update data user",
            Data: data,
          });
        }
      });
  } catch (err) {
    res.status(500).send({ message: err.message || "Internal Server Error" });
  }
};

//delete data user by spesified username in request
exports.delete = (req, res) => {
  const userName = req.params.username;

  userdb.findOneAndDelete({ username: userName }).then((data) => {
    if (!data) {
      res.status(404).send({
        message: "cannot delete user with username " + req.params.username,
      });
    } else {
      res.json({
        message: "success delete data user",
      });
    }
  });
};
