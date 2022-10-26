const express = require("express");
const {
    queueIncrease
} = require("../Controller/queueController");
const { protect } = require("../MiddleWares/authMiddleWare");

const router = express.Router();

router
    .route("/:id")
    .put(protect, queueIncrease);

module.exports = router;
