const {Homework} = require('../models/homework');

function createHomework(number, title, description) {
    const hw = new Homework({ number, title, description });
    return hw.save();
}

module.exports = {
    createHomework

}