const express = require('express');
const bodyParser = require('body-parser')
const path = require("path")
require("dotenv").config();
const db = require("./src/models/db")
db.sync()
routes = require("./src/routes/routes")
views = require("./src/routes/viewRoutes")

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json());

app.use("/api",routes);

app.use('/', views)

app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`);
    
})