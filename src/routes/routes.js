const express = require('express');
const router = express.Router();

const user = require("./user")
const object = require("./object")
const objectPlace = require("./objectPlace")
const place = require("./place")
const context = require("./context")
const movement = require("./movement")
const check = require("./check")

router.use('/v1/user', user);
router.use('/v1/object', object);
router.use('/v1/objectplace', objectPlace);
router.use('/v1/place', place);
router.use('/v1/context', context);
router.use('/v1/movement', movement);
router.use('/v1/check', check);

module.exports = router;