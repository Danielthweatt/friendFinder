// Importing Friend Data

const friends = require("../data/friends");

// API Routing

module.exports = function(app){

    app.get("/api/friends", function(req, res){
        res.json(friends);
    });

    app.post("/api/friends", function(req, res){
        req.body.scores = req.body.scores.map(function(score){
            return parseInt(score);
        });
        const myTotalScore = req.body.scores.reduce(function(total, score){
            return total + score;
        });
        const potentialFriends = [];
        let potentialFriendsTotalScore;
        friends.forEach(function(potentialFriend){
            potentialFriendsTotalScore = potentialFriend.scores.reduce(function(total, score){
                return total + score;
            });
            potentialFriends.push([potentialFriend.name, potentialFriend.photo, 
            Math.abs(potentialFriendsTotalScore - myTotalScore)]);
        });
        friends.push(req.body);
        let match = ["", "", 41];
        potentialFriends.forEach(function(potentialFriend){
            if (match[2] > potentialFriend[2]) {
                match[0] = potentialFriend[0];
                match[1] = potentialFriend[1];
                match[2] = potentialFriend[2];
            }
        });
        res.send(match);
    });

};