const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();


//connecting to database
mongoose.connect(
    'mongodb+srv://mattreiley:TomBrady12@cluster0.pzaxlko.mongodb.net/?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("You have connected to the database");
        }
    } 
)



app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const mainRoute = require('../api/routes/mainroute')


app.use('/icenarc', mainRoute);


//Create app listening on port 3000 on localhost when in devlopment
const port = 7000;
app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Listening on port ${port}`)
    }
})

module.exports = app

