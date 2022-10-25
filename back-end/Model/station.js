const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

    // position: {

    //         latitude :{
    //             type:double,
    //             required: false
    //         },
    //         longtiude: {
    //             type:double,
    //             required: false
    //         },

    // },

    latitude: {
      type: double,
      required: false,
    },
    longtiude: {
      type: double,
      required: false,
    },

    contactnumber: {
      type: String,
      required: true,
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

const Station = mongoose.model("Station", stationSchema);

module.exports = Station;
