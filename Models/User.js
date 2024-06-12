const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const ObjectId = mongoose.Types.ObjectId;
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      lowercase: true,

      minlength: [3, "Name must be at least 3 characters"],
    },
    mobileNo: {
      type: String,
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value);
        },
        message: "Please provide a valid phone number",
      },
    },
    email: {
      type: String,
      unique: [true, "email already registered"],
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Please provide a valid email",
      },
    },
    address: {
      type: String,
    },
    password: {
      type: String,
    },
    adoptionPosts: [
      {
        name: {
          type: String,
        },
        status: {
          type: String,
        },
        images: [
          {
            type: String,
          },
        ],
        id: {
          type: ObjectId,
          ref: "AdoptionPosts",
        },
      },
    ],
    missingPosts: [
      {
        name: {
          type: String,
        },
        status: {
          type: String,
        },
        images: [
          {
            type: String,
          },
        ],

        id: {
          type: ObjectId,
          ref: "MissingPosts",
        },
      },
    ],
    donations: [
      {
        status: {
          type: String,
          // required:[true, "required "],
          enum: {
            values: ["accepted", "pending", "rejected"],
            message: "Cannot be {{VALUE}} ",
          },
        },
        amount: {
          type: Number,
        },
        transactionId: {
          type: String,
        },
        id: {
          type: ObjectId,
          ref: "Donations",
        },
      },
    ],
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  console.log("Middleware executing");
  if (this.isModified('password')) {
  
    console.log("before:",this.password);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log("after:",this.password);
  }



  next();
});
// UserSchema.statics.login = async function (email, password) {
//   const user = await this.findOne({ email });
//   if (user) {
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       return user;
//     }
//     throw Error("Incorrect Password");
//   }
//   throw Error("Incorrect Email");
// };
const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
