const OPERATORS = {
  "+": { func: add },
  "-": { func: subtract },
  "*": { func: multiply },
  "/": { func: divide },
};
const SYMBOLS = Object.keys(OPERATORS);

//--Parts of Statement--//
let numA = 0;
let numB = 0;
let operator = null;

//--HTML Elements--//
let inputField = document.getElementById("inputField");

//--Operations--//
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b == 0) {
    showWarning("Can't divide by zero!");
    return;
  }
  return a / b;
}

function operate() {
  if (operator == null) {
    showWarning("Select an operator before submitting!");
    return;
  }

  let result = OPERATORS[operator].func(numA, numB);
  inputField.textContent = result;
  numA = result;
  numB = 0;
  operator = null;
}

function appendToDisplay(text) {
  let currentInput = inputField.textContent;

  if (hasOperator(currentInput)) {
    showWarning("Press enter before selecting another operator!");
    return;
  }

  inputField.textContent = currentInput + text;
}

function showWarning(string) {
  console.log(string);
}

function hasOperator(string) {
  return SYMBOLS.some((s) => string.includes(s));
}

function isNumberChar(string) {
  return string >= "0" && string <= "9";
}

//--Event Listeners--//
document.addEventListener("keypress", function (event) {
  if (isNumberChar(event.key)) {
    if (operator == null) {
      numB = event.key;
      inputField.textContent = numB;
    } else {
      numA = event.key;
      inputField.textContent = numA;
    }
  }
  if (hasOperator(event.key)) {
    operator = event.key;
    inputField.textContent = operator;
  }
});
