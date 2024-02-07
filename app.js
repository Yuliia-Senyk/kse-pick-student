const express = require('express');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const mongoose = require('./mongooseConnection');
const PORT = require('./configs/port');
const routes = require('./routes');
require('dotenv').config();

const app = express();

app.locals.env = process.env;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', 'views');

mongoose.set('strictQuery', false);

app.use('/', routes.homeRoutes);
app.use('/students', routes.studentRoutes);
app.use('/homeworks', routes.homeworkRoutes);
app.use('/chat', routes.chatRoutes);
app.use('/*', routes.homeRoutes);


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
