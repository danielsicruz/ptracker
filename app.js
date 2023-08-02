const express = require('express');
const bodyParser = require('body-parser')
require("dotenv").config();

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