async function getHomePage (req, res) {
    try {
        res.render('home');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getHomePage
};

