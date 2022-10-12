
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["green", "red", "yellow", "blue"];
var level = 0;
var gameStandby = true;
var gameOver = false;


$(document).keydown(function() {
    if (gameStandby) {
        nextSequence();
        gameStandby = !gameStandby;
    }
});

$("button").click(function(){
    var userChosenColour = ($(this).attr("id"));

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    $("#" + userChosenColour).addClass("pressed");

    removeClass200ms(userChosenColour);

    console.log(userClickedPattern)

    if (userClickedPattern.length === gamePattern.length) {
        for (var i = 0; i < gamePattern.length; i++) {
            if (userClickedPattern[i] === gamePattern[i]) {
                
            }
            else {
                gameOver = !gameOver                
            }
        }
        if (!gameOver) {
            nextSequence();
            userClickedPattern.length = 0
        }
        else {
            console.log("You Lose..!");
            startOver();
        }
    }
})


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    
    level++;
    $("#level-title").text("Level " + level);

    gamePattern.push(randomChosenColour);


    playSound(randomChosenColour);

    $("#" + randomChosenColour).addClass("pressed");

    removeClass200ms(randomChosenColour);

    // Only for Debugging
    // console.log(gamePattern);
}


function playSound(name) {
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}


function removeClass200ms(colour) {
    setTimeout(function() {
        $("#" + colour).removeClass("pressed");
    }, 200);
}


function startOver() {
    gameStandby = !gameStandby;
    level = 0;
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    $("#level-title").text("Press A Key to Start")
}

