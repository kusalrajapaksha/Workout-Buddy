const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose');

//get all workouts
const getWorkouts = async (req,res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1}) //descending order

    res.status(200).json(workouts)
}

//get a single workout
const getWorkout = async (req,res) => {
    const { id } = req.params

    //check the validity of id before finding
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such workout id'})
    }
    
    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}


//create a new workout
const createWorkout = async (req,res) => {
    const {title, load, reps} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    //add doc to db
    try{
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

//delete a workout
const deleteWorkout = async(req,res) => {
    const { id } = req.params

    //check the validity of id before finding
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such workout id'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async(req,res) => {
    const { id } = req.params

    //check the validity of id before finding
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such workout id'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!workout){
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}