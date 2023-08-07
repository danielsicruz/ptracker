const express = require('express');
const router = express.Router();

const data = require('../dtos')

router.get("/login", (req, res) => {
    res.render('login');
});
router.get("/home", async (req, res) => {
    const homeData = await data.place.data();
    res.render('home');
});
router.get("/place", async (req, res) => {
    const placeData = await data.place.data();
    res.render('place', {
        "datas": placeData
    });
});

module.exports = router;