const OPERATORS = {
  ADD: "+",
  SUBTRACT: "-",
  MULTIPLY: "*",
  DIVIDE: "/",
};
const SYMBOLS = Object.values(OPERATORS);

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

function operate(input) {
  if (!hasOperator(input)) {
    showWarning("Select an operator!");
    return;
  }
}

function appendToDisplay(text) {
  let inputField = document.getElementById("inputField");
  let currentInput = inputField.value;

  if (hasOperator(currentInput)) {
    showWarning("Press enter before selecting another operator!");
    return;
  }

  inputField.value = currentInput + text;
}

function showWarning(string) {}

function hasOperator(string) {
  return SYMBOLS.some((s) => string.includes(s));
}
