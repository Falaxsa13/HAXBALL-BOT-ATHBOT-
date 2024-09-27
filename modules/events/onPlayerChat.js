// Function that is triggered when a player chats
room.onPlayerChat = function (player, message) {

	console.log("Nombre " + player.name + " : " + message);

	if (message.startsWith("t "))
	{
	room.getPlayerList().filter(callback => callback.team == player.team).forEach(callback => {room.sendAnnouncement("[Chat de equipo] < " + player.name + ": " + message.substr(2)/*`[Chat de equipo] > [${player.id}] ${player.name}: ${message.substr(prefixTeamChatString.length)}`*/, callback.id, player.team == 1 ? 0xFF7438 : player.team == 0 ? 0xABFFB6 : 0x2C6AC7, "bold", 1)})

	return false;
	}

	else if (message.startsWith("!say ") && player.admin == true)
	{
		room.sendAnnouncement(Bot + message.substr(5), null, 0xffde2e, "bold", 1);
		return false;
	}
	message = message.split(/ +/);

	player.team != Team.SPECTATORS ? setActivity(player, 0) : null;

	if (["!help"].includes(message[0].toLowerCase()))
	{
		room.sendAnnouncement("[ATH] Comandos : !mostrarstats, t [chat para team], !camisetahelp, !reglas", player.id, 0x4ffaff, "bold", 2);
		player.admin ? room.sendAnnouncement(Bot + " : [Admin] !mute <duration = 3> #<id>, !unmute all/#<id>, !clearbans <number = all>, !slow <duration>, !endslow", player.id, 0x4ffaff, "bold", 2) : null;
				player.admin ? room.sendAnnouncement(Bot + " : [Admin] | !color <htmlcolor> | !message <message> | !emoji <emoji>", player.id, 0x4ffaff, "bold", 2) : null;
	}

    else if (message == "!elo")
    {
        var stats;
		localStorage.getItem(getAuth(player)) ? stats = JSON.parse(localStorage.getItem(getAuth(player))) : stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", 0, "player", player.name, "", "", ""]
		room.sendAnnouncement("[" + player.name + "] ELO: " + stats[Ss.ELO], null, 0x4ffaff, "bold", 1);
	}

    else if (["!leaderboard", "tabla"].includes(message[0].toLowerCase()))
    {
        var top10Array = [];
		let limit = 10;
        for (let key in localStorage) {

			if (key.length > 15)
			{
			// Stats: "Auth" : '["0-Games", "1-Wins", "2-Draws", "3-Losses", "4-Winrate", "5-Goals", "6-Assists", "7-GK", "8-CS", "9-CS%", "10- ELO", "11-Role", "12-Nick", "13-Emoji", "14-Color", "15-MSG"]'
			localStorage.getItem(key) ? stats = JSON.parse(localStorage.getItem(key)) : stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", 0, "player", player.name, "", "", ""]
            top10Array.push({ name: stats[12], elo: stats[10] });
			}
		}
        // Create items array
  		top10Array.sort((a, b) => b.elo - a.elo);

        room.sendAnnouncement("-------------LOS 10 MAS GRANDES DE HAXBALL-------------", player.id, 0xffcd48, "bold", 2);

		if (message.length > 1) {limit = parseInt(message[1]);}

        for (var i = 0; i < Math.min(top10Array.length, limit); i++)
        {
            room.sendAnnouncement(i+1 + ". " + top10Array[i].name + " -> " + top10Array[i].elo + " puntos", player.id, 0xffcd48, "bold", 2);
        }
	}

	else if (message == "!Reglas" || message == "!reglas"){
        // Example of rules lol
		room.sendAnnouncement("1.------------------------------------Amaras a la UTEC sobre todas las cosas---------------------------------------", player.id, 0xffcd48, "bold", 2);
		room.sendAnnouncement("2.----------------------------No tomaras el nombre o cuenta de alguien en vano----------------------------", player.id, 0xffcd48, "bold", 2);
		room.sendAnnouncement("3.-----------------------------------------------Santificaras a los admins--------------------------------------------------", player.id, 0xffcd48, "bold", 2);
		room.sendAnnouncement("4.------------------------------------------------Honraras a Atheros FC ----------------------------------------------------", player.id, 0xffcd48, "bold", 2);
		room.sendAnnouncement("5.--------------------------------------------------------NO simearas-----------------------------------------------------------", player.id, 0xffcd48, "bold", 2);
		room.sendAnnouncement("6.--------------------------------------------NO rejoinearas para tapar gol.--------------------------------------------", player.id, 0xffcd48, "bold", 2);
		room.sendAnnouncement("7.------------------------------------------NO caeras ante la excusa del lag-------------------------------------------", player.id, 0xffcd48, "bold", 2);
		room.sendAnnouncement("8.---------------------------------------------------------NO mentiras----------------------------------------------------------", player.id, 0xffcd48, "bold", 2);
		room.sendAnnouncement("9.------------NO consentiras pensamientos ni deseos impuros (irte a LPF cuando abre)----------", player.id, 0xffcd48, "bold", 2);
		room.sendAnnouncement("10.-----------------------------------------------NO codiciaras el WR ajeno----------------------------------------------", player.id, 0xffcd48, "bold", 2);
	}
	else if (["!afk"].includes(message[0].toLowerCase())) {
		if (players.length != 1 && player.team != Team.SPECTATORS) {
			if (player.team == Team.RED && streak > 0 && room.getScores() == null) {
				room.setPlayerTeam(player.id, Team.SPECTATORS);
			}
			else {
				room.sendAnnouncement(Bot + "No puedes ser AFK mientras estás en un equipo !", player.id, 0x8AFFF7, "bold", 1);
				return false;
			}
		}
		else if (players.length == 1 && !getAFK(player)) {
			room.setPlayerTeam(player.id, Team.SPECTATORS);
		}
		setAFK(player, !getAFK(player));
        // AFK message when command activated lol
		room.sendAnnouncement(player.name + (getAFK(player) ? " se ha ido a cagar!" : " ha vuelto de limpiarse el poto !"), null, (getAFK(player) ? 0xFFE063 : 0xFFE063), "normal", 1);
		/*room.sendAnnouncement(player.name + (getAFK(player) ? " Se ha ido a cagar!" : " Ha vuelto de limpiarse el poto !"), null, 0xFFE063, "bold", 2);*/
		getAFK(player) ? updateRoleOnPlayerOut() : updateRoleOnPlayerIn();
	}
	else if (["!afks", "!afklist"].includes(message[0].toLowerCase())) {
		var cstm = "[ATH] Lista de AFK : ";
		for (var i = 0; i < extendedP.length; i++) {
			if (room.getPlayer(extendedP[i][eP.ID]) != null && getAFK(room.getPlayer(extendedP[i][eP.ID]))) {
				if (140 - cstm.length < (room.getPlayer(extendedP[i][eP.ID]).name + ", ").length) {
					room.sendAnnouncement(cstm, player.id, 0x30FF91, "bold", 2);
					cstm = "... ";
				}
				cstm += room.getPlayer(extendedP[i][eP.ID]).name + ", ";
			}
		}
		if (cstm == "[ATH] Lista de AFK : ") {
			room.sendAnnouncement(Bot + "[ATH] No hay nadie en la lista de AFK !", player.id, 0x30FF91, "bold", 2);
			return false;
		}
		cstm = cstm.substring(0, cstm.length - 2);
		cstm += ".";
		room.sendAnnouncement(Bot + cstm, player.id, 0x8AFFF7, "bold", 2);
	}
	else if (["!mostrarstats"].includes(message[0].toLowerCase())) {

		var stats;
		localStorage.getItem(getAuth(player)) ? stats = JSON.parse(localStorage.getItem(getAuth(player))) : stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", 0, "player", player.name, "", "", ""];
		room.sendAnnouncement("[" + player.name + "] PJ: " + stats[Ss.GA] + ", Victorias: " + stats[Ss.WI] + ", Derrotas: " + stats[Ss.LS] + ", WR: " + stats[Ss.WR] + "%, Goles: " + stats[Ss.GL] + ", Asistencias: " + stats[Ss.AS] + ", GK: " + stats[Ss.GK] + ", CS: " + stats[Ss.CS] + ", CS%: " + stats[Ss.CP] + "%", null, 0x30FF91, "bold", 1);

	}

	// Entry admin message setting
	else if ((["!message"].includes(message[0].toLowerCase())) && player.admin)  {

		var stats;
		localStorage.getItem(getAuth(player)) ? stats = JSON.parse(localStorage.getItem(getAuth(player))) : stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", 0, "player", player.name, "", "", ""];

		const remainingWords = message.slice(1).join(" ");

		stats[Ss.MSG] = remainingWords;
		localStorage.setItem(getAuth(player), JSON.stringify(stats));
		room.sendAnnouncement(Bot + "Bienvenida de jugador cambiada exitosamente a [ " + remainingWords + " ]", player.id, 0x6FE35D, "bold", 1);

	}

	// Entry admin emoji setting
	else if ((["!emoji"].includes(message[0].toLowerCase())) && player.admin)  {

		if (message.length > 0)
		{

		var stats;
		localStorage.getItem(getAuth(player)) ? stats = JSON.parse(localStorage.getItem(getAuth(player))) : stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", 0, "player", player.name, "", "", ""];
		stats[Ss.EMOJI] = message[1];
		localStorage.setItem(getAuth(player), JSON.stringify(stats));
		room.sendAnnouncement(Bot + "Emoji del jugador cambiado exitosamente a a [ " + message[1] + " ]", player.id, 0x6FE35D, "bold", 1);
		}
	}

	else if ((["!color"].includes(message[0].toLowerCase())) && player.admin)  {

		if (message.length > 0)
		{
		var stats;
		localStorage.getItem(getAuth(player)) ? stats = JSON.parse(localStorage.getItem(getAuth(player))) : stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", 0, "player", player.name, "", "", ""];
		stats[Ss.COLOR] = message[1];
		localStorage.setItem(getAuth(player), JSON.stringify(stats));
		room.sendAnnouncement(Bot + "Emoji del jugador cambiado exitosamente a a [ " + message[1] + " ]", player.id, 0x6FE35D, "bold", 1);
		}
	}

	else if (["!partidas"].includes(message[0].toLowerCase()))
	{
		var tableau = [];
		Object.keys(localStorage).forEach(function (key) { if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) { tableau.push([(JSON.parse(localStorage.getItem(key))[Ss.NK]), (JSON.parse(localStorage.getItem(key))[Ss.GA])]); } });
		if (tableau.length < 5)
		{
			room.sendAnnouncement(Bot +"[ATH] Aún no se han jugado partidos suficientes.", player.id, 0x8AFFF7, "bold",2);
			return false;
		}
		tableau.sort(function (a, b) { return b[1] - a[1]; });
		room.sendAnnouncement(Bot + "[ATH] Partidos Jugados> #1 " + tableau[0][0] + ": " + tableau[0][1] + " #2 " + tableau[1][0] + ": " + tableau[1][1] + " #3 " + tableau[2][0] + ": " + tableau[2][1] + " #4 " + tableau[3][0] + ": " + tableau[3][1] + " #5 " + tableau[4][0] + ": " + tableau[4][1], player.id, 0x8AFFF7, "bold", 2);
	}
	else if (["!victorias"].includes(message[0].toLowerCase())) {
		var tableau = [];
		Object.keys(localStorage).forEach(function (key) { if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) { tableau.push([(JSON.parse(localStorage.getItem(key))[Ss.NK]), (JSON.parse(localStorage.getItem(key))[Ss.WI])]); } });
		if (tableau.length < 5) {
			room.sendAnnouncement(Bot +"[ATH] Aún no se han jugado partidos suficientes.", player.id, 0x8AFFF7, "bold", 2);
			return false;
		}
		tableau.sort(function (a, b) { return b[1] - a[1]; });
		room.sendAnnouncement(Bot + "[ATH] Victorias> #1 " + tableau[0][0] + ": " + tableau[0][1] + " #2 " + tableau[1][0] + ": " + tableau[1][1] + " #3 " + tableau[2][0] + ": " + tableau[2][1] + " #4 " + tableau[3][0] + ": " + tableau[3][1] + " #5 " + tableau[4][0] + ": " + tableau[4][1], player.id, 0x4ffaff, "bold", 2);
	}
	else if (["!goles"].includes(message[0].toLowerCase())) {
		var tableau = [];
		Object.keys(localStorage).forEach(function (key) { if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) { tableau.push([(JSON.parse(localStorage.getItem(key))[Ss.NK]), (JSON.parse(localStorage.getItem(key))[Ss.GL])]); } });
		if (tableau.length < 5) {
			room.sendAnnouncement(Bot +"[ATH] Aún no se han jugado partidos suficientes.", player.id, 0x8AFFF7, "bold", 2);
			return false;
		}
		tableau.sort(function (a, b) { return b[1] - a[1]; });
		room.sendAnnouncement(Bot +"[ATH] Goles> #1 " + tableau[0][0] + ": " + tableau[0][1] + " #2 " + tableau[1][0] + ": " + tableau[1][1] + " #3 " + tableau[2][0] + ": " + tableau[2][1] + " #4 " + tableau[3][0] + ": " + tableau[3][1] + " #5 " + tableau[4][0] + ": " + tableau[4][1], player.id, 0x4ffaff, "bold", 2);
	}
	else if (["!asistencias"].includes(message[0].toLowerCase())) {
		var tableau = [];
		Object.keys(localStorage).forEach(function (key) { if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) { tableau.push([(JSON.parse(localStorage.getItem(key))[Ss.NK]), (JSON.parse(localStorage.getItem(key))[Ss.AS])]); } });
		if (tableau.length < 5) {
			room.sendAnnouncement(Bot + "[ATH] Aún no se han jugado partidos suficientes.", player.id, 0x8AFFF7, "bold", 2);
			return false;
		}
		tableau.sort(function (a, b) { return b[1] - a[1]; });
		room.sendAnnouncement(Bot + "[ATH] Asistencias> #1 " + tableau[0][0] + ": " + tableau[0][1] + " #2 " + tableau[1][0] + ": " + tableau[1][1] + " #3 " + tableau[2][0] + ": " + tableau[2][1] + " #4 " + tableau[3][0] + ": " + tableau[3][1] + " #5 " + tableau[4][0] + ": " + tableau[4][1], player.id, 0x4ffaff, "bold", 2);
	}
	else if (["!cs"].includes(message[0].toLowerCase())) {
		var tableau = [];
		Object.keys(localStorage).forEach(function (key) { if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) { tableau.push([(JSON.parse(localStorage.getItem(key))[Ss.NK]), (JSON.parse(localStorage.getItem(key))[Ss.CS])]); } });
		if (tableau.length < 5) {
			room.sendAnnouncement(Bot + "[ATH] Aún no se han jugado partidos suficientes.", player.id, 0x4ffaff, "bold", 2);
			return false;
		}
		tableau.sort(function (a, b) { return b[1] - a[1]; });
		room.sendAnnouncement(Bot + "[ATH] Vallas Invictas> #1 " + tableau[0][0] + ": " + tableau[0][1] + " #2 " + tableau[1][0] + ": " + tableau[1][1] + " #3 " + tableau[2][0] + ": " + tableau[2][1] + " #4 " + tableau[3][0] + ": " + tableau[3][1] + " #5 " + tableau[4][0] + ": " + tableau[4][1], player.id, 0x8AFFF7, "bold", 2);
	}
	else if (["!claim"].includes(message[0].toLowerCase())) {

		console.log("claimsito");
		if (message[1] == adminPassword) {
			room.setPlayerAdmin(player.id, true);
			var stats;
			localStorage.getItem(getAuth(player)) ? stats = JSON.parse(localStorage.getItem(getAuth(player))) : stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", 0, "player", player.name, "", "", ""];
			if (stats[Ss.RL] != "admin") {
				stats[Ss.RL] = "admin";
				room.sendAnnouncement(Bot + player.name + " Ahora es alumno de la UTEC !", null, 0x8AFFF7, "bold", 2);
				localStorage.setItem(getAuth(player), JSON.stringify(stats));
			}
		}
	}
	else if (["!setadmin", "!admin"].includes(message[0].toLowerCase())) {
		if (localStorage.getItem(getAuth(player)) && JSON.parse(localStorage.getItem(getAuth(player)))[Ss.RL] == "admin") {
			if (message.length >= 2 && message[1][0] == "#") {
				message[1] = message[1].substring(1, message[1].length);
				if (!Number.isNaN(Number.parseInt(message[1])) && room.getPlayer(Number.parseInt(message[1])) != null) {
					var stats;
					localStorage.getItem(getAuth(room.getPlayer(Number.parseInt(message[1])))) ? stats = JSON.parse(localStorage.getItem(getAuth(room.getPlayer(Number.parseInt(message[1]))))) : stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", 0, "player", room.getPlayer(Number.parseInt(message[1])).name, "", 0x000000, ""];
					if (stats[Ss.RL] == "player") {
						stats[Ss.RL] = "admin";
						localStorage.setItem(getAuth(room.getPlayer(Number.parseInt(message[1]))), JSON.stringify(stats));
						room.setPlayerAdmin(room.getPlayer(Number.parseInt(message[1])).id, true);
						room.sendAnnouncement(Bot + room.getPlayer(Number.parseInt(message[1])).name + " Ahora es alumno de la UTEC !", null, 0x8AFFF7, "bold", 2);
					}
				}
			}
		}
	}
	else if (["!setplayer", "!removeadmin"].includes(message[0].toLowerCase())) {
		if (localStorage.getItem(getAuth(player)) && JSON.parse(localStorage.getItem(getAuth(player)))[Ss.RL] == "admin") {
			if (message.length >= 2 && message[1][0] == "#") {
				message[1] = message[1].substring(1, message[1].length);
				if (!Number.isNaN(Number.parseInt(message[1])) && room.getPlayer(Number.parseInt(message[1])) != null) {
					var stats;
					localStorage.getItem(getAuth(room.getPlayer(Number.parseInt(message[1])))) ? stats = JSON.parse(localStorage.getItem(getAuth(room.getPlayer(Number.parseInt(message[1]))))) : stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", 0, "player", room.getPlayer(Number.parseInt(message[1])).name, "", 0x000000, ""];
					if (stats[Ss.RL] == "admin") {
						room.sendAnnouncement(Bot + room.getPlayer(Number.parseInt(message[1])).name + " Ya no es alumno de la UTEC !", null, 0x8AFFF7, "bold", 2);
						stats[Ss.RL] = "player";
						localStorage.setItem(getAuth(room.getPlayer(Number.parseInt(message[1]))), JSON.stringify(stats));
						room.setPlayerAdmin(room.getPlayer(Number.parseInt(message[1])).id, false);
					}
				}
			}
		}
	}
	else if (["!mutes", "!mutelist"].includes(message[0].toLowerCase())) {
		var cstm = "[ATH] Lista de muteados : ";
		for (var i = 0; i < extendedP.length; i++) {
			if (room.getPlayer(extendedP[i][eP.ID]) != null && getMute(room.getPlayer(extendedP[i][eP.ID]))) {
				if (140 - cstm.length < (room.getPlayer(extendedP[i][eP.ID]).name + "[" + (extendedP[i][eP.ID]) + "], ").length) {
					room.sendAnnouncement(Bot + cstm, player.id, 0x8AFFF7, "bold", 2);
					cstm = "... ";
				}
				cstm += room.getPlayer(extendedP[i][eP.ID]).name + "[" + (extendedP[i][eP.ID]) + "], ";
			}
		}
		if (cstm == "[ATH] Lista de Muteados : ") {
			room.sendAnnouncement(Bot + "[ATH] No hay nadie en la lista de muteados !", player.id, 0x8AFFF7, "bold", 2);
			return false;
		}
		cstm = cstm.substring(0, cstm.length - 2);
		cstm += ".";
		room.sendAnnouncement(cstm, player.id, 0x4ffaff, "bold", 2);
	}
	else if (["!mute"].includes(message[0].toLowerCase())) {
		if (player.admin) {
			updateTeams();
			var timeOut;
			if (!Number.isNaN(Number.parseInt(message[1])) && message.length > 1) {
				if (Number.parseInt(message[1]) > 0) {
					timeOut = Number.parseInt(message[1]) * 60 * 1000;
				}
				else {
					timeOut = 3 * 60 * 1000;
				}
				if (message[2].length > 1 && message[2][0] == "#") {
					message[2] = message[2].substring(1, message[2].length);
					if (!Number.isNaN(Number.parseInt(message[2])) && room.getPlayer(Number.parseInt(message[2])) != null) {
						if (room.getPlayer(Number.parseInt(message[2])).admin || getMute(room.getPlayer(Number.parseInt(message[2])))) {
							return false;
						}
						setTimeout(function (player) { setMute(player, false); }, timeOut, room.getPlayer(Number.parseInt(message[2])));
						setMute(room.getPlayer(Number.parseInt(message[2])), true);
						room.sendAnnouncement(Botroom.getPlayer(Number.parseInt(message[2])).name + " ha sido muteado por " + (timeOut / 60000) + " minutos !", "bold", 1);
					}
				}
			}
			else if (Number.isNaN(Number.parseInt(message[1]))) {
				if (message[1].length > 1 && message[1][0] == "#") {
					message[1] = message[1].substring(1, message[1].length);
					if (!Number.isNaN(Number.parseInt(message[1])) && room.getPlayer(Number.parseInt(message[1])) != null) {
						if (room.getPlayer(Number.parseInt(message[1])).admin || getMute(room.getPlayer(Number.parseInt(message[1])))) {
							return false;
						}
						setTimeout(function (player) { setMute(player, false); }, 3 * 60 * 1000, room.getPlayer(Number.parseInt(message[1])));
						setMute(room.getPlayer(Number.parseInt(message[1])), true);
						room.send(room.getPlayer(Number.parseInt(message[1])).name + " Te han muteado por 3 minutos!", "bold", 1);
					}
				}
			}
		}
	}
	else if (["!unmute"].includes(message[0].toLowerCase())) {
		if (player.admin && message.length >= 2) {
			if (message[1] == "all") {
				extendedP.forEach((ePlayer) => { ePlayer[eP.MUTE] = false; });
				room.sendAnnouncement(Bot + "Se ha limpiado la lista de muteados", null, 0x4ffaff, "bold", 2);
			}
			else if (!Number.isNaN(Number.parseInt(message[1])) && room.getPlayer(Number.parseInt(message[1])) != null && getMute(room.getPlayer(Number.parseInt(message[1])))) {
				setMute(room.getPlayer(Number.parseInt(message[1])), false);
				room.sendAnnouncement(Bot + room.getPlayer(Number.parseInt(message[1])).name + " ha sido desmuteado !", null, 0x96CBFF, "bold", 2);
			}
			else if (Number.isNaN(Number.parseInt(message[1]))) {
				if (message[1].length > 1 && message[1][0] == "#") {
					message[1] = message[1].substring(1, message[1].length);
					if (!Number.isNaN(Number.parseInt(message[1])) && room.getPlayer(Number.parseInt(message[1])) != null && getMute(room.getPlayer(Number.parseInt(message[1])))) {
						setMute(room.getPlayer(Number.parseInt(message[1])), false);
						room.sendAnnouncement(room.getPlayer(Number.parseInt(message[1])).name + " ha sido desmuteado!", "bold", 1);
					}
				}
			}
		}
	}
	else if (["!slow"].includes(message[0].toLowerCase())) {
		if (player.admin) {
			if (message.length == 1) {
				slowMode = 2;
				room.sendAnnouncement(" SLOWCHAT Activado, Esperar 2 segundos por mensaje!", "bold", 1);
			}
			else if (message.length == 2) {
				if (!Number.isNaN(Number.parseInt(message[1]))) {
					if (Number.parseInt(message[1]) > 0) {
						slowMode = Number.parseInt(message[1]);
						room.sendAnnouncement(slowMode + " segundos, SLOWCHAT Activado!!", "bold", 1);
						return false;
					}
				}
				slowMode = 2;
				room.sendAnnouncement("Esperen Mrd !! (2 segundos)!", "bold", 1);
			}
		}
	}
	else if (["!endslow"].includes(message[0].toLowerCase())) {
		if (player.admin) {
			slowMode != 0 ? room.sendAnnouncement("Ya tamo , Gooo .", "bold", 1) : null;
			slowMode = 0;
		}
	}
	else if (["!banlist", "!bans"].includes(message[0].toLowerCase())) {
		if (banList.length == 0) {
			room.sendAnnouncement("[ATH] No hay nadie en la lista de baneados!", player.id, "bold", 1);
			return false;
		}
		var cstm = "[ATH] Lista de baneados : ";
		for (var i = 0; i < banList.length; i++) {
			if (140 - cstm.length < (banList[i][0] + "[" + (banList[i][1]) + "], ").length) {
				room.sendAnnouncement(cstm, player.id);
				cstm = "... ";
			}
			cstm += banList[i][0] + "[" + (banList[i][1]) + "], ";
		}
		cstm = cstm.substring(0, cstm.length - 2);
		cstm += ".";
		room.sendAnnouncement(cstm, player.id);
	}
	else if (["!clearbans"].includes(message[0].toLowerCase())) {
		if (player.admin) {
			if (message.length == 1) {
				room.clearBans();
				room.sendAnnouncement("Bans removidos!");
				banList = [];
			}
			if (message.length == 2) {
				if (!Number.isNaN(Number.parseInt(message[1]))) {
					if (Number.parseInt(message[1]) > 0) {
						ID = Number.parseInt(message[1]);
						room.clearBan(ID);
						if (banList.length != banList.filter((array) => array[1] != ID)) {
							room.sendAnnouncement(banList.filter((array) => array[1] == ID)[0][0] + " ha sido baneado del host !");
						}
						setTimeout(() => { banList = banList.filter((array) => array[1] != ID); }, 20);
					}
				}
			}
		}
	}

	else if (["!bb", "!bye", "!cya", "!gn"].includes(message[0].toLowerCase())) {
		room.kickPlayer(player.id, "Nos vemos mrd !", false);
	}



    // Example command for creating soccer jerseys of "teams"
    // Must use hexadecimal colors for it, [0x'HEXCOLOR']
    // setTeamColors(team : TeamID, angle : float, textColor : int, colors : []int) : void

	else if (["!camiseta"].includes(message[0].toLowerCase()) && player.team != 0)
	{
		var correct = true;
		if (message[1].toLowerCase() == "aguilas")
		{
			if (player.team == 1) {room.setTeamColors(Team.RED, 0 , 0xFFFFFF , [0x6B0B6A , 0x6B0B6A , 0x000000]);}
			else{room.setTeamColors(Team.BLUE, 0, 0xFFFFFF , [0x6B0B6A , 0x6B0B6A , 0x000000]);}
		}

		else if (message[1].toLowerCase() == "abejitas")
		{
			if (player.team == 1) {room.setTeamColors(Team.RED, 125,0xFFFFFF, [0xFFDD00, 0x000000, 0xFFDD00]);}
			else{room.setTeamColors(Team.BLUE, 125 , 0xFFFFFF  , [0xFFDD00  , 0x000000  , 0xFFDD00]);}
		}
		else if (message[1].toLowerCase() == "borrachos")
		{
			if (player.team == 1) {room.setTeamColors(Team.RED, 60 ,0xFFFFFF , [0xE8C538 , 0xFFF569]);}
			else{room.setTeamColors(Team.BLUE, 60 ,0xFFFFFF , [0xE8C538 , 0xFFF569]);}
		}
		else if (message[1].toLowerCase() == "mishari")
		{
			if (player.team == 1) {room.setTeamColors(Team.RED, 55  ,0xFFFFFF  , [0xCC003D , 0x8A0D21  , 0xCC003D]);}
			else{room.setTeamColors(Team.BLUE, 55 , 0xFFFFFF  , [0xCC003D  , 0x8A0D21  , 0xCC003D]);}
		}
		else if (message[1].toLowerCase() == "expropiadores")
		{
			if (player.team == 1) {room.setTeamColors(Team.RED, 90 ,0xFFFFFF, [0x000000]);}
			else{room.setTeamColors(Team.BLUE, 90 ,0xFFFFFF, [0x000000]);}
		}
		else if (message[1].toLowerCase() == "liverpool")
		{
			if (player.team == 1) {room.setTeamColors(Team.RED, 0 ,0xFFFFFF , [0xCC0000, 0xCC0000, 0x8A0000]);}
			else{room.setTeamColors(Team.BLUE, 0 ,0xFFFFFF , [0xCC0000, 0xCC0000, 0x8A0000]);}
		}
		else if (message[1].toLowerCase() == "rechuchamboys")
		{
			if (player.team == 1) {room.setTeamColors(Team.RED, 90  ,0x000000 , [0xFFA203 , 0xFFA203 , 0x000000]);}
			else{room.setTeamColors(Team.BLUE, 90  ,0x000000 , [0xFFA203 , 0xFFA203 , 0x000000]);}
		}
		else if (message[1].toLowerCase() == "machos")
		{
			if (player.team == 1) {room.setTeamColors(Team.RED, 55   ,0x000000 , [0xC7180C  , 0xFAFAFA  , 0x961209]);}
			else{room.setTeamColors(Team.BLUE, 55   ,0x000000 , [0xC7180C  , 0xFAFAFA  , 0x961209]);}
		}
		else if (message[1].toLowerCase() == "psg")
		{
			if (player.team == 1) {room.setTeamColors(Team.RED, 0    ,0xFFFFFF  , [0x002A42 , 0xBD0000 , 0x002A42]);}
			else{room.setTeamColors(Team.BLUE, 0 ,0xFFFFFF  , [0x002A42 , 0xBD0000 , 0x002A42]);}
		}
		else if (message[1].toLowerCase() == "victoria")
		{
			if (player.team == 1) {room.setTeamColors(Team.RED, 0 ,0x000000  , [0xFF1717  , 0xFFFFFF  , 0xFF1717]);}
			else{room.setTeamColors(Team.BLUE, 0 ,0x000000  , [0xFF1717  , 0xFFFFFF  , 0xFF1717]);}
		}
		else if (message[1].toLowerCase() == "lorient")
		{
			if (player.team == 1) {room.setTeamColors(Team.RED, 60 ,0x000000  , [0x2AD600   , 0x21C200   , 0x11B000]);}
			else{room.setTeamColors(Team.BLUE, 60 ,0x000000 , [0x2AD600   , 0x21C200   , 0x11B000]);}
		}
		else if (message[1].toLowerCase() == "devils")
		{
			if (player.team == 1) {room.setTeamColors(Team.RED, 60  ,0xCCC125   , [0xED1000    , 0xC40D00    , 0xF7F7F0]);}
			else{room.setTeamColors(Team.BLUE, 60  ,0xCCC125   , [0xED1000    , 0xC40D00    , 0xF7F7F0]);}
		}
		else if (message[1].toLowerCase() == "callao")
		{
			if (player.team == 1) {room.setTeamColors(Team.RED, 60   ,0xF0D7D5    , [0xDE6E6A     , 0xBF4545     , 0xA82A2A]);}
			else{room.setTeamColors(Team.BLUE, 60   ,0xF0D7D5    , [0xDE6E6A     , 0xBF4545     , 0xA82A2A]);}
		}
		else
		{
			console.log("Bad actor");
			correct = false;
		}
		if (correct == true){
			room.sendAnnouncement(player.name + " cambio las camisetas del equipo a " + message[1], null, 0x4ffaff, "bold", 1);
		}


	}

	else if (["!camisetahelp"].includes(message[0].toLowerCase()))
	{
		room.sendAnnouncement("[ATH] !camiseta [Nombre Del Equipo] : aguilas, abejitas, borrachos, mishari, expropiadores, liverpool, rechuchamboys, machos, psg, victoria, lorient, devils, callao, atheros [ In progress ]", player.id, 0x4ffaff, "bold", 2);
	}


	if (teamR.length != 0 && teamB.length != 0 && inChooseMode) {
		if (player.id == teamR[0].id || player.id == teamB[0].id) { // we care if it's one of the captains choosing
			if (teamR.length <= teamB.length && player.id == teamR[0].id) { // we care if it's red turn && red cap talking
				if (["top", "auto"].includes(message[0].toLowerCase())) {
					room.setPlayerTeam(teamS[0].id, Team.RED);
					redCaptainChoice = "top";
					clearTimeout(timeOutCap);
					room.sendAnnouncement(player.name + " elegiste Top !");
					return false;
				}
				else if (["random", "rand"].includes(message[0].toLowerCase())) {
					var r = getRandomInt(teamS.length);
					room.setPlayerTeam(teamS[r].id, Team.RED);
					redCaptainChoice = "random";
					clearTimeout(timeOutCap);
					room.sendAnnouncement(player.name + " elegiste Random !");
					return false;
				}
				else if (["bottom", "bot"].includes(message[0].toLowerCase())) {
					room.setPlayerTeam(teamS[teamS.length - 1].id, Team.RED);
					redCaptainChoice = "bottom";
					clearTimeout(timeOutCap);
					room.sendAnnouncement(player.name + " elegiste Bottom !");
					return false;
				}
				else if (!Number.isNaN(Number.parseInt(message[0]))) {
					if (Number.parseInt(message[0]) > teamS.length || Number.parseInt(message[0]) < 1) {
						room.sendAnnouncement("[ATH] El número que elegiste es inválido !", player.id);
						return false;
					}
					else {
						room.setPlayerTeam(teamS[Number.parseInt(message[0]) - 1].id, Team.RED);
						room.sendAnnouncement(player.name + " eligió a " + teamS[Number.parseInt(message[0]) - 1].name + " !", 0x4ffaff, "bold", 1);
						return false;
					}
				}
			}
			if (teamR.length > teamB.length && player.id == teamB[0].id) { // we care if it's red turn && red cap talking
				if (["top", "auto"].includes(message[0].toLowerCase())) {
					room.setPlayerTeam(teamS[0].id, Team.BLUE);
					blueCaptainChoice = "top";
					clearTimeout(timeOutCap);
					room.sendAnnouncement(player.name + " seleccionó Top !");
					return false;
				}
				else if (["random", "rand"].includes(message[0].toLowerCase())) {
					room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE);
					blueCaptainChoice = "random";
					clearTimeout(timeOutCap);
					room.sendAnnouncement(player.name + " seleccionó Random !");
					return false;
				}
				else if (["bottom", "bot"].includes(message[0].toLowerCase())) {
					room.setPlayerTeam(teamS[teamS.length - 1].id, Team.BLUE);
					blueCaptainChoice = "bottom";
					clearTimeout(timeOutCap);
					room.sendAnnouncement(player.name + " seleccionó Bottom !");
					return false;
				}
				else if (!Number.isNaN(Number.parseInt(message[0]))) {
					if (Number.parseInt(message[0]) > teamS.length || Number.parseInt(message[0]) < 1) {
						room.sendAnnouncement("[ATH] El número que elegiste es inválido !", player.id);
						return false;
					}
					else {
						room.setPlayerTeam(teamS[Number.parseInt(message[0]) - 1].id, Team.BLUE);
						room.sendAnnouncement(player.name + " eligió " + teamS[Number.parseInt(message[0]) - 1].name + " !", 0x4ffaff, "bold", 1);
						return false;
					}
				}
			}

		}

	}
	if (message[0][0] == "!") {
		return false;
	}
	if (getMute(player)) {
		room.sendAnnouncement("Usted está muteado.", player.id);
		return false;
	}

	if (slowMode > 0) {
		if (!player.admin) {
			if (!SMSet.has(player.id)) {
				SMSet.add(player.id);
				setTimeout((number) => { SMSet.delete(number); }, slowMode * 1000, player.id);
			}
			else {
				return false;
			}
		}
	}

    // Special chat settings for Admin and specific players (Using nicks)
	else if (player.admin && player.name != botName) {
		var stats;
		localStorage.getItem(getAuth(player)) ? stats = JSON.parse(localStorage.getItem(getAuth(player))) : stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", 0, "player", player.name, "", "", ""];
		room.sendAnnouncement("[" + stats[Ss.EMOJI] + "] " + player.name + ": " + message.join(" "), null, "0x" + stats[Ss.COLOR] , "bold", 1);
		return false;
	}

	else if (!player.admin) {
			/*room.sendAnnouncement(player.name + ": " + message.join(" ") , null , player.team == 1 ? 0xFF7438 : player.team == 0 ? 0xffffff : 0x2C6AC7, "normal", 1);*/
			room.sendAnnouncement((player.team == 1 ? "🔴 " + player.name + ": " + message.join(" ") : player.team == 0 ? player.name + ": " + message.join(" ") : "🔵 " + player.name + ": " + message.join(" ")), null , player.team == 1 ? 0xFF0000 : player.team == 0 ? 0xffffff : 0x2C6AC7, "normal", 1);
			return false;

	}

}

room.onPlayerActivity = function(player) {
	setActivity(player, 0);
}
