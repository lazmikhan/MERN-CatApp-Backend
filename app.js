const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const cookieParser= require('cookie-parser');
const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const stripe = require('stripe');
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests from this origin
    credentials: true,  // Allow credentials (cookies) to be sent
  }))
app.use(express.static('./images'))
app.use(cookieParser())
app.use(bodyParser.json())
// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.



// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;
// let endpointSecret = "whsec_6dc6cb3973329b67c5532d2c52eb312f2c3ba6e859fd6d16e8a7cf2a069649d5";

app.post('/webhook', express.raw({type: 'application/json'}), async(request, response) => {

  const sig = request.headers['stripe-signature'];

 let data;
 let eventType;

 if(endpointSecret)
  {
    let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      console.log(`Webhook Error: ${err.message}`)
      return;
    }
    data = event.body.data.object;
    eventType= event.type;
  }else{
    data =request.body.data.object;
    eventType= request.body.type;

  }

  // Handle the event
  switch (eventType) {
    case 'checkout.session.completed':
      console.log("success",data)
      const Donation = await DonationModel.create({
        amount: data.amount_total,
        transactionId: "not applicable",
        accountType:'card',
        donorDetails:{
          name: data.customer_details.name,
          email:data.customer_details.email,
          id:data.metadata?.userId,
          status:'pending'
        }
      });
  const userId = await UserModel.findById(data.metadata?.userId);
  const user = await userId.donations.push({_id:Donation._id, amount:Donation.amount, transactionId:Donation.transactionId});
  const updatedUser = await userId.set(user).save();
  console.log(updatedUser);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${eventType.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});


const AdoptionPostsRoute = require('./Routes/AdoptionPostsRouter');
const MissingPostsRoute = require('./Routes/MissingPostsRouter.js')
const HospitalsRoute = require('./Routes/HospitalsRoute.js')
const AppointmentRoute = require('./Routes/AppointmentRouter.js')
const DonationRoute = require('./Routes/DonationRoute.js')
const ShopRoute = require('./Routes/ShopRoute.js')
const UserRoute = require('./Routes/UserRoute.js');
const UserModel = require('./Models/User.js');
const DonationModel = require('./Models/Donate.js');
mongoose.connect(process.env.DATABASE).then(()=>{
    console.log('Database connection is successfull')
})
app.use('/api/v1/adoptionPosts', AdoptionPostsRoute)
app.use('/api/v1/missingPosts', MissingPostsRoute)
app.use('/api/v1/hospitals', HospitalsRoute)
app.use('/api/v1/appointments', AppointmentRoute)
app.use('/api/v1/donations', DonationRoute)
app.use('/api/v1/shops', ShopRoute)
app.use('/api/v1', UserRoute)
app.get('/',(req, res)=>{

      
res.send("App is running")
})

module.exports = app;