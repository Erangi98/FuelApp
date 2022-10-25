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

ownerSchema.pre("save", async function (next) {
  if (!this.isModified("userpassword")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.userpassword = await bcrypt.hash(this.userpassword, salt);
});

ownerSchema.methods.matchThePasswords = async function (enteredUserPassword) {
  return await bcrypt.compare(enteredUserPassword, this.userpassword);
};

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
