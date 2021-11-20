const buttonsContainer = document.querySelector('.buttonsContainer');
const leftSide = document.querySelector('.leftSide');
const rightSide = document.querySelector('.rightSide');
const screen = document.querySelector('.screen');

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, x, y) {
  switch (operator) {
    case '+':
      return add(x, y);
    case '-':
      return subtract(x, y);
    case '*':
      return multiply(x, y);
    case '/':
      if (y === 0) {
        return "we don't do that here";
      } else {
        return divide(x, y);
      }
    default:
      return 'invalid';
  }
}

function roundAnswers(num) {
  return +(Math.round(num + "e+5") + "e-5");
}

function createRow() {
  for (let i = 0; i < 4; i++) {
    const rowLeft = document.createElement('div');
    const rowRight = document.createElement('div');
    rowLeft.classList.add('row');
    rowLeft.classList.add('rowLeft');
    rowRight.classList.add('row');
    leftSide.appendChild(rowLeft);
    rightSide.appendChild(rowRight);
  }
}

createRow();
const rows = document.querySelectorAll('.row');

function pushBlocks() {
  rows.forEach((row) => {
    for (let i = 0; i < 3; i++) {
      const block = document.createElement('button');
      block.classList.add('block');
      row.appendChild(block);
    }
  });
}

pushBlocks();
const blocks = document.querySelectorAll('.block');

function pushNumbers() {
  let j = 9;
  for (let i = 0; i < 9; i++) {
    blocks[i].textContent = j;
    j--;
  }

  blocks[10].textContent = 0;
  blocks[9].textContent = '.';
  blocks[11].textContent = '%';
}

pushNumbers();

function pushOperators() {
  blocks[12].textContent = '+';
  blocks[15].textContent = '-';
  blocks[18].textContent = '*';
  blocks[21].textContent = '/';
  blocks[23].textContent = '=';
  blocks[13].textContent = '<';
  blocks[14].textContent = 'C';
  blocks[16].textContent = '(';
  blocks[17].textContent = ')';
  blocks[19].textContent = 'x²';
  blocks[20].textContent = '√';
}

pushOperators();

blocks[22].remove();
blocks[23].style.cssText = 'flex: 2.4; background-color: #f7e61b; color: black; font-size: 60px;';

blocks[14].style.backgroundColor = '#4e2f42';
blocks[13].style.backgroundColor = '#4e2f42';
blocks[9].style.backgroundColor = '#525758';
blocks[11].style.backgroundColor = '#525758';
blocks[16].style.backgroundColor = '#3a3a3a';
blocks[17].style.backgroundColor = '#3a3a3a';
blocks[19].style.backgroundColor = '#3a3a3a';
blocks[20].style.backgroundColor = '#3a3a3a';

const numbers = [blocks[0], blocks[1], blocks[2], blocks[3], blocks[4], blocks[5]
  , blocks[6]
  , blocks[7]
  , blocks[8]
  , blocks[10]
];

const operators = [blocks[12], blocks[14], blocks[15], blocks[18], blocks[21], blocks[23]];

let op = '';
let firstNumber = '';
let secondNumber = '';
let displayValue = '';
let secondOp = '';
let calcResult = '';
let isFirstNumberStored = false;

let numberEventHandler = function (e) {
  operators.forEach((operator) => {
    if (operator.classList.contains('operatorClicked')) {
      operator.classList.remove('operatorClicked');
    }
  });

  if (op === '') {
    displayValue += this.textContent;
    firstNumber = displayValue;
    screen.textContent = displayValue;
  } else {
    if (isFirstNumberStored) {
      displayValue = this.textContent;
      screen.textContent = displayValue;
      isFirstNumberStored = false;
    } else {
      displayValue += this.textContent;
      secondNumber = displayValue;
      screen.textContent = displayValue;
    }
  }
}

let operatorEventHandler = function (e) {
  if (this.textContent === 'C') {
    op = '';
    secondOp = '';
    firstNumber = '';
    secondNumber = '';
    calcResult = '';
    displayValue = '';
    screen.textContent = displayValue;
    isFirstNumberStored = false;
    operators.forEach((operator) => {
      if (operator.classList.contains('operatorClicked')) {
        operator.classList.remove('operatorClicked');
      }
    });
  } else {
    if ((this.textContent !== '=') && (op !== '' && secondOp === '')) {
      this.classList.add('operatorClicked');
      secondOp = this.textContent;
      secondNumber = displayValue;
      calcResult = operate(op, +firstNumber, +secondNumber);
      displayValue = roundAnswers(calcResult);
      screen.textContent = displayValue;
      firstNumber = displayValue;
      isFirstNumberStored = true;
      calcResult = '';
    } else if ((this.textContent !== '=') && (op !== '' && secondOp !== '')) {
      this.classList.add('operatorClicked');
      secondNumber = displayValue;
      calcResult = operate(secondOp, +firstNumber, +secondNumber);
      secondOp = this.textContent;
      displayValue = roundAnswers(calcResult);
      screen.textContent = displayValue;
      firstNumber = displayValue;
      isFirstNumberStored = true;
      calcResult = '';
    } else if (this.textContent !== '=') {
      op = this.textContent;
      firstNumber = displayValue;
      isFirstNumberStored = true;
      this.classList.add('operatorClicked');
    } else {
      if (op === '') {
        screen.textContent = displayValue;
      } else if (secondOp !== '') {
        secondNumber = displayValue;
        calcResult = operate(secondOp, +firstNumber, +secondNumber);
        if (calcResult === "we don't do that here") {
          displayValue = "we don't do that here";
          screen.textContent = displayValue;
        } else {
          displayValue = roundAnswers(calcResult);
          screen.textContent = displayValue;
          firstNumber = displayValue;
          secondNumber = '';
          op = '';
          secondOp = '';
          calcResult = '';
        }
      } else {
        secondNumber = displayValue;
        calcResult = operate(op, +firstNumber, +secondNumber);
        if (calcResult === "we don't do that here") {
          displayValue = "we don't do that here";
          screen.textContent = "we don't do that here";
        } else {
          displayValue = roundAnswers(calcResult);
          screen.textContent = displayValue;
          firstNumber = displayValue;
          secondNumber = '';
          op = '';
          secondOp = '';
          calcResult = '';
        }
      }
    }
  }
}

numbers.forEach((number) => {
  number.classList.add('operand');
  number.addEventListener('click', numberEventHandler, false);
});

operators.forEach((operator) => {
  operator.classList.add('operator');
  operator.addEventListener('click', operatorEventHandler, false);
});