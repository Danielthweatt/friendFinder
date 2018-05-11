// Dependencies

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Express App Setup

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routing

require(".app/routing/apiRoutes")(app);
require(".app/routing/htmlRoutes")(app);

// Start Server

app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});  