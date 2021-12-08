var boardGame = {
	boardSize: 7,
	numOfShips: 3,
	shipLength: 3,
	sunkShips: 0,
	ships: [
		{ locations: ["0", "0", "0"], hits: ["", "", ""] },
		{ locations: ["0", "0", "0"], hits: ["", "", ""] },
		{ locations: ["0", "0", "0"], hits: ["", "", ""] }
	],

	generateShipsLocations: function() {
		for (var i = 0; i < this.numOfShips; i++) {
			var locations;
			do {
				locations = this.generateEachShip();
			} while (this.hasCollision(locations));
			this.ships[i].locations = locations;
		}
	},

	generateEachShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, column;

		if (direction === directions.HORIZONTAL) { 
			row = Math.floor(Math.random() * this.boardSize);
			column = Math.floor(Math.random() * (this.boardSize - this.shipLength));
		} else { 
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
			column = Math.floor(Math.random() * this.boardSize);
		}
		return this.createLocations(direction, row, column);
	},

	createLocations: function(direction, row, column) {
		var newLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === directions.HORIZONTAL) {
				newLocations.push(row + "" + (column + i));
			} else {
				newLocations.push(row + i + "" + column);
			}
		}
		return newLocations;
	},

	hasCollision: function(locations) {
		for (var i = 0; i < this.numOfShips; i++) {
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	},

	fireAt: function(guessLocation) {
		for (var i = 0; i < this.numOfShips; i++) {
			var ship = this.ships[i];
			var locationIndex = ship.locations.indexOf(guessLocation);
			if (locationIndex >= 0) {
				ship.hits[locationIndex] = "hit";
				return ship;
			}
		}
		return null;
	},

	notifyHit: function(location) {
		view.displayHit(location);
		view.displayMessage("HIT!");
	},

	diagnoseDamage: function(hitShip) {
		if (this.isSunk(hitShip)) {
			this.processWhenSink();
		}
	},

	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
		return true;
	},

	processWhenSink: function() {
		view.displayMessage("You sank my battleship!");
		this.sunkShips++;
		if (this.sinkAllShips()) {
			processWhenGameOver();
		}
	},

	notifyMiss: function(location) {
		view.displayMiss(location);
		view.displayMessage("You missed.");
	},

	sinkAllShips: function() {
		return this.sunkShips === this.numOfShips;
	}
};