const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const Station = require("../Model/station");

const getStations = asyncHandler(async (req, res) => {
  const stations = await Station.find({ owner: req.owner._id });
  res.json(stations);
});

const createStation = asyncHandler(async (req, res) => {
  const { stationname, address, latitude, longtiude, contactnumber } = req.body;

  if (!stationname || !address || !latitude || !longtiude || !contactnumber) {
    res.status(400);
    throw new Error("Cannot be empty fields");
  } else {
    const station = new Station({
      owner: req.owner._id,
      stationname,
      address,
      latitude,
      longtiude,
      contactnumber
    });

    const createdStation = await station.save();

    res.status(201).json(createdStation);
  }
});

const getStationById = asyncHandler(async (req, res) => {
  const station = await Station.findById(req.params.id);

  if (station) {
    res.json(station);
  } else {
    res.status(404).json({ message: "Station not found" });
  }
});

const updateStation = asyncHandler(async (req, res) => {
  const { stationname, address, latitude, longtiude, contactnumber } = req.body;

  const station = await Station.findById(req.params.id);

  if (station.owner.toString() !== req.owner._id.toString()) {
    res.status(401);
    throw new Error("Cannot perform this action");
  }

  if (station) {
    station.stationname = stationname,
    station.address=address,
    station.latitude = latitude,
    station.longtiude=longtiude,
    station.contactnumber=contactnumber;

    const updatedStation = await station.save();
    res.json(updatedStation);
  } else {
    res.status(404);
    throw new Error("Station not found");
  }
});

const deleteStation = asyncHandler(async (req, res) => {
  const station = await Station.findById(req.params.id);

  if (station.owner.toString() !== req.owner._id.toString()) {
    res.status(401);
    throw new Error("Cannot perform this action");
  }

  if (station) {
    await station.remove();
    res.json({ message: "Your station Deleted" });
  } else {
    res.status(404);
    throw new Error("My station not found");
  }
});
module.exports = {
  getStations,
  createStation,
  getStationById,
  updateStation,
  deleteStation,
};
