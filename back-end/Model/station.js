const mongoose = require("mongoose");

const stationSchema = mongoose.Schema(
  {
    stationname: {
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

    contactnumber: {
      type: String,
      required: true,
    },

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

const Station = mongoose.model("Station", stationSchema);

module.exports = Station;
