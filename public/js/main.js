const playersList = $('#players-list');

const { username , room_id } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

const socket = io();



// Join Room
socket.emit('joinRoom', { username, room_id });

socket.on('redirect', function(destination){
    window.location.href = destination;
});

socket.on('gameUsers', ({game, users}) =>{
    showWhatGame(game.id);
    listUsers(users);
});


socket.on('message', message => {
        console.log(message);
});


function listUsers(users) {
    playersList.empty();
    users.map(user => playersList.append($("<li></li>").text(user.name)));
    console.log(playersList);
  }

function showWhatGame(gameName){
    var gameSpan = $('span#room_name');
    gameSpan.html(gameName);
}
