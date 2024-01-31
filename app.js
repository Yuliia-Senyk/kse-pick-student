const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./mongooseConnection');
const PORT = require('./configs/port');
const routes = require('./routes');
const cookies = require("cookie-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', 'views');
app.use(cookies());

mongoose.set('strictQuery', false);

app.use('/', routes.homeRoutes);
app.use('/students', routes.studentRoutes);
app.use('/homeworks', routes.homeworkRoutes);
app.use('/*', routes.homeRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


