const express = require('express');
const redis = require('redis');
const axios = require('axios');

const app = express();
const port = 3000;

let redisClient;

(async () => {
    redisClient = redis.createClient({
        host: '127.0.0.1',
        port: 6379
    });
    redisClient.on('error', (e) => console.log('Error redisClient', e));
    redisClient.on('connection', (con) => console.log('redisClient connected', con));

    await redisClient.connect();
})()



app.get('/:todoId', getTodoData);
async function getTodoDataDirectly(req, res, next) {
    const todoId = req.params.todoId;
    let results;
    results = await fetchApiData(todoId);
    res.send({
        fromCache: false,
        data: results
    })
}


async function getTodoData(req, res, next) {
    const todoId = req.params.todoId;
    let results;
    let cached = false;

    try {
        const cachedResults = await redisClient.get(todoId);
        if(cachedResults) {
            cached = true;
            results = JSON.parse(cachedResults);
        } else {
            results = await fetchApiData(todoId);
            await redisClient.set(todoId, JSON.stringify(results))
        }

        res.send({
            fromCache: cached,
            data: results
        })
    }
    catch(e) {
        console.log('error in getTodoData', e)
    }
}

async function fetchApiData(id) {
    const apiResponse = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
    return apiResponse.data;
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
