const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const AchievementSchema =  new Schema({
    title: String,
    score: Number,
    status: Boolean,
    date: {type: Date, default: Date.now},
});

const Achievement = mongoose.model('Achievement', AchievementSchema);

module.exports = {
    Achievement,
};