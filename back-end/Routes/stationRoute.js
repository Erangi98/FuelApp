
const express = require("express");
const {
  getStations,
  createStation,
  getStationById,
  updateStation,
  deleteStation,
} = require("../Controller/stationController");
const { protect } = require("../MiddleWares/authMiddleWare");

const router = express.Router();

router.route("/").get(protect, getStations);
router.route("/createstation").post(protect, createStation);
router
  .route("/:id")
  .get(getStationById)
  .put(protect, updateStation)
  .delete(protect, deleteStation);

module.exports = router;
