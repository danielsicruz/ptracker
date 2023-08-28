const express = require("express");
const { route } = require("express/lib/application");
let router = express.Router();
const multer = require("multer");
const path = require("path");
const objectService = require("../services/objectService");

const storage = multer.diskStorage({
    destination: './public/images/objects/',
    filename: function (req, file, cb) {
        const id = req.body.id;
        cb(null, id + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post("/", upload.single('image'), objectService.create);
router.get("/", objectService.select);
router.get("/:id", objectService.getOne);
router.put("/:id", objectService.update);
//srouter.delete("/:id", objectService.delete)

module.exports = router;