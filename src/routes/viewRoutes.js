const express = require('express');
const router = express.Router();

router.get("/login", (req, res) =>{
    res.render('login');
});
router.get("/home", (req, res) =>{
    res.render('home');
});
router.get("/place", (req, res) =>{
    res.render('place',{place:{
        
    }});
});

module.exports = router;