const express = require("express");
const {
    queueIncrease,
    enteredTime,
    exitTime
} = require("../Controller/queueController");
const { protect } = require("../MiddleWares/authMiddleWare");

const router = express.Router();

router.route("/enteredtime").post(enteredTime);
router.route("/exittime").post(exitTime);
router
    .route("/:id")
    .put(protect, queueIncrease);

module.exports = router;
