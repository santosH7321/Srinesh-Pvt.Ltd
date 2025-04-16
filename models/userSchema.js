import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      maxlength: [20, "Name cannot be more than 20 characters"],
      minlength: [3, "Name cannot be less than 3 characters"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return !v || validator.isEmail(v);
        },
        message: "Please provide a valid email",
      },
    },
    phoneNumber: {
      type: String,
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return !v || validator.isMobilePhone(v, "any", { strictMode: false });
        },
        message: "Please provide a valid phone number",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password cannot be less than 6 characters"],
    },
    role: {
      type: String,
      required: true,
      enum: ["client", "Worker", "admin"],
    },
    skills: {
      type: [String],
      default: [],
    },
    city: {
      type: String,
      required: [true, "Please provide a city"],
      trim: true,
      maxlength: [50, "City cannot be more than 50 characters"],
    },
    address: {
      type: String,
      required: [true, "Please provide an address"],
      trim: true,
      maxlength: [500, "Address cannot be more than 500 characters"],
    },
    photoUrl: {
      type: String,
      default: "https://example.com/default-avatar.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL format.");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("validate", function (next) {

  if (!this.email && !this.phoneNumber) {
    this.invalidate("email", "Either email or phone number is required");
    this.invalidate("phoneNumber", "Either email or phone number is required");
  }


  if (this.role === "Worker") {
    if (!this.phoneNumber) {
      this.invalidate("phoneNumber", "Phone number is required for Workers");
    }

    if (!this.skills || this.skills.length === 0) {
      this.invalidate("skills", "Skills are required for Workers");
    }

    if (!this.photoUrl) {
      this.invalidate("photoUrl", "Photo URL is required for Workers");
    }
  }

  next();
});

const User = mongoose.model("User", userSchema);
export default User;
