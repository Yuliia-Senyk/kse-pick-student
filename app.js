const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const WebSocket = require('ws');
const bodyParser = require('body-parser');
const mongoose = require('./mongooseConnection');
const PORT = require('./configs/port');
const routes = require('./routes');
require('dotenv').config();
const ErrorHandler = require("./middlewares/error-handler.js");
const logFile = fs.createWriteStream('./logs/myLogFile.log', {flags: 'a'});
const logFileErrors = fs.createWriteStream('./logs/myLogFileErrors.log', {flags: 'a'});

const app = express();

app.locals.env = process.env;
app.use(morgan('tiny', { stream: logFile }));
app.use(morgan('common', { stream: logFileErrors, skip: function (req, res) { return res.statusCode < 400 }  }));


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', 'views');

mongoose.set('strictQuery', false);

app.use((req, res, next) => {
    console.log("Middleware 1 called.", req.path)
    next()
})

app.use('/', routes.homeRoutes);
app.use('/students', routes.studentRoutes);

// test error route
app.get('/error', (req, res, next) => {
    try {
        throw new Error('hello, i am error')
    } catch(err) {
        next(err);
    }
});

// test async  error route
app.use('/error-async', (req, res, next) => {
    setTimeout(() => {
        console.log("Async code example.")
        try {
            throw new Error('hello, i am asyn error')
        } catch(err) {
            next(err);
        }
    }, 1000)
});
app.get('/favicon.ico', (req, res) => res.status(204));

app.use('/homeworks', routes.homeworkRoutes);
app.use('/chat', routes.chatRoutes);
app.use('/*', routes.homeRoutes);

app.use((req, res, next) => {
    console.log("Last middleware called?")
})

app.use(ErrorHandler)

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const wss = new WebSocket.Server({ server: server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.send(Buffer.from('Welcome to the WebSocket server!', 'utf-8'));

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
