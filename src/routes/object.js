const express = require("express");
const { route } = require("express/lib/application");
let router = express.Router();
const objectService = require("../services/objectService");

router.post("/", objectService.create);
router.get("/", objectService.select);
router.put("/:id", objectService.update);
//srouter.delete("/:id", objectService.delete)

module.exports = router;