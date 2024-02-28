const mongoose = require('mongoose');
var bodyParser = require('body-parser')

const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json())
app.use(cors())
app.use(express.static('./images'))
app.use(bodyParser.json())
const AdoptionPostsRoute = require('./Routes/AdoptionPostsRouter');
const MissingPostsRoute = require('./Routes/MissingPostsRouter.js')
const HospitalsRoute = require('./Routes/HospitalsRoute.js')
const AppointmentRoute = require('./Routes/AppointmentRouter.js')
const DonationRoute = require('./Routes/DonationRoute.js')
mongoose.connect(process.env.DATABASE).then(()=>{
    console.log('Database connection is successfull')
})
app.use('/api/v1/adoptionPosts', AdoptionPostsRoute)
app.use('/api/v1/missingPosts', MissingPostsRoute)
app.use('/api/v1/hospitals', HospitalsRoute)
app.use('/api/v1/appointments', AppointmentRoute)
app.use('/api/v1/donations', DonationRoute)
app.get('/',(req, res)=>{
res.send("App is running")
})

module.exports = app;