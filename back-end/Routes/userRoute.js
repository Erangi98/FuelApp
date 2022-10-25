const express = require("express");
const {
  signUpUser,
  authUser,
  getUsers,
  getUserById,
  updateUser,
} = require("../Controller/userController");
const { protect } = require("../Middlewares/authMiddleWareUser");

const router = express.Router();

router.route("/register").post(signUpUser);
router.route("/login").post(authUser);
router.route("/").get(getUsers);
router
  .route("/:id")
  .get(getUserById)
  .put(protect, updateUser);

module.exports = router;
