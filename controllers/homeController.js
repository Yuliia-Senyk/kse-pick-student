async function getHomePage (req, res) {
    try {
        res.render('home');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
function getInfoPage (req, res) {
    res.send('getInfoPage sent');
};

module.exports = {
    getInfoPage,
    getHomePage
};

