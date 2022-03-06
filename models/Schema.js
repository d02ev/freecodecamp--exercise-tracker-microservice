const Mongoose = require('mongoose');

// exercise schema
const exercise_schema = Mongoose.Schema({
    username: {
        type: String
    },
    description: {
        type: String
    },
    duration: {
        type: Number
    },
    date: {
        type: String,
    },
    _id: Mongoose.Schema.Types.ObjectId
}, { versionKey: false });

// user schema
const user_schema = Mongoose.Schema({
    _id: Mongoose.Schema.Types.ObjectId,
    username: {
        type: String
    },
    log: [exercise_schema]
}, { versionKey: false });

const UserModel = Mongoose.model('User', user_schema);
const ExerciseModel = Mongoose.model('Exercise', exercise_schema);

module.exports = { UserModel, ExerciseModel };