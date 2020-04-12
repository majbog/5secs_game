

$(function () {
    console.log('styles.js responding');

    let ticktock = document.createElement('audio');
    ticktock.setAttribute('src', '/static/audio/tick-sound.mp3');
    console.log(ticktock);

    let counterBorder = $("#num.counter");
    let counter = $(".counter");
    console.log(counterBorder.text());

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
            }
        }, 1000)
    });

});