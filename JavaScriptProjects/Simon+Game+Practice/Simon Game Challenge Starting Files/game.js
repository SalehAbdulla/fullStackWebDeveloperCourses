var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false; // Track whether the game has started

function nextSequence(){
    userClickedPattern = []; // Reset userClickedPattern when a new sequence starts

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    level++;
    $('h1').text("Level " + level);
}

function playSound(name){
    var audio = new Audio('./sounds/' + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass('pressed');
    setTimeout(function (){
        $("#" + currentColour).removeClass('pressed');
    }, 200);
}

$(".btn").on("click", function(){
    if (started) { // Ensure that clicks are only processed if the game has started
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);
    }
});

$(document).keydown(function(){
    if (!started) {
        started = true; // Game starts on first key press
        nextSequence();
    }
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    } else {
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");

        setTimeout(function(){
            $('body').removeClass("game-over");
        }, 200);

        $('h1').text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false; // Reset game state
}
