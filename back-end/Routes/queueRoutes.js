const express = require("express");
const {
  queueIncrease,
  queueDecrease,
  enteredTime,
  exitTime,
} = require("../Controller/queueController");
const { protect } = require("../MiddleWares/authMiddleWare");

const router = express.Router();

//fuel queue routes
router.route("/enteredtime").post(enteredTime);
router.route("/exittime").post(exitTime);
router.route("/:id").put(protect, queueIncrease);
router.route("/queueDecrease/:id").put(protect, queueDecrease);

module.exports = router;
