$(function () {
    console.log('styles.js responding');

    function generateRoomId(){
        let roomId = '';
        const availableCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoprtuvwxyz0123456789!@#$$%^&*";
        for (let i=0;i<6;i++){
            roomId += availableCharacters.charAt(Math.floor(Math.random()*availableCharacters.length));
        }
        return roomId;
    };

    // let ticktock = document.createElement('audio');
    // ticktock.setAttribute('src', '/static/audio/tick-sound.mp3');
    // console.log(ticktock);

    let counterBorder = $("#num.counter");
    let counter = $(".counter");
    let decisionContainer = $(".decision");

    $(".start-count").click(function doTheCountdown() {
        let i = 5;
        counterBorder.text(i);
        counter.show();
        let countdown = setInterval(function () {
            i --;
            counterBorder.text(i);
            if (i < 0) {
                clearInterval(countdown);
                counter.hide();
                decisionContainer.fadeIn(3000);
            }
        }, 1000)
    });

    $("#yes").click(function scoreYes() {
        decisionContainer.hide();
    });

    $("#no").click(function scoreNo() {
        decisionContainer.hide();
    });

    $("#what-prefers-container").click(function () {
            $(".game-id-part").show();
            $("#go-play").show();
            $('#what-prefers-container').hide();
        }
    );

    $("#gen-new-game").click(function() {
            let roomName = generateRoomId();
            console.log(roomName);
            console.log($('#room_id'));
            $('#room_id').val(roomName);
        }
    );







});