const mongoose = require("mongoose");

const fuelDepartureSchema = mongoose.Schema(
  {
    diesalDepartureTime: {
      type: String,
    },

    petrolDepartureTime: {
      type: String,
    },

    petrolStatus: {
      type: Boolean,
    },

    dieselStatus: {
      type: Boolean,
    },

    owner: {
      //can use according to the requirements
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Owner",
    },
  },

  {
    timestamps: true,
  }
);

const FuelDeparture = mongoose.model("FuelDeparture", fuelDepartureSchema);

module.exports = FuelDeparture;
