var view = {
	displayMessage: function(msg) {
		document.getElementById("messageArea").innerHTML = msg;
	},

	displayHit: function(location) {
		document.getElementById(location).setAttribute("class", "hit");
	},

	displayMiss: function(location) {
		document.getElementById(location).setAttribute("class", "miss");
	},

	removeInputForm: function() {
		var inputForm = document.getElementById("inputForm");
		document.getElementById("board").removeChild(inputForm);
	}
};