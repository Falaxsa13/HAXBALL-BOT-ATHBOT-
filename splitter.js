const fs = require('fs');
const path = require('path');

// Paths to the directories where the files will be split back
const functionsDir = path.join(__dirname, 'modules', 'functions');
const modulesDir = path.join(__dirname, 'modules');
const eventsDir = path.join(__dirname, 'modules', 'events');

// Ensure the target directories exist, or create them
if (!fs.existsSync(functionsDir)) fs.mkdirSync(functionsDir, { recursive: true });
if (!fs.existsSync(modulesDir)) fs.mkdirSync(modulesDir, { recursive: true });
if (!fs.existsSync(eventsDir)) fs.mkdirSync(eventsDir, { recursive: true });

// Path to the combined main.js file
const mainFilePath = path.join(__dirname, 'main.js');

// Read the content of the main.js file
const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');

// Split the content by filename marker (i.e., `// filename.js`)
const fileSections = mainFileContent.split(/\n\/\/\s(.+)\n/).filter(Boolean);

// Helper function to determine where the file should be written
function getDirectory(fileName) {
    const eventsFiles = ['onPlayerJoin.js', 'onPlayerTeamChange.js', 'onPlayerLeave.js', 'onPlayerChat.js', 'onPlayerBallKick.js', 'gameManagement.js', 'onTeamGoal.js'];
    const functionsFiles = ['time.js', 'start_game.js', 'game_setup.js', 'getAuth.js', 'player_control.js', 'balance_choose.js', 'stats.js'];
    const modulesFiles = ['setup.js', 'maps.js', 'variables.js', 'objects.js', 'auxiliary_functions.js'];

    if (eventsFiles.includes(fileName)) return eventsDir;
    if (functionsFiles.includes(fileName)) return functionsDir;
    if (modulesFiles.includes(fileName)) return modulesDir;
    return null;
}

// Iterate over the split content and write each part to its respective file
for (let i = 0; i < fileSections.length; i += 2) {
    const fileName = fileSections[i].trim();
    const fileContent = fileSections[i + 1];

    const targetDirectory = getDirectory(fileName);
    if (targetDirectory) {
        const filePath = path.join(targetDirectory, fileName);

        // Write the content back to the individual file
        fs.writeFileSync(filePath, fileContent.trim() + '\n', 'utf8');
        console.log(`File created: ${filePath}`);
    } else {
        console.log(`No matching directory for: ${fileName}`);
    }
}

console.log('main.js has been split back into individual files!');
