const buttonsContainer = document.querySelector('.buttonsContainer');
const leftSide = document.querySelector('.leftSide');
const rightSide = document.querySelector('.rightSide');

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