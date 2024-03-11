const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};
const SYMBOLS_VALUE = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const getDepositAmount = () => {
  const depositAmount = prompt("Enter your deposit amount: ");
  const numDepositAmount = parseInt(depositAmount);
  if (isNaN(numDepositAmount) || numDepositAmount <= 0) {
    console.log("Invalid deposit amount! enter again");
    getDepositAmount();
  } else {
    console.log("Amount deposited: $" + numDepositAmount);
    return numDepositAmount;
  }
};

const getNumberOfLines = () => {
  const lines = prompt("Enter number of lines you want to bet on(1-3): ");
  const numberOfLines = parseInt(lines);
  if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
    console.log("Invalid input! try again");
    getNumberOfLines();
  } else {
    console.log(numberOfLines + " lines selected");
    return numberOfLines;
  }
};

const getBet = (balance, lines) => {
  const bet = prompt("Enter your bet: ");
  const numberBet = parseInt(bet);
  if (isNaN(numberBet) || numberBet <= 0 || numberBet >= balance) {
    console.log("Invalid input! try again");
    getBet();
  } else {
    console.log("$" + numberBet + " is your bet per line. Total is: $" + numberBet * lines);
    return numberBet;
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const rows = [[], [], []];
  for (let i = 0; i < ROWS; i++) {
    const reelSymbols = [...symbols];
    for (let j = 0; j < COLS; j++) {
      let randomIndex = Math.floor(Math.random() * reelSymbols.length);
      rows[i].push(symbols[randomIndex]);
      reelSymbols.splice[(randomIndex, 1)];
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (let row of rows) {
    let rowString = "";
    for (let i = 0; i < row.length; i++) {
      rowString += row[i];
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let symbolsSame = true;
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        symbolsSame = false;
        break;
      }
    }
    if (symbolsSame) {
      winnings += bet * SYMBOLS_VALUE[symbols[0]];
    }
  }
  return winnings;
};

const game = () => {
  let balance = getDepositAmount();
  while (true) {
    console.log("Your balance is: $" + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const rows = spin();
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    console.log("You won $" + winnings.toString());
    balance += parseInt(winnings);
    if (balance <= 0) {
      console.log("Insufficient Balance!");
      break;
    }
    const playAgain = prompt("Do you want to play again (y,n)? ");
    if (playAgain != "y") {
      break;
    }
  }
};

game();
