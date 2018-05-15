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
            potentialFriends.push({
                name: potentialFriend.name, 
                photo: potentialFriend.photo, 
                score: Math.abs(potentialFriendsTotalScore - myTotalScore)
            });
        });
        friends.push(req.body);
        let match = {
            name: "",
            photo: "",
            score: 41
        };
        potentialFriends.forEach(function(potentialFriend){
            if (match.score > potentialFriend.score) {
                match.name = potentialFriend.name;
                match.photo = potentialFriend.photo;
                match.score = potentialFriend.score;
            }
        });
        res.send(match);
    });
};