const express = require('express');
const router = express.Router();


async function getChatPage(req, res) {
    try {
        res.render('chat');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error with chat' });
    }
}
router.get('/', getChatPage);

module.exports = router;