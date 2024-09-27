/* EVENTS */

/* PLAYER MOVEMENT */

// Function that is triggered when a player joins
room.onPlayerJoin = function(player) {

	console.log(player.name + " : " + player.auth);
	extendedP.push([player.id, player.auth, player.conn, false, 0, 0, false]);

	updateRoleOnPlayerIn();


	if (localStorage.getItem(player.auth) != null) {
		if (JSON.parse(localStorage.getItem(player.auth))[Ss.RL] == "admin") {
			room.setPlayerAdmin(player.id, true);
		}
	}

	// Stats: "Auth" : '["0-Games", "1-Wins", "2-Draws", "3-Losses", "4-Winrate", "5-Goals", "6-Assists", "7-GK", "8-CS", "9-CS%", "10- ELO", "11-Role", "12-Nick", "13-Emoji", "14-Color", "15-MSG"]'
	localStorage.getItem(getAuth(player)) ? stats = JSON.parse(localStorage.getItem(getAuth(player))) : stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", 0, "player", player.name, "", "", ""];

	if (stats[Ss.RL] === "admin")
	{
		// Default emoji and message when joining if Admin
		if (stats[Ss.MSG] === "" && stats[Ss.EMOJI] === "")
		{
			stats[Ss.MSG] = "El administrador " + player.name + " ha llegado";
			stats[Ss.EMOJI] = "👑";
			localStorage.setItem(getAuth(player), JSON.stringify(stats));
		}

		room.sendAnnouncement(stats[Ss.EMOJI] + " " + stats[Ss.MSG], null, 0x4ffaff, "bold", 2);
	}
	else
	{
		room.sendAnnouncement("[ATHBOT] 👋 Bienvenido UTECsino a [LPF(F)] " + player.name + " ! Escriba '!help' para ver los comandos.", "bold", 1);
		room.sendAnnouncement(Bot + "Pon !reglas x si hay alguna queja ", player.id, 0x6FE35D, "bold", 1);
		room.sendAnnouncement(Bot + "---------------------------------", player.id, 0x6FE35D, "bold", 1);
		room.sendAnnouncement(Bot + "👑👑👑 NUEVO HAXPASS 👑👑👑", player.id, 0x6FE35D, "bold", 1);
		room.sendAnnouncement(Bot + "Disfruta de ventajas unicas en Atheros Bot", player.id, 0x6FE35D, "bold", 1);
		room.sendAnnouncement(Bot + "1. Mensaje de entrada personalizado ", player.id, 0x6FE35D, "bold", 1);
		room.sendAnnouncement(Bot + "2. Emoji personalizado como los admins ", player.id, 0x6FE35D, "bold", 1);
		room.sendAnnouncement(Bot + "3. Color en chat personalizado ", player.id, 0x6FE35D, "bold", 1);
		room.sendAnnouncement(Bot + "4. Skipeo de posicion de cola ", player.id, 0x6FE35D, "bold", 1);
		room.sendAnnouncement(Bot + "5. Añadir tu camiseta a la base de datos del servidor ", player.id, 0x6FE35D, "bold", 1);
		room.sendAnnouncement(Bot + "7. Cambio de camiseta del equipo a tu eleccion ", player.id, 0x6FE35D, "bold", 1);
		room.sendAnnouncement(Bot + "TAN SOLO A 3 NUEVOS SOLES, Yape: +51 997960459 ", player.id, 0x6FE35D, "bold", 1);
		room.sendAnnouncement(Bot + "Mas informacion en discord user: falaxsa", player.id, 0x6FE35D, "bold", 1);


	}
}
