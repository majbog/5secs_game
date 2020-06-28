const playersList = $('#players-list');



const { username , room_id } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})


const socket = io();



// Join Room
socket.emit('joinRoom', { username, room_id });

socket.on('gameUsers', ({game, users}) =>{
    showWhatGame(game.id);
    console.log(playersList);
    console.log(users);
    console.log(game);
    allUsers(users);
})


socket.on('message', message => {
        console.log(message);
});


function allUsers(users){
    var playersList = $('ul#players-list');
    for (var i = 0; i < users.length; i++){
        console.log(users[i]);
        playersList.append('<li>'+ users[i].name + '</li>');
    }
}

function showWhatGame(gameName){
    var gameSpan = $('span#room_name');
    gameSpan.html(gameName);
}
