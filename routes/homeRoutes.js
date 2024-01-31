const express = require('express');
const router = express.Router();


const homeController = require('../controllers/homeController');

router.get('/', homeController.getHomePage);

router.get('/setCookiehttpOnly', (req, res) => {
    res.cookie('cookiehttpOnly', 'Hello from server!', { maxAge: 900000, httpOnly: true });
    res.send('Cookie has been set!');
});

router.get('/setCookie2', (req, res) => {
    res.cookie('myCookie2', 'Hello from server!', { maxAge: 900000 });
    res.send('Cookie has been set!');
});


router.get('/getCookie', (req, res) => {
    console.log('req.cookies', req.headers);
    const myCookieValue = req.cookies?.myCookie;
    res.send(`Value of myCookie: ${myCookieValue}`);
    console.log('res', res.headers)
});

module.exports = router;