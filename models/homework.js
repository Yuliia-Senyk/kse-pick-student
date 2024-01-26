const mongoose = require("mongoose");
const Schema =  require("mongoose").Schema;

const HomeworkSchema = new Schema({
    number: Number,
    title: String,
    description: String,
    endDate: Date
});

const Homework = mongoose.model('Homework', HomeworkSchema);

module.exports = {
    HomeworkSchema,
    Homework,
};