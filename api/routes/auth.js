const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello auth');
})

router.get('/register', (req, res) => {
    res.send('Hello auth register');
})


module.exports = router