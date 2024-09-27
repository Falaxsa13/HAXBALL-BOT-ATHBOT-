const fs = require('fs');
const path = require('path');

const functionsDir = path.join(__dirname, 'modules', 'functions');
const modulesDir = path.join(__dirname, 'modules');
const eventsDir = path.join(__dirname, 'modules', 'events');

const filesInOrder = [
    path.join(modulesDir, 'setup.js'),
    path.join(modulesDir, 'maps.js'),
    path.join(modulesDir, 'variables.js'),
    path.join(modulesDir, 'objects.js'),
    path.join(modulesDir, 'auxiliary_functions.js'),
    path.join(functionsDir, 'time.js'),
    path.join(functionsDir, 'start_game.js'),
    path.join(functionsDir, 'game_setup.js'),
    path.join(functionsDir, 'getAuth.js'),
    path.join(functionsDir, 'player_control.js'),
    path.join(functionsDir, 'balance_choose.js'),
    path.join(functionsDir, 'stats.js'),
    path.join(eventsDir, 'onPlayerJoin.js'),
    path.join(eventsDir, 'onPlayerTeamChange.js'),
    path.join(eventsDir, 'onPlayerLeave.js'),
    path.join(eventsDir, 'onPlayerChat.js'),
    path.join(eventsDir, 'onPlayerBallKick.js'),
    path.join(eventsDir, 'gameManagement.js'),
    path.join(eventsDir, 'onTeamGoal.js'),
];

const outputFilePath = path.join(__dirname, 'main.js');
fs.writeFileSync(outputFilePath, '', 'utf8');

function appendFileContent(filePath) {
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        fs.appendFileSync(outputFilePath, `\n// ${path.basename(filePath)}\n`);
        fs.appendFileSync(outputFilePath, fileContent + '\n');
    } else {
        console.log(`File not found: ${filePath}`);
    }
}

filesInOrder.forEach(filePath => {
    appendFileContent(filePath);
});

console.log(`All files combined into ${outputFilePath}`);