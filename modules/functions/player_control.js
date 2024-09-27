/**
 * The function "getAFK" returns the AFK status of a player.
 * @param player - The parameter "player" is an object that represents a player in a game.
 * @returns the AFK status of a player. If the player is found in the extendedP array, it will return
 * their AFK status. If the player is not found, it will return null.
 */
function getAFK(player) {
	return extendedP.filter((a) => a[0] == player.id) != null ? extendedP.filter((a) => a[0] == player.id)[0][eP.AFK] : null;
}

/**
 * The function sets the AFK (Away From Keyboard) status of a player.
 * @param player - The "player" parameter is an object that represents a player in a game. It likely
 * has properties such as "id" to identify the player and "AFK" to indicate whether the player is away
 * from the keyboard (AFK) or not.
 * @param value - The "value" parameter in the "setAFK" function is used to set the AFK (Away From
 * Keyboard) status of a player. It can be either true or false, indicating whether the player is AFK
 * or not.
 */
function setAFK(player, value) {
	extendedP.filter((a) => a[0] == player.id).forEach((player) => player[eP.AFK] = value);
}

function getActivity(player) {
	return extendedP.filter((a) => a[0] == player.id) != null ? extendedP.filter((a) => a[0] == player.id)[0][eP.ACT] : null;
}

function setActivity(player, value) {
	extendedP.filter((a) => a[0] == player.id).forEach((player) => player[eP.ACT] = value);
}

function getGK(player) {
	return extendedP.filter((a) => a[0] == player.id) != null ? extendedP.filter((a) => a[0] == player.id)[0][eP.GK] : null;
}

function setGK(player, value) {
	extendedP.filter((a) => a[0] == player.id).forEach((player) => player[eP.GK] = value);
}

function getMute(player) {
	return extendedP.filter((a) => a[0] == player.id) != null ? extendedP.filter((a) => a[0] == player.id)[0][eP.MUTE] : null;
}

function setMute(player, value) {
	extendedP.filter((a) => a[0] == player.id).forEach((player) => player[eP.MUTE] = value);
}
