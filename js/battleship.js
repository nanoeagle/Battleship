const directions = {
	HORIZONTAL: 0,
	VERTICAL: 1
}

window.onload = function() {
	boardGame.generateShipsLocations();
};

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