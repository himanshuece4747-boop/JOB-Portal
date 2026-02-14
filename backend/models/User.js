const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // hides password unless explicitly selected
    },

    role: {
      type: String,
      enum: ["jobseeker", "employer"],
      
    },

    avatar: String,
    resume: String,

    // employer fields
    companyName: String,
    companyDescription: String,
    companyLogo: String,
  },
  {
    timestamps: true,
  }
);


// ✅ Encrypt password before save (FIXED — no next)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


// ✅ Compare entered password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model("User", userSchema);