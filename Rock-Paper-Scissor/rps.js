const readline = require("readline");
const fs = require("fs");

const settings = {
  "New": true,
  "Match": 0,
  "Win": 0,
  "Lose": 0
};
const settingsFile = require("./database.json");

// Import Database Storage
settings["New"] = settingsFile["New"]
settings["Match"] = settingsFile["Match"]
settings["Win"] = settingsFile["Win"]
settings["Lose"] = settingsFile["Lose"]
settings["Tie"] = settingsFile["Tie"]


// Clean console to have better experience
console.clear()

//Game Credit (please don't remove, i spent for a hour on this)
const gamefact = [
  "Thanks for playing!",
  "You should try minecraft!",
  "You should delete Roblox!",
  "Touch grass can turn you into a gigachad",
  "Is nerd Smart?",
  "You won't forgot who am i",
  "The ocean have unlimited chunk",
  "You can fly in real life",
  "2[0]21 + 2[0]22 + 2[0]23 = 6[0]66",
  "I'll drop a bomb to your house",
  "/summon gigachad",
  "It's [the [player?]]",
  "How to hack?",
  "Adding a line to Start game function to hack",
  "You are a giga chad!",
  "Awesome!",
  "Yaaay!",
  "Bring me the light!",
  "Also try Minecraft!",
  "Also try Terraria!",
  "Déjà vu!",
  "Have you finished your homework?"
]

const randomgamefact = gamefact[Math.floor(Math.random() * gamefact.length)]

// Minecraft Special Splashes
if (new Date().getMonth() === "1" && new Date().getDate() === "1") randomgamefact = "Happy new year!"
if (new Date().getMonth() === "12" && new Date().getDate() === "24") randomgamefact = "Merry X-mas!"
if (new Date().getMonth() === "10" && new Date().getDate() === "31") randomgamefact = "OOoooOOOoooo! Spooky!"

console.log("Rock-Paper-Scissor v1.0 | " + randomgamefact + "\n")

// Create game interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Game Character
const gamecharacter = ["rock", "paper", "scissor"]

function Save() {
  fs.writeFileSync("./database.json", JSON.stringify(settings));
}

function Commands() {
  rl.question("Run the command [help/stats/play/quit]: ", function(answer) {
      if (!(answer.toLowerCase().trim() === "help" || answer.toLowerCase().trim() === "stats" || answer.toLowerCase().trim() === "play" || answer.toLowerCase().trim() === "quit" || answer.toLowerCase().trim() === "stop")) return Commands();
    
      if (answer.toLowerCase().trim() === "help") {
        console.log("Just play like a normal Rock-Paper-Scissor game.\nYou can use command during a match.\nCommands:\nHelp: showing the help panel\nStats: Show your game win and lose stats.\n\nHave fun!")
        Commands()
      } else if (answer.toLowerCase().trim() === "stats"){
        console.log(`Stats:\n   Win:${settings["Win"]}\n   Lose:${settings["Lose"]}\n   Tie:${settings["Tie"]}`)
        Commands()
      } else if (answer.toLowerCase().trim() === "play"){
        StartGame();
      } else if (answer.toLowerCase().trim() === "quit" || answer.toLowerCase().trim() === "stop"){
        console.log(`Goodbye, see ya!`)
        process.exit(0)
      }
  });
}

function StartGame() {
  rl.question("Choose your answer: [Rock/Paper/Scissor]: ", function(answerback) {
    const botrandom = gamecharacter[Math.floor(Math.random() * gamecharacter.length)]
    const botfrontend = botrandom.charAt(0).toUpperCase() + botrandom.slice(1);
    const answer = answerback.toLowerCase().trim();
    const answerfrontend = answer.charAt(0).toUpperCase() + answer.slice(1);
      if (answer === "/c" || answer === "/cmds" || answer === "/command") return Commands();
    
      if (answer === botrandom) {
        console.log(`Tie!\nYou choose: ${answerfrontend} | Bot Choose: ${botfrontend}\n`);
        settings["Tie"]++;
        Save();
        Commands();
      }

      if ((answer === "rock" && botrandom === "scissor") || (answer === "paper" && botrandom === "rock") || (answer === "scissor" && botrandom === "paper")) {
        console.log(`You Win!\nYou choose: ${answerfrontend} | Bot Choose: ${botfrontend}\n`);
        settings["Win"]++;
        Save();
        Commands();
      }

      if ((answer === "rock" && botrandom === "paper") || (answer === "paper" && botrandom === "scissor") || (answer === "scissor" && botrandom === "rock")) {
        console.log(`You lose, took an L.\nYou choose: ${answerfrontend} | Bot Choose: ${botfrontend}\n`);
        settings["Lose"]++;
        Save();
        Commands();
      }
  });
}

if (settings["New"] === false) {
  StartGame();
} else {
  rl.question("You are new to the game, do you need help?", function(answer) {
      if (answer.toLowerCase().trim() === "yes" || answer.toLowerCase().trim() === "sure") {
        console.log("Just play like a normal Rock-Paper-Scissor game.\nYou can use command during a match.\nCommands:\nHelp: showing the help panel.\nStats: Show your game win and lose stats.\nPlay: Start the game.\nQuit/Stop: Quit the game.\n\nHave fun!")
        settings["New"] = false;
        Save();
      } else if (answer.toLowerCase().trim() === "no" || answer.toLowerCase().trim() === "unsure" || answer.toLowerCase().trim() === "don't"){
        console.log("Alright, have fun!\n")
        settings["New"] = false;
        Save();
        StartGame();
      }
  });
}
