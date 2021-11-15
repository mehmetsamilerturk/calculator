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
      return divide(x, y);
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

const operators = [blocks[12], blocks[15], blocks[18], blocks[21]];

let num = 0;
let op = '';
let firstNumber = 0;
let secondNumber = 0;

let numberEventHandler = function (e) {
  if (screen.textContent == '+' || screen.textContent == '-' || screen.textContent == '*' || screen.textContent == '/') {
    screen.textContent = '';
  }

  screen.textContent += this.textContent;
  num = +screen.textContent;
}

let operatorEventHandler = function (e) {
  firstNumber = num;
  screen.textContent = this.textContent;
  op = screen.textContent;
}

let equalsEventHandler = function (e) {
  secondNumber = num;
  screen.textContent = operate(op, firstNumber, secondNumber);
}

numbers.forEach((number) => {
  number.addEventListener('click', numberEventHandler, false);
});

operators.forEach((operator) => {
  operator.addEventListener('click', operatorEventHandler, false);
});

blocks[23].addEventListener('click', equalsEventHandler);