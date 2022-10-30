const Queue = require("../Model/station");
const asyncHandler = require("express-async-handler");

// initializing varibles for the queue lengths
let bike = 0;
let car = 0;
let van = 0;
let bus = 0;

// calcaulating the queue length by vehicle type
const queueIncrease = asyncHandler(async (req, res) => {
  const { vehicleType } = req.body;
  const { id } = req.params;
  const queue = await Queue.findById(req.params.id);

  if (queue) {
    if (vehicleType !== null) {
      if (vehicleType == "bike") {
        bike++;
      }
      if (vehicleType == "car") {
        car++;
      }
      if (vehicleType == "van") {
        van++;
      }
      if (vehicleType == "bus") {
        bus++;
      }
    }
    const lengths = await Queue.findByIdAndUpdate(
      { _id: id },
      {
        success: true,
        $set: {
          queue: [
            {
              bikeQueueLength: bike,
              carQueueLength: car,
              vanQueueLength: van,
              busQueueLength: bus,
            },
          ],
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (lengths) {
      res.json({
        bikeQueueLength: bike,
        carQueueLength: car,
        vanQueueLength: van,
        busQueueLength: bus,
      });
    }
  }
});

//decrese queue size by category when exiting the queue
const queueDecrease = asyncHandler(async (req, res) => {
  const { vehicleType } = req.body;
  const { id } = req.params;
  const queue = await Queue.findById(req.params.id);

  if (queue) {
    if (vehicleType !== null) {
      if (vehicleType == "bike") {
        bike--;
      }
      if (vehicleType == "car") {
        car--;
      }
      if (vehicleType == "van") {
        van--;
      }
      if (vehicleType == "bus") {
        bus--;
      }
    }
    const lengths = await Queue.findByIdAndUpdate(
      { _id: id },
      {
        success: true,
        $set: {
          queue: [
            {
              bikeQueueLength: bike,
              carQueueLength: car,
              vanQueueLength: van,
              busQueueLength: bus,
            },
          ],
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (lengths) {
      res.json({
        bikeQueueLength: bike,
        carQueueLength: car,
        vanQueueLength: van,
        busQueueLength: bus,
      });
    }
  }
});

// user entered time for the queue
const enteredTime = asyncHandler(async (req, res) => {
  const { enteredTime } = req.body;

  const enter = await Queue.create(enteredTime);

  res.status(200).json(enter);
});

// user exites time of the queue
const exitTime = asyncHandler(async (req, res) => {
  const { exitedTime } = req.body;

  const quit = await Queue.create(exitedTime);

  res.status(200).json(quit);
});

// exporting the methods
module.exports = { queueIncrease, queueDecrease, enteredTime, exitTime };
