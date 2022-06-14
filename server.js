// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const bodyParser = require("body-parser");
const corse = require("cors");
//port number
const port = 3000;
// using corse in express
app.use(corse());
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

///listen to the port number
app.listen(port, (req, res) => {
    console.log(`the server is runnig in port: ${port}`);
});
///requests

//get function to send project data variable to the client side
app.get("/all", getweatherData);
app.post("/postweatherdata", postweatherData);
///helper functions
//for get request
function getweatherData(req, res) {
    res.send(projectData);
}
//    for save weather data
function postweatherData(req, res) {
    let resData = req.body;

    projectData["temperature"] = resData.temperature;
    projectData["feel"] = resData.feel;
    projectData["date"] = resData.date;
    res.send("OK");
}

