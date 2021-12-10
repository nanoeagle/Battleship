var controller = {
    guesses: 0,

    processGuess: function(guess) {
        guess = guess.toUpperCase();
        if (this.isValid(guess)) {
            this.processValidGuess(guess);
        } else {
            alert("Oops, that isn't on the board.");
        }
    },
    
    isValid: function(guess) {
        var guessIsValid = guess.match(/^[A-G]{1}[0-6]{1}$/);
        if (guessIsValid) {
            return true;
        }
        return false;
    },

    processValidGuess: function(guess) {
        if (gameOver()) {
            processWhenGameOver();
            return;
        } 
        this.continuePlaying(guess);
    },

    continuePlaying: function(guess) {
        this.guesses++;
        var location = this.parseGuess(guess);
        var hitShip = boardGame.fireAt(location);

        if (hitShip) {
            boardGame.notifyHit(location);
            boardGame.diagnoseDamage(hitShip);
        } else {
            boardGame.notifyMiss(location);
        }
    },
    
    parseGuess: function(guess) {
        var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
        var firstCharacter = guess.charAt(0);
        var rowIndex = alphabet.indexOf(firstCharacter);
        var columnIndex = guess.charAt(1);
        return rowIndex + columnIndex;
    },
};