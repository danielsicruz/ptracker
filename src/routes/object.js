const express = require("express");
const { route } = require("express/lib/application");
let router = express.Router();
const objectService = require("../services/objectService");

router.post("/", objectService.create);
router.get("/", objectService.select);
router.get("/:id", objectService.getOne);
router.put("/:id", objectService.update);
//srouter.delete("/:id", objectService.delete)

module.exports = router;