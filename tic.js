/**
 * File: /Users/bradsmialek/tlg/javaScript/projects/tic-tac-toe/tic.js
 * Project: /Users/bradsmialek/tlg/javaScript/projects/tic-tac-toe
 * Created Date: Friday, May 29th 2020, 8:48:54 am
 * Author: Brad Smialek
 * -----
 * Last Modified: Sun May 31 2020
 * Modified By: Brad Smialek
 * ------------------------------------
 * Quokka: option q, q
 * Comments: option d
 * Highlight Line Wrap: command h, '
 * Peacock: option p, c
 * Line String Log: command L
 * Down log: command k
 */

//TODO: DEBUG Visualizer !!


const readline = require("readline");
const prompt = require("prompt");
const colors = require("colors/safe");
const chalk = require("chalk");
const emoji = require("node-emoji");

// =============================================================================
// READLINE
// =============================================================================
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// =============================================================================
// GET NAMES & PIECES
// =============================================================================
const playerNames = function () {
  let playerOne = rl.question(
    chalk.greenBright("Player 1 enter your name: "),
    (name) => name
  );
  let pOneEmoji = emojis(playerOne);
  let playerTwo = rl.question(
    chalk.greenBright("Player 2 enter your name: "),
    (name) => name
  );
  let pTwoEmoji = emojis(playerTwo);
  let it = readline.question();
  return { playerOne, playerTwo, pOneEmoji, pTwoEmoji };
};

// =============================================================================
// PICK PLAYER PIECE
// =============================================================================
const emojis = function (name) {
  let emojiArr = [];
  for (let i = 0; i < 5; i++) {
    emojiArr[i] = emoji.random().emoji;
  }
  index = rl.keyInSelect(
    emojiArr,
    chalk.greenBright(`Pick your player piece ${name}`)
  );
  emojiArr[index];
  console.log("You picked: " + emojiArr[index]);
  return emojiArr[index];
};

// =============================================================================
// PRINT GAMEBOARD
// =============================================================================
const printBoard = function (gameBoard) {
  console.log(
    chalk.yellow.bgBlackBright(
      gameBoard[0][0],
      " ",
      "|",
      gameBoard[0][1],
      "",
      "|",
      gameBoard[0][2],
      " "
    )
  );
  console.log(chalk.yellow.bgBlackBright("----+----+----"));
  console.log(
    chalk.yellow.bgBlackBright(
      gameBoard[1][0],
      " ",
      "|",
      gameBoard[1][1],
      "",
      "|",
      gameBoard[1][2],
      " "
    )
  );
  console.log(chalk.yellow.bgBlackBright("----+----+----"));
  console.log(
    chalk.yellow.bgBlackBright(
      gameBoard[2][0],
      " ",
      "|",
      gameBoard[2][1],
      "",
      "|",
      gameBoard[2][2],
      " "
    )
  );
};

// =============================================================================
//
// =============================================================================
const checkWinner = function (gameBoard, player, row, col) {
  // check horizontal
  if (
    gameBoard[row][(col + 2) % 3] === player &&
    gameBoard[row][(col + 1) % 3] === player
  ) {
    return true;
  }

  // check vertical
  if (
    gameBoard[(row + 2) % 3][col] === player &&
    gameBoard[(row + 1) % 3][col] === player
  ) {
    return true;
  }
  // check major diag
  if (
    row === col &&
    gameBoard[(row + 2) % 3][(col + 2) % 3] === player &&
    gameBoard[(row + 1) % 3][(col + 1) % 3] === player
  ) {
    return true;
  }
  // check minor diag
  if (
    row + col === 2 &&
    gameBoard[(row + 2) % 3][(col + 1) % 3] === player &&
    gameBoard[(row + 1) % 3][(col + 2) % 3] === player
  ) {
    return true;
  }

  return false;
};

// =============================================================================
//
// =============================================================================
const takeTurn = function (gameBoard, players) {
  console.log(players);
  let playerOne = players.playerOne;
  let playerTwo = players.playerTwo;
  console.log(playerOne);
  console.log(playerTwo);

  printBoard(gameBoard);

  console.log("Player ", players.playerOne, ", make your move (1-9).");

  prompt.get(["square"], function (result) {
    console.log("result line 73", result);

    if (!(result.square > 0 && result.square < 10)) {
      console.log(`${result.square} is not a valid input [1-9]`);
      takeTurn(gameBoard, players);
    } else {
      var row = Math.floor((result.square - 1) / 3);
      var col = (result.square - 1) % 3;

      if (gameBoard[row][col] !== result.square) {
        console.log("Please select a valid square.");
        takeTurn(gameBoard, players);
      } else {
        gameBoard[row][col] = players;
      }

      if (checkWinner(gameBoard, players, row, col)) {
        printBoard(gameBoard);

        console.log("Player ", players, " wins!");
        console.log("Play again? (y/n)");

        prompt.get(["answer"], function (err, result) {
          if (err) {
            return onErr(err);
          }

          if (result.answer.toLowerCase() === "y") {
            startGame();
          } else {
            console.log("Thanks for playing!");
          }
        });
      } else {
        players = players === "X" ? "O" : "X";
        takeTurn(gameBoard, players);
      }
    }
  });
};

// =============================================================================
//
// =============================================================================
const startGame = function () {
  let players = playerNames();
  console.log(" 105 players:", players); //down prefix
  console.log("players:", players); // wrap prefix console log

  let gameBoard = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];

  takeTurn(gameBoard, players);
};

//TEST FUNCTIONS
startGame();
// printBoard();
kjvhjkv 