const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    useremail: {
      type: String,
      required: true,
      unique: true,
    },

    userpassword: {
      type: String,
      required: true,
    },

    isAdmin: {
      //can use according to the requirements
      type: Boolean,
      required: true,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("userpassword")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.userpassword = await bcrypt.hash(this.userpassword, salt);
});

userSchema.methods.matchThePasswords = async function (enteredUserPassword) {
  return await bcrypt.compare(enteredUserPassword, this.userpassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
