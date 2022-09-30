var player1Dice = (Math.floor((Math.random() * 6))) + 1;
var player2Dice = (Math.floor((Math.random() * 6))) + 1;

var Player1DiceImage = "dice" + player1Dice + ".png"
var Player2DiceImage = "images/dice" + player2Dice + ".png"

document.querySelector("div.left-dice img").setAttribute("src", "images/" + Player1DiceImage);
document.querySelector("div.right-dice img").setAttribute("src", Player2DiceImage);

// if (player1Dice === 1) {
//     document.querySelector("div.left-dice img").setAttribute("src", "images/dice1.png");
// }
// else if (player1Dice === 2) {
//     document.querySelector("div.left-dice img").setAttribute("src", "images/dice2.png");
// }
// else if (player1Dice === 3) {
//     document.querySelector("div.left-dice img").setAttribute("src", "images/dice3.png");
// }
// else if (player1Dice === 4) {
//     document.querySelector("div.left-dice img").setAttribute("src", "images/dice4.png");
// }
// else if (player1Dice === 5) {
//     document.querySelector("div.left-dice img").setAttribute("src", "images/dice5.png");
// }
// else {
//     document.querySelector("div.left-dice img").setAttribute("src", "images/dice6.png");
// }

// if (player2Dice === 1) {
//     document.querySelector("div.right-dice img").setAttribute("src", "images/dice1.png");
// }
// else if (player2Dice === 2) {
//     document.querySelector("div.right-dice img").setAttribute("src", "images/dice2.png");
// }
// else if (player2Dice === 3) {
//     document.querySelector("div.right-dice img").setAttribute("src", "images/dice3.png");
// }
// else if (player2Dice === 4) {
//     document.querySelector("div.right-dice img").setAttribute("src", "images/dice4.png");
// }
// else if (player2Dice === 5) {
//     document.querySelector("div.right-dice img").setAttribute("src", "images/dice5.png");
// }
// else {
//     document.querySelector("div.right-dice img").setAttribute("src", "images/dice6.png");
// }

var winner = 0;
if (player1Dice === player2Dice) {
    winner = 0;
    // document.querySelector("div.left-flag i").classList.remove("invisible");
    // document.querySelector("div.right-flag i").classList.remove("invisible");
    document.querySelector("h1").innerHTML = "<span>🚩</span> DRAW <span>🚩</span>";
    // alert("Deuce");
}
else if (player1Dice > player2Dice) {
    winner = 1;
    // document.querySelector("div.left-flag i").classList.remove("invisible");
    document.querySelector("h1").innerHTML = "<span>🚩</span> Player 1 Win";
    // alert("Player 1 Win");
}
else {
    winner = 2;
    // document.querySelector("div.right-flag i").classList.remove("invisible");
    document.querySelector("h1").innerHTML = "Player 2 Win <span>🚩</span>";
    // alert("Player 2 Win");
}