const router = require('express').Router();

const Achievement = require('../models').Achievement;

const list = [
    { title: 'Woke up', score: 25, status: true },
    { title: 'Did math', score: 10, status: true },
    { title: 'build web app', score:223, status: false },
    { title: 'Cleaned my room', score: 100, status: true },
    ]

async function doSmthWithDB(req, res) {
    try {
        // const result = await Achievement.insertMany(list);
        // const result = await Achievement.find({score: { $gt: 25 } });
        let updatedFields = {title: 'new achievement'}
        const result = await Achievement.updateOne({score: { $gt: 25 } }, updatedFields);
        console.log('achievemt created:', result);
        res.json(result);

    } catch (error) {
        console.error('Error creating Achievements:', error);
        res.status(500).json({ error: 'Internal Server Error with achieaments' });
    }
}

router.get('/', doSmthWithDB);

module.exports = router;