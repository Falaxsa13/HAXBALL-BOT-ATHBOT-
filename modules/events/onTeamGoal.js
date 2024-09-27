room.onTeamGoal = function(team) {
	activePlay = false;
	countAFK = false;
	const scores = room.getScores();
	game.scores = scores;
	if (lastPlayersTouched[0] != null && lastPlayersTouched[0].team == team) {
		
		if (lastPlayersTouched[1] != null && lastPlayersTouched[1].team == team) {
			room.sendAnnouncement("🔥 " + getTime(scores) + " Golazo de " + lastPlayersTouched[0].name + " ! Con paseson de " + lastPlayersTouched[1].name + ". Velocidad de tiro : " + ballSpeed.toPrecision(4).toString() + "km/h " + (team == Team.RED ? "🔴" : "🔵"), null, 0x4ffaff, "bold", 1);
			game.goals.push(new Goal(scores.time, team, lastPlayersTouched[0], lastPlayersTouched[1]));

		}
		else {
			room.sendAnnouncement("🔥 " + getTime(scores) + " Golazo de " + lastPlayersTouched[0].name + " ! Velocidad de tiro : " + ballSpeed.toPrecision(4).toString() + "km/h " + (team == Team.RED ? "🔴" : "🔵"), null, 0x4ffaff, "bold", 1);
			game.goals.push(new Goal(scores.time, team, lastPlayersTouched[0], null));
			
		}

		change_size(40, team);

	}
	else {
		room.sendAnnouncement("🤣 " + getTime(scores) + " " + lastPlayersTouched[0].name + " BEBÉ" + " ¿QUE FUÉ? 🙃 "+ " ! Velocidad de tiro : " + ballSpeed.toPrecision(4).toString() + "km/h " + (team == Team.RED ? "🔴" : "🔵"), null, 0x4ffaff, "bold", 1);
		game.goals.push(new Goal(scores.time, team, null, null));
	}
	if (scores.scoreLimit != 0 && (scores.red == scores.scoreLimit || scores.blue == scores.scoreLimit && scores.blue > 0 || goldenGoal == true)) {
		endGame(team);
		goldenGoal = false;
		setTimeout(() => { room.stopGame(); }, 1000);
	}
}

room.onPositionsReset = function() {
	countAFK = true;
	lastPlayersTouched = [null, null];
	reset_size(player_size);
}
