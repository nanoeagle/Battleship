const directions = {
	HORIZONTAL: 0,
	VERTICAL: 1
}

window.onload = function() {
	boardGame.generateShipsLocations();

	var guessInput = document.getElementById("guessInput");
    guessInput.onkeydown = handleKeyPress;
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
};

function handleKeyPress(event) {
    var fireButton = document.getElementById("fireButton");
    if (event.key === "Enter") {
        fireButton.click();
        // we return false so the form doesn't do anything else 
        // (like try to submit itself).
        return false;
    }
}

function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";
}

function gameOver() {
    return boardGame.sinkAllShips();
}

function processWhenGameOver() {
	view.removeInputForm();
	notifyUserStats();
}

function notifyUserStats() {
	var hitPercentage = 
		boardGame.numOfShips*boardGame.shipLength*100/controller.guesses;
	view.displayMessage("You sank all my battleships, in " 
		+ controller.guesses + " guesses, " 
		+ "which means your shooting accuracy was " 
		+ Math.round(hitPercentage) 
		+ "%");
}