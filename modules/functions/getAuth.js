/**
 * The function "getAuth" returns the authentication value for a given player.
 * @param player - The "player" parameter is an object that represents a player.
 * @returns the value of the `eP.AUTH` property of the first element in the `extendedP` array that has
 * a matching `player.id` value. If no matching element is found, it returns `null`.
 */
function getAuth(player) {
	return extendedP.filter((a) => a[0] == player.id) != null ? extendedP.filter((a) => a[0] == player.id)[0][eP.AUTH] : null;
}
