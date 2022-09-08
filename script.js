var mode = `getting username`;
var outPut = ``;
var playerName = ``;

var main = function (input) {
  //every input strings to lower case to avoid small errors
  var playerInput = input.toLowerCase();

  //inputs that are neither rock, paper nor scissors
  if (mode == `getting username`) {
    outPut = usernameInput(playerInput);
  } else if (mode == `getting game mode`) {
    outPut = gameMode(playerInput);
  } else if (mode == `regular`) {
    outPut = regularGame(playerInput);
  } else if (mode == `reverse`) {
    outPut = reverseGame(playerInput);
  }
  return outPut;
};

var SCISSORS = "scissors";
var PAPER = "paper";
var ROCK = "rock";
var reverseSCISSORS = "reversed scissors";
var reversePAPER = "reversed paper";
var reverseROCK = "reversed rock";

var randomForComputer = function () {
  var random = Math.floor(Math.random() * 3);

  if (random == 0) {
    return SCISSORS;
  }
  if (random == 1) {
    return PAPER;
  }
  if (random == 2) {
    return ROCK;
  }
};

var tieFunction = function (playerInput, randomForComputer) {
  return playerInput == randomForComputer;
};

var winFunction = function (playerInput, randomForComputer) {
  return (
    (playerInput == SCISSORS && randomForComputer == PAPER) ||
    (playerInput == PAPER && randomForComputer == ROCK) ||
    (playerInput == ROCK && randomForComputer == SCISSORS) 
  );
};

var iconFunciton = function (object) {
  if (object == SCISSORS) return "\u2702";
  if (object == PAPER) return "\uD83D\uDCC4";
  if (object == ROCK) return "	\uD83E\uDEA8";
};

//get username state
var usernameInput = function (playerInput) {
  if (playerInput != "") {
    playerName = playerInput;
    mode = `getting game mode`;
    return `Hey ${playerName}, enter "regular" or "reverse" for your game mode.`;
  } else {
    return `Please enter your name again.`;
  }

  //return playerInput != SCISSORS && playerInput != PAPER && playerInput != ROCK;
};

//get game mode state
var gameMode = function (playerInput) {
  if (playerInput == `regular`) {
    mode = `regular`;
    return `You are playing in ${mode} mode! Please enter either scissors or paper or rock!`;
  } else if (playerInput == `reverse`) {
    mode = `reverse`;
    return `You are playing in ${mode} mode! Please enter either scissors or paper or rock!`;
  } else {
    return `Please enter regular or reverse to start playing.`;
  }
};

var gameCounts = 0;
var playerWinCounts = 0;
var computerWinCounts = 0;
var draw = 0;

//player win +
var regularWin = function (playerInput, randomForComputer) {
  var playerIcon = iconFunciton(playerInput);
  var computerIcon = iconFunciton(randomForComputer);
  gameCounts += 1;
  playerWinCounts += 1;
  return `You win ${playerName}! <br><br> You got ${playerInput} ${playerIcon} against the computer's ${computerIcon}. <br><br> Total matches: ${gameCounts} <br> ${playerName} wins: ${playerWinCounts} <br> Computer wins: ${computerWinCounts} <br> Total draws: ${draw}`;
};

var regularLose = function (playerInput, randomForComputer) {
  var playerIcon = iconFunciton(playerInput);
  var computerIcon = iconFunciton(randomForComputer);
  gameCounts += 1;
  computerWinCounts += 1;
  return `You lose ${playerName}! <br><br> You got  ${playerInput} ${playerIcon} against the computer's ${computerIcon}. <br><br> Total matches: ${gameCounts} <br> ${playerName} wins: ${playerWinCounts} <br> Computer wins: ${computerWinCounts} <br> Total draws: ${draw}`;
};

var regularGame = function (playerInput) {
  var computerInput = randomForComputer();
  //regular win conditions
  if (
    (playerInput == SCISSORS && computerInput == PAPER) ||
    (playerInput == PAPER && computerInput == ROCK) ||
    (playerInput == ROCK && computerInput == SCISSORS)
  ) {
    return regularWin(playerInput, computerInput);

    //regular lose conditions
  } else if (
    (playerInput == ROCK && computerInput == PAPER) ||
    (playerInput == SCISSORS && computerInput == ROCK) ||
    (playerInput == PAPER && computerInput == SCISSORS)
  ) {
    return regularLose(playerInput, computerInput);
  }

  //tie conditions
  else if (playerInput == computerInput) {
    var playerIcon = iconFunciton(playerInput);
    var computerIcon = iconFunciton(computerInput);
    gameCounts += 1;
    draw += 1;
    return `You are tied ${playerName}! <br><br> It is ${playerInput} ${playerIcon} against ${computerInput} ${computerIcon}. <br><br> Total matches: ${gameCounts} <br> ${playerName} wins: ${playerWinCounts} <br> Computer wins: ${computerWinCounts} <br> Total draws: ${draw}`;
  }

  //if user chooses reverse mode
  else if (playerInput == `reverse`) {
    mode = `reverse`;
    return `You are playing the reversed version. Now enter scissors or paper or rock.`;
  } else {
    return `Please enter either scissors or paper or rock!`;
  }
};

var reverseGame = function (playerInput) {
  var computerInput = randomForComputer();
  //reverse lose conditions
  if (
    (playerInput == SCISSORS && computerInput == PAPER) ||
    (playerInput == PAPER && computerInput == ROCK) ||
    (playerInput == ROCK && computerInput == SCISSORS)
  ) {
    return `Reversed Mode: ${regularLose(playerInput, computerInput)}`;

    //regular win conditions
  } else if (
    (playerInput == ROCK && computerInput == PAPER) ||
    (playerInput == SCISSORS && computerInput == ROCK) ||
    (playerInput == PAPER && computerInput == SCISSORS)
  ) {
    return `Reversed Mode: ${regularWin(playerInput, computerInput)}`;
  }

  //tie conditions
  else if (playerInput == computerInput) {
    var playerIcon = iconFunciton(playerInput);
    var computerIcon = iconFunciton(computerInput);
    gameCounts += 1;
    draw += 1;
    return `Reversed Mode: You are tied ${playerName}! <br><br> It is ${playerInput} ${playerIcon} against ${computerInput} ${computerIcon}. <br><br> Total matches: ${gameCounts} <br> ${playerName} wins: ${playerWinCounts} <br> Computer wins: ${computerWinCounts} <br> Total draws: ${draw}`;
  }

  //if user chooses reverse mode
  else if (playerInput == `regular`) {
    mode = `regular`;
    return `You are playing the regular version. Now enter scissors or paper or rock.`;
  } else {
    return `Please enter either scissors or paper or rock!`;
  }
};
