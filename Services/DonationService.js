const Donations = require("../Models/Donate.js");
const UserModel = require("../Models/User.js");
const stripe = require('stripe')('sk_test_51PH9Lc2LmJt2xppcwPhSQ5ZlU8Zdc5kp2RFfob7oxXKCNY045sVu4ndjnCxg9P0rYoFjS2PrVEaF5YD9rxj0qyuY0016OULuyc');
module.exports.getDonationsService = async () => {
  const donations = await Donations.find({});

  return donations;
};
module.exports.getByIdDonationsService = async (id, data) => {
  const Donation = await Donations.findById(id);

  return Donation;
};
module.exports.postDonationsService = async (data) => {
  const Donation = await Donations.create(data);
  const userId = await UserModel.findById(data.donorDetails.id);
  const user = await userId.donations.push({_id:Donation._id, amount:Donation.amount, transactionId:Donation.transactionId});
  const updatedUser = await userId.set(user).save();
  console.log(updatedUser);
  return Donation;

};

module.exports.updateDonationService = async (id, data) => {
  const DonationId = await Donations.findById(id);
  const Donation = await DonationId.set(data).save();
  return Donation;
};

module.exports.deleteDonationService = async (id,data) => {
  const Donation = await Donations.deleteOne({ _id: id });
  const userId = await UserModel.findById(data.userId);
  const donationIndex = userId.donations.findIndex(donation => donation._id.equals(id));
  const newDonations = userId.donations.filter((donation)=> donation !=userId.donations[donationIndex]);
  userId.donations= newDonations;
  const updatedUserId = await userId.save();
  return Donation;


};
module.exports.addStripePayment=async (data)=>{
try{
  const storeItems = new Map([
    [ 50, { priceInCents: 50, name:"Donation Category1"},],
    [ 100, { priceInCents: 100, name:"Donation Category2"},],
    [ 500, { priceInCents: 500, name:"Donation Category3"},],
    [ 1000, { priceInCents: 1000, name:"Donation Category4"},],
   
   ])
   const strItems = storeItems.get(data.amount);
   const session = await stripe.checkout.sessions.create({
     payment_method_types:['card'],
     line_items: [
       {
         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
     price_data:{
       currency:'usd',
       product_data: {
         name: "Donation"
       },
       unit_amount: data.amount
     },
     quantity:1
       
       },
     ],
     mode: 'payment',
     success_url: `${"http://localhost:3001/donate"}?success=true`,
     cancel_url: `${"http://localhost:3001/donate"}?canceled=true`,
   });
   res.redirect(303, session.url);
}
catch(error)
{

  return {stripeError:  error};
}
  // console.log(data)
   return data.accountType;
 }