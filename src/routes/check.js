const express = require("express");
const { route } = require("express/lib/application");
let router = express.Router();
const checkService = require("../services/checkService");

router.post("/:id", checkService.create);
router.get("/", checkService.select);
router.get("/test", checkService.test);
router.put("/:id", checkService.update);
//srouter.delete("/:id", checkService.delete)

module.exports = router;