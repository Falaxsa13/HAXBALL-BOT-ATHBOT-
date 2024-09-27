// Stats: "Auth" : '["0-Games", "1-Wins", "2-Draws", "3-Losses", "4-Winrate", "5-Goals", "6-Assists", "7-GK", "8-CS", "9-CS%", "10- ELO", "11-Role", "12-Nick"]'

/* VARIABLES */

/* ROOM */

const Bot = "ATH BOT: "; // Bot's name

// GLOBAL VARIABLES //
const roomName = "💎FUTSAL X4 | ATHBOT 💎";
const botName = "Uteclaxsa BOT";
const maxPlayers = 50;
const roomPublic = false;

// GEOLOCALIZATION //
const geo = [{"code": "PE", "lat": -12.1, "lon": -76.9}];

// Admin password //
var adminPassword = 130422102703;

const room = HBInit({ roomName: roomName, maxPlayers: maxPlayers, public: roomPublic, playerName: botName, geo: geo[0] });

// GAME SETTINGS //
const scoreLimitClassic = 3;
const scoreLimitBig = 3;
const timeLimitClassic = 4;
const timeLimitBig = 4;

room.setTeamsLock(true);


var player_size = 15;
