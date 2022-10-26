const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const StationStatus = require("../Model/stationStatus");
const Station = require("../Model/station");

//defining 2 boolean variables for fuel status
global.x = false;
global.y = false;

// add fuel arrival and departure dates
const fuelStatus = asyncHandler(async (req, res) => {
  const {
    stationId,
    dieselArrivalTime,
    petrolArrivalTime,
    diesalDepartureTime,
    petrolDepartureTime,
  } = req.body;

  const station = await Station.find(stationId);

  if (!station) {
    res.status(400);
    throw new Error("Invalid station Id");
  }

  if (petrolArrivalTime) x = true;

  if (dieselArrivalTime) y = true;

  if (petrolDepartureTime) x = false;

  if (diesalDepartureTime) y = false;

  if (
    (dieselArrivalTime && diesalDepartureTime) ||
    (petrolArrivalTime && petrolDepartureTime)
  ) {
    res.status(400);
    throw new Error("Only insert arrival or departure times");
  }

  if (dieselArrivalTime || petrolArrivalTime) {
    const fuelArrival = new StationStatus({
      station: req.body.stationId,
      dieselArrivalTime,
      petrolArrivalTime,
      petrolStatus: x,
      dieselStatus: y,
    });

    const createdFuelArrival = await fuelArrival.save();
    res.status(201).json(createdFuelArrival);
  }

  if (diesalDepartureTime || petrolDepartureTime) {
    const fuelDeparture = new StationStatus({
      owner: req.owner._id,
      diesalDepartureTime,
      petrolDepartureTime,
      petrolStatus: x,
      dieselStatus: y,
    });

    const createdFuelDeparture = await fuelDeparture.save();

    res.status(201).json(createdFuelDeparture);
  }
});

// update fuel arrival time
const updateFuelArrival = asyncHandler(async (req, res) => {
  const { dieselArrivalTime, petrolArrivalTime } = req.body;

  if (petrolArrivalTime) x = true;

  if (dieselArrivalTime) y = true;

  const fuelArrival = await StationStatus.findById(req.params.id);

  if (fuelArrival.station.toString() !== req.station._id.toString()) {
    res.status(401);
    throw new Error("Cannot perform this action");
  }

  if (fuelArrival) {
    (fuelArrival.dieselArrivalTime = dieselArrivalTime),
      (fuelArrival.petrolArrivalTime = petrolArrivalTime),
      (fuelArrival.petrolStatus = x),
      (fuelArrival.dieselStatus = y);

    const updatedFuelArrival = await fuelArrival.save();
    res.json(updatedFuelArrival);
  } else {
    res.status(404);
    throw new Error("Arrival Time not found");
  }
});

// update fuel departure time
const updateFuelDeparture = asyncHandler(async (req, res) => {
  const { diesalDepartureTime, petrolDepartureTime } = req.body;

  if (petrolDepartureTime) x = true;

  if (diesalDepartureTime) y = true;

  const fuelDeparture = await StationStatus.findById(req.params.id);

  if (fuelDeparture.owner.toString() !== req.owner._id.toString()) {
    res.status(401);
    throw new Error("Cannot perform this action");
  }

  if (fuelDeparture) {
    (fuelDeparture.diesalDepartureTime = diesalDepartureTime),
      (fuelDeparture.petrolDepartureTime = petrolDepartureTime),
      (fuelDeparture.petrolStatus = x),
      (fuelDeparture.dieselStatus = y);

    const updatedFuelDeparture = await fuelDeparture.save();
    res.json(updatedFuelDeparture);
  } else {
    res.status(404);
    throw new Error("Departure Time not found");
  }
});

// exporting the methods
module.exports = {
  fuelStatus,
  updateFuelArrival,
  updateFuelDeparture,
};
