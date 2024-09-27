/* FUNCTIONS */

/* AUXILIARY FUNCTIONS */



/**
 * The getRandomInt function generates a random integer between 0 and the specified maximum value.
 * @param max - The maximum value that the random integer can be.
 * @returns a random integer between 0 (inclusive) and the specified maximum value (exclusive).
 */
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}


/**
 * The getTime function returns the current time of the game in the format [MM:SS].
 * @param scores - The parameter "scores" is an object that contains information about the game,
 * including the current time.
 * @returns a string representing the current time of the game in the format "[MM:SS]".
 */
function getTime(scores) {
	return "[" + Math.floor(Math.floor(scores.time/60)/10).toString() + Math.floor(Math.floor(scores.time/60)%10).toString() + ":" + Math.floor(Math.floor(scores.time - (Math.floor(scores.time/60) * 60))/10).toString() + Math.floor(Math.floor(scores.time - (Math.floor(scores.time/60) * 60))%10).toString() + "]"
}


/**
 * The function calculates the distance between two points in a two-dimensional space.
 * @param p1 - The parameter p1 represents the first point, which is an object with properties x and y
 * representing the coordinates of the point.
 * @param p2 - The above code defines a function called `pointDistance` that calculates the distance
 * between two points in a two-dimensional space.
 * @returns the distance between two points, calculated using the Pythagorean theorem.
 */
function pointDistance(p1, p2) {
	var d1 = p1.x - p2.x;
	var d2 = p1.y - p2.y;
	return Math.sqrt(d1 * d1 + d2 * d2);
}


/* BUTTONS */

/**
 * Top button that choose the player that is first in the queue.
 * @returns nothing if the condition `teamS.length == 0` is true. Otherwise, it is returning the result
 * of the team assignment operations.
 */
function topBtn() {
	if (teamS.length == 0) {
		return;
	}
	else {
		if (teamR.length == teamB.length) {
			if (teamS.length > 1) {
				room.setPlayerTeam(teamS[0].id, Team.RED);
				room.setPlayerTeam(teamS[1].id, Team.BLUE);
			}
			return;
		}
		else if (teamR.length < teamB.length) {
			room.setPlayerTeam(teamS[0].id, Team.RED);
		}
		else {
			room.setPlayerTeam(teamS[0].id, Team.BLUE);
		}
	}
}

/**
 * The function randomly assigns players to the red or blue team based on the current team sizes.
 * @returns nothing if the condition `teamS.length == 0` is true. Otherwise, it returns undefined.
 */
function randomBtn() {
	if (teamS.length == 0) {
		return;
	}
	else {
		if (teamR.length == teamB.length) {
			if (teamS.length > 1) {
				var r = getRandomInt(teamS.length);
				room.setPlayerTeam(teamS[r].id, Team.RED);
				teamS = teamS.filter((spec) => spec.id != teamS[r].id);
				room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE);
			}
			return;
		}
		else if (teamR.length < teamB.length) {
			room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.RED);
		}
		else {
			room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE);
		}
	}
}

/**
 * The function "blueToSpecBtn" resets the teams in a game by moving all players from the blue team to
 * the spectators team.
 */
function blueToSpecBtn() {
	resettingTeams = true;
	setTimeout(() => { resettingTeams = false; }, 100);
	for (var i = 0; i < teamB.length; i++) {
		room.setPlayerTeam(teamB[teamB.length - 1 - i].id, Team.SPECTATORS);
	}
}

/**
 * The function "redToSpecBtn" resets the teams of all players in the "teamR" array to the spectator
 * team.
 */
function redToSpecBtn() {
	resettingTeams = true;
	setTimeout(() => { resettingTeams = false; }, 100);
	for (var i = 0; i < teamR.length; i++) {
		room.setPlayerTeam(teamR[teamR.length - 1 - i].id, Team.SPECTATORS);
	}
}

/**
 * The function `resetBtn` resets the teams in a game by moving players to the spectators team.
 */
function resetBtn() {
	resettingTeams = true;
	setTimeout(() => { resettingTeams = false; }, 100);
	if (teamR.length <= teamB.length) {
		for (var i = 0; i < teamR.length; i++) {
			room.setPlayerTeam(teamB[teamB.length - 1 - i].id, Team.SPECTATORS);
			room.setPlayerTeam(teamR[teamR.length - 1 - i].id, Team.SPECTATORS);
		}
		for (var i = teamR.length; i < teamB.length; i++) {
			room.setPlayerTeam(teamB[teamB.length - 1 - i].id, Team.SPECTATORS);
		}
	}
	else {
		for (var i = 0; i < teamB.length; i++) {
			room.setPlayerTeam(teamB[teamB.length - 1 - i].id, Team.SPECTATORS);
			room.setPlayerTeam(teamR[teamR.length - 1 - i].id, Team.SPECTATORS);
		}
		for (var i = teamB.length; i < teamR.length; i++) {
			room.setPlayerTeam(teamR[teamR.length - 1 - i].id, Team.SPECTATORS);
		}
	}
}


/**
 * The function changes the team of all players in teamB to the red team.
 */
function blueToRedBtn() {
	resettingTeams = true;
	setTimeout(() => { resettingTeams = false; }, 100);
	for (var i = 0; i < teamB.length; i++) {
		room.setPlayerTeam(teamB[i].id, Team.RED);
	}
}


/* Setting the team colors for a game room. */
room.setTeamColors(Team.BLUE, 60, 0xFFFFFF, [0x0080ff, 0x0080ff, 0x0080ff]);
room.setTeamColors(Team.RED, 60, 0xFFFFFF, [0xFF4D40, 0xFF4D40, 0xFF4D40]);
