const express = require('express');
const bodyParser = require('body-parser')
require("dotenv").config();
const db = require("./src/models/db")
db.sync()
const user = require("./src/routes/user")
const object = require("./src/routes/object")
const objectPlace = require("./src/routes/objectPlace")
const place = require("./src/routes/place")
const context = require("./src/routes/user")

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Estamos on');
})

app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`);
    
})