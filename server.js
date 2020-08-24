const path  = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const Player = require('./classes/Player');
const Game = require('./classes/Game');

const app  = express();
const server = http.createServer(app);
const io = socketio(server);

const startingPoint = '/';

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

let games = [];

// Run when client connects

io.on('connection', socket => {
    console.log(`Socket ${socket.id} connects` );

    socket.on('joinRoom', ({username, room_id}) => {

        let user = new Player(socket.id, username);

        var i = whichGame(room_id);
        if (i == -1){
            games.push(new Game(room_id));
            i = whichGame(room_id);
        }
        
        if (games[i].canJoinGame(user) == false){
            socket.emit('redirect', startingPoint);
        }else{
            games[i].addPlayer(user);
            socket.join(games[i].id);
            io.to(games[i].id).emit('gameUsers', {game: games[i], users: games[i].players});
        }
        
        // console.log(i);
        
    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnects` );
        
        var i = whichGamePlayer(socket.id);
        if (i >= 0){
            games[i].deletePlayer(socket.id);
            io.to(games[i].id).emit('gameUsers', {game: games[i], users: games[i].players});
        }
    })

    });


    //Broadcast when a user connects

    
});



const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


function whichGame(game){
    let idx = games.findIndex(g => g.id == game);
    return idx;
};

function whichGamePlayer(userId){
    gameIndx = games.findIndex(g => g.players.map(player => player.id).includes(userId))
    return gameIndx;
};