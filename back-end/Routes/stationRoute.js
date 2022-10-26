
const express = require("express");
const {
  getStations,
  getStationsbyOwner,
  createStation,
  getStationById,
  updateStation,
  deleteStation,
} = require("../Controller/stationController");
const { protect } = require("../MiddleWares/authMiddleWare");

const router = express.Router();

router.route("/stations").get(getStations);
router.route("/").get(protect, getStationsbyOwner);
router.route("/createstation").post(protect, createStation);
router
  .route("/:id")
  .get(getStationById)
  .put(protect, updateStation)
  .delete(protect, deleteStation);

module.exports = router;
