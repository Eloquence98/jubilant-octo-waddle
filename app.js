"use strict"

const express = require("express");
const bP = require("body-parser");
const ejs = require("ejs");
const variables = require(__dirname +"/variables.js");


const app = express();
// port
const project = "BABC"
const port = 3000
// set view engine ejs or any other you prefer
app.set("view engine", "ejs");
// privide static files
app.use(express.static("public"));



















// include this when about to diploy = process.env.PORT ||
// listening for/from home
app.get('/', (req, res) => {
    res.render("index.ejs" , {goalsArticles: variables.goalsArticles});
})

// app shall listen to port 3000
app.listen(port, () => {
    console.log(`${project} app listening on port ${port}`)
})