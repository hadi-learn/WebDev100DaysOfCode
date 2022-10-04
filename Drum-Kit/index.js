// for (i = 0; i < document.querySelectorAll("img.drum").length; i++) {
//     document.querySelectorAll("img.drum")[i].addEventListener("click", function () {
//         var audio = new Audio("sounds/tom-1.mp3");
//         audio.play();
//     });
// }

// function clickHandle() {
//     alert("I got clicked.");
// }


// Detecting Mouse Click

for (i = 0; i < document.querySelectorAll("button.letter").length; i++) {
    document.querySelectorAll("button.letter")[i].addEventListener("click", function() {
        var letter = this.textContent;
        makeSound(letter);
        toggleAnimation(letter);
    });
}

// Detecting Keyboard Press

document.addEventListener("keydown", function(Event){
    var letter = Event.key;
    makeSound(letter);
    toggleAnimation(letter);
});


function makeSound(letter) {

    switch (letter) {
        case "w":
            var audio = new Audio("sounds/tom-1.mp3");
            audio.play();
        break;
        case "a":
            var audio = new Audio("sounds/tom-2.mp3");
            audio.play();
        break;
        case "s":
            var audio = new Audio("sounds/tom-3.mp3");
            audio.play();
        break;
        case "d":
            var audio = new Audio("sounds/tom-4.mp3");
            audio.play();
        break;
        case "j":
            var audio = new Audio("sounds/crash.mp3");
            audio.play();
        break;
        case "k":
            var audio = new Audio("sounds/snare.mp3");
            audio.play();
        break;
        case "l":
            var audio = new Audio("sounds/kick-bass.mp3");
            audio.play();
        break;
        default: console.log(letter);
    }
}

function toggleAnimation(letter) {
    var activeButton = document.querySelector("button." + letter);
    activeButton.classList.add("pressed");

    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 150);
}
