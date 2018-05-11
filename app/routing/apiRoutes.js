// Importing Friend Data

const friends = require("../data/friends");

// API Routing

module.exports = function(app){

    app.get("/api/friends", function(req, res){
        return res.json(friends);
    });    

};