const { default: mongoose } = require("mongoose");
const UserModel = require("../models/UserModel");

async function saveUser(req, res) {
  console.log("Save: ", req.body);

  let user = UserModel({
    ...req.body,
  });
  user
    .save()
    .then((userobj) => {
      res
        .status(200)
        .json({ message: "User successfully saved!", user: userobj });
    })
    .catch((err) => {
      console.log("Error>>>>", err, typeof err);
      res.status(500).json({
        message:
          "Error saving data. Please verify that the provided data is valid.",
      });
    });

  //   res.json({ message: "Got POST request!" });
}

async function fetchUsers(req, res) {
  console.log("Fetch...");
  let users = UserModel;
  users
    .find({})
    .then((data) => {
      console.log(data);
      res.json(data).status(200);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ data: [], message: "Error fetching data!" });
    });

  //   res.json({ data: [] }).status(200);
}

function updateUser(req, res) {
  console.log("update: ", req.params);
  id = req.params.id;
  let objId = new mongoose.Types.ObjectId(id);
  UserModel.findByIdAndUpdate(objId, req.body)
    .then((user) => {
      res
        .json({ message: "Record updated sucessfully!", user: user })
        .status(200);
    })
    .catch((err) => res.status(500).json({ message: err }));
}

function deleteUser(req, res) {
  console.log("delete: ", req.params);
  id = req.params.id;
  let objId = new mongoose.Types.ObjectId(id);
  UserModel.findByIdAndDelete(objId)
    .then((user) => {
      res.json({ message: "Record deleted successfully!" }).status(200);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
}

module.exports = { saveUser, fetchUsers, updateUser, deleteUser };
