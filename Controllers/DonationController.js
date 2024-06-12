const DonationService = require("../Services/DonationService.js");
const stripe = require('stripe')('sk_test_51PH9Lc2LmJt2xppcwPhSQ5ZlU8Zdc5kp2RFfob7oxXKCNY045sVu4ndjnCxg9P0rYoFjS2PrVEaF5YD9rxj0qyuY0016OULuyc');
module.exports.fileUpload = (req, res) => {
  try {
    res.json(req.file);
  } catch (error) {
    res.send(error);
  }
};
module.exports.getDonations = async (req, res) => {
  try {
    const result = await DonationService.getDonationsService();

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "false",
      message: error,
    });
  }
};
module.exports.getByIdDonations = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await DonationService.getByIdDonationsService(id, req.body);
    console.log(result);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "false",
      message: error,
    });
  }
};
module.exports.postDonations = async (req, res) => {
  try {
   // console.log(req.body);
    const result = await DonationService.postDonationsService(req.body);
    //console.log(result);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "false",
      message: error,
    });
  }
};
module.exports.updateDonations = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await DonationService.updateDonationService(id, req.body);
    console.log(result);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "false",
      message: error,
    });
  }
};
module.exports.deleteDonations = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await DonationService.deleteDonationService(id, req.body);
    console.log(result);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "false",
      message: error,
    });
  }
};
module.exports.addStripePayment = async (req,res)=>{


    try{
      const userId= req.body.donorDetails.id;
     const customer = await stripe.customers.create({
      metadata:{
        userId: req.body.donorDetails.id,
        amount: JSON.stringify(req.body.amount)
      }
     })
       const session = await stripe.checkout.sessions.create({
         payment_method_types:['card'],
   
         line_items: [
           {
             // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
         price_data:{
           currency:'usd',
           product_data: {
             name: req.body.donorDetails.id
            
           },
           unit_amount: parseInt(req.body.amount)
         },
         quantity:1
           
           },
         ],
         metadata:{
       userId
       
      },
         mode: 'payment',
         success_url: `${"http://localhost:3000/donate"}?success=true`,
         cancel_url: `${"http://localhost:3000/donate"}?canceled=true`,
       });
    
       res.status(200).json({
        data: session.url,
      });
    }
    catch(error)
    {
    
      return {stripeError:  error};
    }
 
  

}
