/**
 * The function "endGame" handles the end of a game by updating scores, determining the winner,
 * announcing the result, and updating statistics.
 * @param winner - The `winner` parameter in the `endGame` function represents the team that won the
 * game. It can have one of the following values: Team.BLUE (blue team won), Team.RED (red team won).
 */
function endGame(winner) { // handles the end of a game
	players.length >= 2 * maxTeamSize - 1 ? activateChooseMode() : null;
	const scores = room.getScores();
	game.scores = scores;
	Rposs = Rposs/(Rposs+Bposs);
	Bposs = 1 - Rposs;
	lastWinner = winner;
	endGameVariable = true;
	if (winner == Team.RED) {
		streak++;
		room.sendAnnouncement(Bot + "🔴 El Red Team ganó " + scores.red + "-" + scores.blue + " ! Victorias consecutivas : " + streak + " 🏆", null, 0x4ffaff, "bold", 2);
	}
	else if (winner == Team.BLUE) {
		streak = 1;
		room.sendAnnouncement(Bot + "🔵 El Blue Team ganó " + scores.blue + "-" + scores.red + " ! Victorias consecutivas : " + streak + " 🏆", null, 0x4ffaff, "bold", 2);
	}
	else {
		streak = 0;
		room.sendAnnouncement(Bot +"💤 Límite de empate, terminado! 💤", null, 0x4ffaff, "bold", 2);
    }
    room.sendAnnouncement(Bot + "⭐ Posesión del balón : 🔴 " + (Rposs*100).toPrecision(3).toString() + "% : " + (Bposs*100).toPrecision(3).toString() + "% 🔵", null, 0x4ffaff, "bold", 2);
    scores.red == 0 ? (scores.blue == 0 ? room.sendAnnouncement(Bot + "🏆 " + GKList[0].name + " y " + GKList[1].name + " mantuvieron la valla invicta ! ") : room.sendAnnouncement(Bot + "🏆 " + GKList[1].name + " mantuvo la valla invicta ! ", null, 0x4ffaff, "bold", 2)) : scores.blue == 0 ? room.sendAnnouncement(Bot +"🏆 " + GKList[0].name + " mantuvo la valla invicta ! ", null, 0x4ffaff, "bold", 2) : null;
	updateStats();
}

/**
 * The function `quickRestart` stops the current game in a room and then starts a new game after a
 * 2-second delay.
 */
function quickRestart() {
	room.stopGame();
	setTimeout(() => { room.startGame(); }, 2000);
}


/**
 * The function resumeGame() starts a game after a delay of 2 seconds and then immediately unpauses the
 * game after a delay of 1 second.
 */
function resumeGame() {
	setTimeout(() => { room.startGame(); }, 2000);
	setTimeout(() => { room.pauseGame(false); }, 1000);
}
