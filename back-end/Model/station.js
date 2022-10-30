const mongoose = require("mongoose");

const stationSchema = mongoose.Schema(
  {
    stationName: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    latitude: {
      type: Number,
      required: false,
    },
    longtiude: {
      type: Number,
      required: false,
    },

    contactNumber: {
      type: String,
      required: true,
    },

    fuel: [
      {
        petrolArrivalTime: String,
        dieselArrivalTime: String,
        dieselDepartureTime: String,
        petrolDepartureTime: String,
        petrolStatus: Boolean,
        dieselStatus: Boolean,
      },
    ],

    queue: [
      {
        enteredTime: String,
        leaveTime: String,
        bikeQueueLength: Number,
        carQueueLength: Number,
        vanQueueLength: Number,
        busQueueLength: Number,
      },
    ],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Owner",
    },
  },

  {
    timestamps: true,
  }
);

const StationNew = mongoose.model("StationNew", stationSchema);

module.exports = StationNew;
