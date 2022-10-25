const express = require("express");
const {
  getFuelArrival,
  createFuelArrival,
  updateFuelArrival,
} = require("../Controller/fuelArrivalController");
const { protect } = require("../MiddleWares/authMiddleWare");

const router = express.Router();

router.route("/").get(protect, getFuelArrival);
router.route("/createFuelArrival").post(protect, createFuelArrival);
router
  .route("/:id")
  .put(protect, updateFuelArrival);
 

module.exports = router;
