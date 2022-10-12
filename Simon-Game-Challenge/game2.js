
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["green", "red", "yellow", "blue"];
var level = 0;
var gameStandby = true;
var highestScore = [];
var player = [];

var sounds = {
    wrong: new Audio("sounds/wrong.mp3"),
    green: new Audio("sounds/green.mp3"),
    red: new Audio("sounds/red.mp3"),
    yellow: new Audio("sounds/yellow.mp3"),
    blue: new Audio("sounds/blue.mp3"),
}


// Start The Game and Play with Keyboard Section
$(document).keydown(function(event) {
    if (gameStandby) {
        nextSequence();
        currentSequenceLevel(gamePattern.length);
        $("span.user-sequence").text("0");
        gameStandby = !gameStandby;
    }
    else {
        switch (event.key) {
            case "w":
                var userChosenColour = "green";
            break;
            case "a":
                userChosenColour = "red";
            break;
            case "s":
                userChosenColour = "yellow";
            break;
            case "d":
                userChosenColour = "blue";
            break;  
            default:
                console.log("Wrong Key...")          
        }
        userChosenSequence(userChosenColour);
    }
});


// Play with Mouse Section
$("button").click(function(){
    var userChosenColour = ($(this).attr("id"));

    userChosenSequence(userChosenColour);
})


function nextSequence() {
    userClickedPattern.length = 0;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    
    level++;
    $("#level-title").text("Level " + level);

    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);

    $("#" + randomChosenColour).addClass("random-pressed");

    setTimeout(function(){
        $("#" + randomChosenColour).removeClass("random-pressed");
    }, 150)

    // For Debug Only
    // console.log(gamePattern);
}


function userChosenSequence(chosenColour) {

    userClickedPattern.push(chosenColour);

    playSound(chosenColour);

    $("#" + chosenColour).addClass("pressed");

    setTimeout(function(){
        $("#" + chosenColour).removeClass("pressed");
    }, 150)

    checkAnswer(userClickedPattern.length - 1)

    // For Debug Only
    // console.log(userClickedPattern);
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        correctSelection();
        userSequenceLevel(currentLevel + 1);

        if (gamePattern.length === userClickedPattern.length) {
            confetti();
            setTimeout(function() {
                nextSequence();
                currentSequenceLevel(gamePattern.length);
                $("span.user-sequence").text("0");
            }, 1000);
        }
    }
    else {
        // Only for Debugging
        // console.log("Wrong");
        wrongSelection();
        storeScore(gamePattern.length);
        startOver();
    }   
}


function playSound(colour) {
    sounds[colour].load();
    sounds[colour].play();
}

function userSequenceLevel(level) {
    $("span.user-sequence").text(level);
}

function currentSequenceLevel(level) {
    $("span.game-sequence").text(level);
}

function correctSelection() {
    $("p.selection").text("Correct ^_^");
    $("p.selection").addClass("success");
    $("p.selection").removeClass("select-box");

    setTimeout(function() {
        $("p.selection").text("Select A BOX");
        $("p.selection").addClass("select-box");
        $("p.selection").removeClass("success");
    }, 250);
}

function wrongSelection() {
    $("p.selection").text("Incorrect --!");
    $("p.selection").addClass("wrong");
    $("p.selection").removeClass("select-box");

    setTimeout(function() {
        $("p.selection").text("Select A BOX");
        $("p.selection").addClass("select-box");
        $("p.selection").removeClass("wrong");
    }, 500);
}

function confetti() {
    setTimeout(function() {
        $("#level-title").text("Correct Answer 🎊");
    }, 400);
}

function storeScore(level) {
    highestScore.push(level);
    let currentHighestScore = Math.max(...highestScore)
    // $("span.current-highest-score").text(Math.max.apply(Math, highestScore));
    // $("span.current-highest-score").text(Math.max(...highestScore));
    $("span.current-highest-score").text(currentHighestScore);
    var playerName = prompt("Enter Your Name: ");
    player.push(playerName);
    $("span.current-highest-score-player").text(player[highestScore.indexOf((currentHighestScore))]);
    // For Debug Only
    // console.log(highestScore);
    // console.log(player);
}

function startOver() {
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart")
    $("span.user-sequence").text("0");
    $("span.game-sequence").text("1");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 1000);
    gameStandby = !gameStandby;
    gamePattern = []
    level = 0;
}
