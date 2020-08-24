var Player = require('./Player.js').default;


var Game = function (id) {
    this.id = id;
    this.players = [];
    this.alreadyStarted = false;
    this.winnerScore = 20; // determinates the score players try to gain

    this.addPlayer = function (user) {
        this.players.push(user);
    };

    this.deletePlayer = function (userId) {
        playerIndx = this.players.findIndex(player => player.id == userId);
        this.players.splice(playerIndx,1);
    }

    this.canJoinGame = function (user) {
        // can't join the game if it has already started or 
        let alreadyIn = this.players.find(player => player.name === user.name);
        if (alreadyIn != undefined || this.alreadyStarted == true){
            return false;
        }else {return true;}
        
    };

    this.startGame = function () {
        this.players[0].usersTurn = true;
        this.alreadyStarted = true;
    };

    this.someoneWon = function(){
        let someoneWon = this.players.filter(function (e, i, a) {
            return (e.currentScore === this.winnerScore);
        });
        if (someoneWon.length === 1){
            return someoneWon[0];
        }
        else {
            return false;
        }
    };

    this.goToTheNext = function () {
        this.players[0].usersTurn = false;
        this.players.push(this.players.shift());
        this.players[0].usersTurn = true;
        return this.whoNow();
    };

    this.whoNow = function(){

        // return player who has usersTurn == true;
    };

    this.endGame = function () {
        for (let i=0; i<this.players.length;i++){
           this.players[i].currentScore = 0;
        }
    }

};

module.exports = Game;