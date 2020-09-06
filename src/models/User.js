const mongoose = require("mongoose");
const { isEmail } = require("../helpers/validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return isEmail(value);
      },
      message: (props) => `${props.value} is not valid`,
    },
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(); // default 10
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("incorrect email");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("incorrect password");

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
