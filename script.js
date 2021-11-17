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

function createRow() {
  for (let i = 0; i < 4; i++) {
    const rowLeft = document.createElement('div');
    const rowRight = document.createElement('div');
    rowLeft.classList.add('row');
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

console.log(blocks);
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
  blocks[20].textContent = '√';
}

pushOperators();

const numbers = [blocks[0], blocks[1], blocks[2], blocks[3], blocks[4], blocks[5]
  , blocks[6]
  , blocks[7]
  , blocks[8]
  , blocks[10]
];

const operators = [blocks[12], blocks[15], blocks[18], blocks[21], blocks[23]];

const dot = blocks[9].textContent;
const clear = blocks[14].textContent;

let op = '';
let firstNumber = '';
let secondNumber = '';
let displayValue = '';
let secondOp = '';
let calcResult = '';

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
    if (displayValue === firstNumber) {
      displayValue = this.textContent;
      screen.textContent = displayValue;
    } else {
      displayValue += this.textContent;
      secondNumber = displayValue;
      screen.textContent = displayValue;
    }
  }
}

let operatorEventHandler = function (e) {
  if ((this.textContent !== '=') && (op !== '' && secondOp === '')) {
    this.classList.add('operatorClicked');
    secondOp = this.textContent;
    secondNumber = displayValue;
    calcResult = operate(op, +firstNumber, +secondNumber);
    displayValue = calcResult;
    screen.textContent = displayValue;
    firstNumber = displayValue;
    calcResult = '';
  } else if ((this.textContent !== '=') && (op !== '' && secondOp !== '')) {
    this.classList.add('operatorClicked');
    secondNumber = displayValue;
    calcResult = operate(secondOp, +firstNumber, +secondNumber);
    secondOp = this.textContent;
    displayValue = calcResult;
    screen.textContent = displayValue;
    firstNumber = displayValue;
    calcResult = '';
  } else if (this.textContent !== '=') {
    op = this.textContent;
    this.classList.add('operatorClicked');
  } else {
    displayValue = operate(op, +firstNumber, +secondNumber);
    screen.textContent = displayValue;
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