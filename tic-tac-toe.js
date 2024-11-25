/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    board[position] = mark;
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
    console.log(` ${board[1] !== ' ' ? board[1] : 1} | ${board[2] !== ' ' ? board[2] : 2} | ${board[3] !== ' ' ? board[3] : 3} `);
    console.log('---|---|---');
    console.log(` ${board[4] !== ' ' ? board[4] : 4} | ${board[5] !== ' ' ? board[5] : 5} | ${board[6] !== ' ' ? board[6] : 6} `);
    console.log('---|---|---');
    console.log(` ${board[7] !== ' ' ? board[7] : 7} | ${board[8] !== ' ' ? board[8] : 8} | ${board[9] !== ' ' ? board[9] : 9} `);
}

// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
    return !isNaN(position) && position >= 1 && position <= 9 && board[position] === ' ';
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
    [1, 5, 9], [3, 5, 7] // diagonals
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    return winCombinations.some(combination => {
    return combination.every(position => board[position] === player);
  });
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    return Object.values(board).every(cell => cell !== ' ');
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************

// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let position;
  do {
    position = parseInt(prompt(`${player}'s turn. Enter a position (1-9): `));
    if (isNaN(position) || position < 1 || position > 9) {
      console.log("Invalid input. Please enter a number between 1 and 9.");
    } else if (board[position] !== ' ') {
      console.log("Position already taken. Please choose another position.");
    }
  } while (!validateMove(position));
  markBoard(position, player); // Fix: Use player instead of mark
  printBoard();
}

  function resetBoard() {
    for (let i = 1; i <= 9; i++) {
      board[i] = ' ';
    }
  }
  
  function game() {
    resetBoard(); // Reset the board at the start of each game
    let currentPlayer = 'X';
    let winner = null;
  
    while (!winner && !checkFull()) {
      playTurn(currentPlayer);
      if (checkWin(currentPlayer)) {
        winner = currentPlayer;
      }
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  
    if (winner) {
      console.log(`${winner} wins!`);
    } else {
      console.log("It's a tie!");
    }
  
    let playAgain;
  do {
    playAgain = prompt("Do you want to play again? (yes/no): ").toLowerCase();
    if (playAgain !== 'yes' && playAgain !== 'no') {
      console.log("Please answer with 'yes' or 'no' only.");
    }
  } while (playAgain !== 'yes' && playAgain !== 'no');

  if (playAgain === 'yes') {
    game(); // Restart the game if the user says 'yes'
  } else {
    console.log("Thanks for playing!");
  }
}
  
  // entry point of the whole program
  console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');
  
  game(); // Start the game