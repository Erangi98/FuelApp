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

    latitude :{
        type:double,
        required: false
    },
    longtiude: {
        type:double,
        required: false
     },

    contactnumber: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Station = mongoose.model("Station", stationSchema);

module.exports = Station;
