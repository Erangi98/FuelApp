const express = require("express");
const {
  signUpUser,
  authUser,
  updateUserProfile,
} = require("../Controller/userController");
const { protect } = require("../Middlewares/authMiddleWareUser");

const router = express.Router();

router.route("/signUp").post(signUpUser);
router.route("/signInUser").post(authUser);
router.route("/profileUser").post(protect, updateUserProfile);

module.exports = router;
