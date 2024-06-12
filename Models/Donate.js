const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const DonationSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
    },
    accountType:{
type:String
    },
    transactionId: {
      type: String,
    },
    donorDetails: {
      name: String,
      email: String,
      id: {
        type: ObjectId,
        ref: "User",
      },
    },
  },
  { timestamps: true }
);

const DonationModel = mongoose.model("Donations", DonationSchema);

module.exports = DonationModel;
