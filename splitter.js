const fs = require('fs');
const path = require('path');

const functionsDir = path.join(__dirname, 'modules', 'functions');
const modulesDir = path.join(__dirname, 'modules');
const eventsDir = path.join(__dirname, 'modules', 'events');

if (!fs.existsSync(functionsDir)) fs.mkdirSync(functionsDir, { recursive: true });
if (!fs.existsSync(modulesDir)) fs.mkdirSync(modulesDir, { recursive: true });
if (!fs.existsSync(eventsDir)) fs.mkdirSync(eventsDir, { recursive: true });

const mainFilePath = path.join(__dirname, 'main.js');

const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');

const fileSections = mainFileContent.split(/\n\/\/\s(.+)\n/).filter(Boolean);

function getDirectory(fileName) {
    const eventsFiles = ['onPlayerJoin.js', 'onPlayerTeamChange.js', 'onPlayerLeave.js', 'onPlayerChat.js', 'onPlayerBallKick.js', 'gameManagement.js', 'onTeamGoal.js'];
    const functionsFiles = ['time.js', 'start_game.js', 'game_setup.js', 'getAuth.js', 'player_control.js', 'balance_choose.js', 'stats.js'];
    const modulesFiles = ['setup.js', 'maps.js', 'variables.js', 'objects.js', 'auxiliary_functions.js'];

    if (eventsFiles.includes(fileName)) return eventsDir;
    if (functionsFiles.includes(fileName)) return functionsDir;
    if (modulesFiles.includes(fileName)) return modulesDir;
    return null;
}

for (let i = 0; i < fileSections.length; i += 2) {
    const fileName = fileSections[i].trim();
    const fileContent = fileSections[i + 1];

    const targetDirectory = getDirectory(fileName);
    if (targetDirectory) {
        const filePath = path.join(targetDirectory, fileName);

        fs.writeFileSync(filePath, fileContent.trim() + '\n', 'utf8');
        console.log(`File created: ${filePath}`);
    } else {
        console.log(`No matching directory for: ${fileName}`);
    }
}

console.log('main.js has been split back into individual files!');
