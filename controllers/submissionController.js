function getHomeworkListController(req, res) {
    res.send('Homeworks list');
}

function getHomeworkController(req, res) {
    res.render('Homework by Id');
}

function postHomeworkController(req, res) {
    res.send('postHomeworkController');
}

function putHomeworkController(req, res) {
    res.send('putHomeworkController');
}

function deleteHomeworkController(req, res) {
    res.send('deleteHomeworkController');
}

module.exports = {
    getHomeworkListController,
    getHomeworkController,
    postHomeworkController,
    putHomeworkController,
    deleteHomeworkController
};