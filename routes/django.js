const router = require('express').Router();
const axios = require('axios');
const DJANGO_ORIGIN = require('../configs/django-origin');

function sendJsonOnGet(req, res) {
    res.json({'msg': 'message from express on GET req'});
}

function sendJsonOnPost(req, res) {
    console.log('req.body', req.body);
    res.json({'msg': 'message from express on POST req', ...req.body});
}

async function redirectReqToDjango(req, res) {
    try {
        const djangoResponse = await axios.get(DJANGO_ORIGIN + '/playground/json');
        console.log('Django Response:', djangoResponse.data);
        res.send('Express: Request to Django successful');
    } catch (error) {
        console.error('Error making request to Django:', error.message);
        res.status(500).json({ error: 'Internal Server Error with express' });
    }
}

async function redirectPostReqToDjango(req, res) {
    try {
        const djangoResponse = await axios.post(DJANGO_ORIGIN + '/playground/json', {data: 'info from express'});
        console.log('Django Response:', djangoResponse.data);
        res.json({msg: 'Express: Request to Django successful', ...djangoResponse.data});
    } catch (error) {
        console.error('Error making request to Django:', error.message);
        res.status(500).json({ error: 'Internal Server Error with express' });
    }
}



router.get('', sendJsonOnGet);
router.post('', sendJsonOnPost);



router.get('/redirectGet', redirectReqToDjango);
router.get('/redirectPost', redirectPostReqToDjango);





module.exports = router;