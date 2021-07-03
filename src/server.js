const express = require('express');
const path = require('path');
const pages = require("./routes")

const server = express();

server
.use(express.urlencoded({extended: true}))

.use(express.static("public"))
.engine('html', require('ejs').renderFile)
.set('view engine', 'html')
.set("views",path.join(__dirname,"views"))

.get('/', pages.forms);

server.listen(5500);