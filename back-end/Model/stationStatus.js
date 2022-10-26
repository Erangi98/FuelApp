const mongoose = require("mongoose");

const stationStatusSchema = mongoose.Schema(
  {
    petrolArrivalTime: {
      type: String,
    },

    petrolDepartureTime: {
      type: String,
    },

    diesalArrivalTime: {
      type: String,
    },

    diesalDepartureTime: {
      type: String,
    },

    petrolStatus: {
      type: String,
    },

    diesalStatus: {
      type: String,
    },

    queueBikeLength: {
      type: String,
    },

    queueCarLength: {
      type: String,
    },

    queueVanLength: {
      type: String,
    },

    queueBusLength: {
      type: String,
    },

    station: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Station",
    },
  },

  {
    timestamps: true,
  }
);

const StationStaus = mongoose.model("StationStaus", stationStatusSchema);

module.exports = StationStaus;