const homeRoutes = require('./homeRoutes');
const studentRoutes = require('./studentRoutes');
const homeworkRoutes = require('./homeworkRoutes');
const subjectRoutes = require('./subjectRoutes');
const chatRoutes = require('./chatRoutes');
const db = require('./db');
const django = require('./django');


module.exports = {
    homeRoutes: homeRoutes,
    studentRoutes,
    homeworkRoutes,
    subjectRoutes,
    chatRoutes,
    db,
    django,
};