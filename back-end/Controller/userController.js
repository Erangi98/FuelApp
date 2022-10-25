const User = require("../Model/user");
const asyncHandler = require("express-async-handler");
const generateToken = require("../Utils/generateToken");

const signUpUser = asyncHandler(async (req, res) => {
  const { fullname, username, useremail, userpassword } = req.body;

  const userAlreadyExists = await User.findOne({ useremail });

  if (userAlreadyExists) {
    res.status(400);
    throw new Error("Error! User Already Exists!");
  }

  const user = await User.create({
    fullname,
    username,
    useremail,
    userpassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      useremail: user.useremail,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error...Something Worng! ");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { username, userpassword } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchThePasswords(userpassword))) {
    res.json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      useremail: user.useremail,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error...Invalid Email or Password! ");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { fullname, username, useremail, contactnumber } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.fullname = req.body.fullname || user.fullname;
    user.username = req.body.username || user.username;
    user.contactnumber = req.body.contactnumber || user.contactnumber;

    if (req.body.userpassword) {
      user.userpassword = req.body.userpassword;
    }

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      fullname: updateUser.fullname,
      username: updateUser.username,
      contactnumber: updateUser.contactnumber,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found...");
  }
});

// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     user.username = req.body.username || user.username;
//     user.useremail = req.body.useremail || user.useremail;

//     if (req.body.userpassword) {
//       user.userpassword = req.body.userpassword;
//     }

//     const updateUser = await user.save();

//     res.json({
//       _id: updateUser._id,
//       username: updateUser.username,
//       useremail: updateUser.useremail,
//       isAdmin: updateUser.isAdmin,
//       token: generateToken(updateUser._id),
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found...");
//   }
// });

module.exports = { signUpUser, authUser, getUsers, getUserById, updateUser };
