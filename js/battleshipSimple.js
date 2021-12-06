var randomLocation = Math.floor(Math.random() * 5);
var location1 = randomLocation;
var location2 = location1 + 1;
var location3 = location2 + 1;
var guess; 
var guesses = 0;
var hits = 0;
var isSunk = false;

playGame();
informUserStats();

function playGame() {
	while ( !isOver() ) {
		getUserGuess();
		processGuess();
	}
}

function isOver() {
	return isSunk;
}

function getUserGuess() {
	return guess = prompt("Ready, aim, fire! (enter a number 0-6):");
}

function processGuess() {
	var guessIsValid = (0 <= guess && guess <= 6);
	if (guessIsValid) {
		guesses += 1;
		processValidGuess();
	} else {
		processInvalidGuess()
	}
}

function processValidGuess() {
	var guessIsCorrect = 
		guess == location1 || 
		guess == location2 || 
		guess == location3;
	if (guessIsCorrect) {
		hitBattleship();
		diagnoseDamage();
	} else {
		processIncorrectGuess();
	}
}

function hitBattleship() {
	hits += 1;
	alert("HIT!");
}

function diagnoseDamage() {
	var battleshipIsDestroyed = (hits == 3);
	if (battleshipIsDestroyed) {
		processWhenDestroyed();
	}
}

function processWhenDestroyed() {
	isSunk = true;
	alert("You sank my battleship!");
}

function processIncorrectGuess() {
	alert("MISS");
}

function processInvalidGuess() {
	alert("Please enter a valid cell number!");
}

function informUserStats() {
	alert(
		"You took " + guesses + " guesses to sink the battleship, " +
		"which means your shooting accuracy was " + (300/guesses) + "%"
	);
}