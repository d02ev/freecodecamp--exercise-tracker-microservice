const Express = require('express');
const Mongoose = require('mongoose');
const { UserModel, ExerciseModel } = require('../models/Schema');

const Route = Express.Router();

// POST / /api/users --> save username from formdata into db
// res --> user object with _id and username property
Route.post('/', async (req, res) => {
    let user_entry = new UserModel({
        _id: new Mongoose.Types.ObjectId(),
        username: req.body.username
    });

    try {
        user_entry_save = await user_entry.save();
        res.json({ _id: user_entry_save._id, username: user_entry_save.username });
    }
    catch (err) {
        res.json({ message: err });
    }
});

// POST / /api/users/:_id/exercises --> save exercies data from formdata into db
// _:id --> is the _id generated on creation of a user
// res --> user object with exercise fields added
Route.post('/:_id/exercises', async (req, res) => {
    let u_name = await UserModel.findById(req.params._id);
    u_name = u_name.username;

    let exercise_entry = new ExerciseModel({
        _id: req.params._id,
        username: u_name,
        description: req.body.description,
        duration: req.body.duration,
        date: new Date().toDateString()
    });

    try {
        exercise_entry_save = await exercise_entry.save();
        res.json(exercise_entry_save);
    }
    catch (err) {
        res.json({ message: err });
    }
});

// GET / /api/users --> get all usernames from db, returns an array of
// objects
Route.get('/', async (req, res) => {
    try {
        const get_all_users = await UserModel.find();
        res.json(get_all_users);
    }
    catch (err) {
        res.json({ message: err });
    }
});

// GET / /api/users/:_id/logs --> retrieve full exercise log of a user with 
// _id === :_id
// count property --> number of exercises belonging to the user
// returns user object with log array of all exercises added
Route.get('/:_id/logs', async (req, res) => {
    
});

module.exports = Route;