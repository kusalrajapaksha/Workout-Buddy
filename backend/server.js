require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

//express app
const app = express();
const workoutRoutes = require('./routes/workouts');

//middleware
app.use(express.json())

app.use((req,res,next)=>{
    //this is simple log of requests
    console.log(req.path, req.method);
    next();
})

//route
/*
app.get('/',(req,res)=>{
    res.json({message: "Welcome to the app"})
})
*/

//or
//We define routes in another file and export it  and import it her and use
app.use('/api/workouts', workoutRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        //listen for requests(Only once connected to databse)
        app.listen(process.env.PORT, () => {
            console.log(`Connected to db and listening on port ${process.env.PORT}`)
        })
    })
    .catch((err)=>{
        console.log(err)
    })


