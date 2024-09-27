/**
 * The function activates the choose mode and sends an announcement message.
 */
function activateChooseMode() {
	inChooseMode = true;
	slowMode = 2;
	room.sendAnnouncement(Bot + "Reconfigurando juego!", null, 0x4ffaff, "bold", 1);
}

/**
 * The function "deactivateChooseMode" is used to deactivate the choose mode and reset the choice variables.
 */
function deactivateChooseMode() {
	inChooseMode = false;
	clearTimeout(timeOutCap);
	if (slowMode != 0) {
		slowMode = 0;
		room.sendAnnouncement(Bot + "Go ñofi!!!.", null, 0x4ffaff, "bold", 1);
	}
	redCaptainChoice = "";
	blueCaptainChoice = "";
}

/**
 * The function `loadMap` sets the custom stadium, score limit, and time limit for a game room based on
 * the provided parameters.
 * @param map - The "map" parameter is used to specify the stadium or map that will be loaded in the
 * game. It can be a custom stadium or one of the predefined stadiums such as "Classic" or "Big".
 * @param scoreLim - The `scoreLim` parameter is used to set the score limit for the game. It
 * determines how many points a team or player needs to reach in order to win the game.
 * @param timeLim - The `timeLim` parameter in the `loadMap` function represents the time limit for the
 * game. It specifies the maximum duration for a game session.
 */
function loadMap(map, scoreLim, timeLim) {
	if (map == aloneMap) {
		room.setCustomStadium(aloneMap);
	}
	else if (map == classicMap) {
		(classicMap != '') ? room.setCustomStadium(classicMap) : room.setDefaultStadium("Classic");
	}
	else if (map == bigMap) {
		(bigMap != '.') ? room.setCustomStadium(bigMap) : room.setDefaultStadium("Big");
	}
	else {
		room.setCustomStadium(map);
	}
	room.setScoreLimit(scoreLim);
	room.setTimeLimit(timeLim);
}

/* PLAYER FUNCTIONS */

/**
 * The function updates the players' list and separates them into different teams.
 */
function updateTeams() {
	players = room.getPlayerList().filter((player) => player.id != 0 && !getAFK(player));
	teamR = players.filter(p => p.team === Team.RED);
	teamB = players.filter(p => p.team === Team.BLUE);
	teamS = players.filter(p => p.team === Team.SPECTATORS);
}


/**
 * The function handles inactivity by incrementing the activity count for each player and kicking them
 * if they exceed the afkLimit.
 */
function handleInactivity() {
	if (countAFK && (teamR.length + teamB.length) > 1) {
		for (var i = 0; i < teamR.length ; i++) {
			setActivity(teamR[i], getActivity(teamR[i]) + 1);
		}
		for (var i = 0; i < teamB.length ; i++) {
			setActivity(teamB[i], getActivity(teamB[i]) + 1);
		}
	}
	for (var i = 0; i < extendedP.length ; i++) {
		if (extendedP[i][eP.ACT] == 60 * (2/3 * afkLimit)) {
			room.sendAnnouncement(Bot + "[ATH] ⛔ @" + room.getPlayer(extendedP[i][eP.ID]).name + ", si no te mueves o envías un mensaje dentro de los siguientes " + Math.floor(afkLimit / 3) + " segundos, seras kickeado!", extendedP[i][eP.ID], 0x4ffaff, "bold", 2);
		}
		if (extendedP[i][eP.ACT] >= 60 * afkLimit) {
			extendedP[i][eP.ACT] = 0;
            if (room.getScores().time <= afkLimit - 0.5) {
				setTimeout(() => { !inChooseMode ? quickRestart() : room.stopGame(); }, 10);
			}
			room.kickPlayer(extendedP[i][eP.ID], "AFK", false);
		}
	}
}
