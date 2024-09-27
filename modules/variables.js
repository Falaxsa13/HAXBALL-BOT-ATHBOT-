/* OPTIONS */
const afkLimit = 12;
const drawTimeLimit = Infinity;
const maxTeamSize = 4;
let slowMode = 0;

/* PLAYERS */
const Team = { SPECTATORS: 0, RED: 1, BLUE: 2 };
const extendedP = [];
// Player Object ID, AUTH, CONNECTION, AFK STATUS, ACTIVITY, GOALKEEPER, MUTE
const eP = { ID: 0, AUTH: 1, CONN: 2, AFK: 3, ACT: 4, GK: 5, MUTE: 6};
// Stats: "Auth" : '["0-Games", "1-Wins", "2-Draws", "3-Losses", "4-Winrate", "5-Goals", "6-Assists", "7-GK", "8-CS", "9-CS%", "10- ELO", "11-Role", "12-Nick", "13-Emoji", "14-Color", "15-MSG"]'
const Ss = { GA: 0, WI: 1, DR: 2, LS: 3, WR: 4, GL: 5, AS: 6, GK: 7, CS: 8, CP: 9, ELO: 10, RL: 11, NK: 12, EMOJI: 13, COLOR: 14, MSG: 15};
let players;
let teamR;
let teamB;
let teamS;

/* GAME */

let lastTeamTouched; // helps track Goals
let lastPlayersTouched; // helps track Goals
let countAFK = false; // Helps track Activity
let activePlay = false; // helps track ball Posession
let goldenGoal = false;
const SMSet = new Set(); // Slowmode
let banList = []; // helps track bans

/* STATS */

let game;
let GKList = ["", ""];
let Rposs = 0;
let Bposs = 0;
const point = [{"x": 0, "y": 0}, {"x": 0, "y": 0}]; // created to get ball speed
let ballSpeed;
let lastWinner = Team.SPECTATORS;
let streak = 0;
let allBlues = []; // This is to count the players who should be counted for the stats. This includes players who left after the game has started, doesn't include those who came too late or ...
let allReds = []; // ... those who came in a very unequal game.

/* BALANCE & CHOOSE */

let inChooseMode = false; // This variable enables to distinguish the 2 phases of playing and choosing which should be dealt with very differently
let redCaptainChoice = "";
let blueCaptainChoice = "";
const chooseTime = 20;
let timeOutCap;

/* AUXILIARY */

let checkTimeVariable = false; // This is created so the chat doesn't get spammed when a game is ending via timeLimit
let statNumber = 0; // This allows the room to be given stat information every X minutes
let endGameVariable = false; // This variable with the one below helps distinguish the cases where games are stopped because they have finished to the ones where games are stopped due to player movements or resetting teams
let resettingTeams = false;
let capLeft = false;
const statInterval = 6;

loadMap(aloneMap, 0, 0);
