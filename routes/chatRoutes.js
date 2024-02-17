const express = require('express');
const router = express.Router();


async function getBdHandlers(req, res) {
    try {
        res.render('chat');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error with chat' });
    }
}

async function getChatPage(req, res) {
    try {
        res.render('chat');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error with chat' });
    }
}
router.get('/', getChatPage);
router.get('/song', getChatPage);

module.exports = router;