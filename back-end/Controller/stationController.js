const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const Station = require("../Model/station");
var moment = require("moment"); // require


//defining 2 boolean variables for fuel status
global.x = false;
global.y = false;

const createStation = asyncHandler(async (req, res) => {
  const { stationName, address, latitude, longtiude, contactNumber } = req.body;
  if (!stationName || !address || !latitude || !longtiude || !contactNumber) {
    res.status(400);
    throw new Error("Cannot be empty fields");
  } else {
    const station = new Station({
      success: true,
      owner: req.owner._id,
      stationName,
      address,
      latitude,
      longtiude,
      contactNumber,
      fuel: [
        {
          //petrolArrivalTime: Date(),
          petrolArrivalTime: moment().format("D M YYYY"),
          dieselArrivalTime: moment().format("D M YYYY"),
          petrolDepartureTime: moment().format("D M YYYY"),
          dieselDepartureTime: moment().format("D M YYYY"),
          petrolStatus: false,
          dieselStatus: false,
        },
      ],
      queue: [
        {
          enteredTime: Date(),
          leaveTime: Date(),
          bikeQueueLength: 0,
          carQueueLength: 0,
          vanQueueLength: 0,
          busQueueLength: 0,
        },
      ],
    });
    const createdStation = await station.save();

    res.status(201).json(createdStation);
  }
});

const updateFuelDetails = async (req, res) => {
  try {
    const {
      stationName,
      dieselArrivalTime,
      petrolArrivalTime,
      dieselDepartureTime,
      petrolDepartureTime,
    } = req.body;
    const { id } = req.params;

    if (petrolArrivalTime) x = true;

    if (dieselArrivalTime) y = true;

    if (petrolDepartureTime) x = false;

    if (dieselDepartureTime) y = false;

    if (
      (dieselArrivalTime && dieselDepartureTime) ||
      (petrolArrivalTime && petrolDepartureTime)
    ) {
      res.status(400);
      throw new Error("Only insert arrival or departure times");
    }

    const updateStation = await Station.findByIdAndUpdate(
      { _id: id },
      {
        success: true,
        stationName: stationName,
        $set: {
          fuel: [
            {
              petrolArrivalTime: petrolArrivalTime,
              dieselArrivalTime: dieselArrivalTime,
              dieselDepartureTime: dieselDepartureTime,
              petrolDepartureTime: petrolDepartureTime,
              petrolStatus: x,
              dieselStatus: y,
            },
          ],
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(updateStation.fuel);
  } catch (error) {
    console.log(error);
  }
};

const getStations = asyncHandler(async (req, res) => {
  const stations = await Station.find();
  res.json(stations);
});

const getStationsByOwner = asyncHandler(async (req, res) => {
  const stations = await Station.find({ owner: req.owner._id });

  res.json(stations);
});

module.exports = {
  createStation,
  updateFuelDetails,
  getStations,
  getStationsByOwner,
};
