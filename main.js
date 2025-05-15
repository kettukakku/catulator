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
const inputField = document.getElementById("inputField");
const numContainer = document.getElementById("numbersContainer");
const opContainer = document.getElementById("operatorsContainer");
const bContainer = document.getElementById("buttonsContainer");
const errorPopup = document.getElementById("errorPopup");
const errorMessage = document.getElementById("errorMessage");

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
    return 0;
  }
  return a / b;
}

function operate() {
  if (operator == null) {
    showWarning("Select an operator before submitting!");
    return;
  }

  let a = typeof numA === "string" ? parseFloat(numA) : numA;
  let b = typeof numB === "string" ? parseFloat(numB) : numB;

  let result = OPERATORS[operator].func(a, b);
  console.log(numA + operator + numB + "=" + result);

  numA = result;
  numB = 0;
  operator = null;
  inputField.textContent = numA;
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
  errorMessage.textContent = string;
  errorPopup.classList.remove("hidden");

  setTimeout(() => {
    errorPopup.classList.add("hidden");
  }, 2000);

  console.error(string);
}

function hasOperator(string) {
  return SYMBOLS.some((s) => string.includes(s));
}

function isNumberChar(string) {
  return string >= "0" && string <= "9";
}

//--Buttons--//
function spawnButtons() {
  let clrBtn = createButton("Clear");
  clrBtn.classList.add("larger-button");
  clrBtn.id = "clear";
  bContainer.appendChild(clrBtn);

  let delBtn = createButton("Delete");
  delBtn.id = "delete";
  bContainer.appendChild(delBtn);

  let decBtn = createButton(".");
  bContainer.appendChild(decBtn);

  for (let i = 0; i < 10; i++) {
    let nBtn = createButton(i);
    nBtn.classList.add("number");
    bContainer.appendChild(nBtn);
  }

  let keys = Object.keys(OPERATORS);
  for (let i = 0; i < keys.length; i++) {
    let oBtn = createButton(keys[i]);
    oBtn.classList.add("operator");
    bContainer.appendChild(oBtn);
  }

  let etrBtn = createButton("Enter");
  etrBtn.classList.add("larger-button");
  etrBtn.id = "enter";
  bContainer.appendChild(etrBtn);
}

function createButton(string) {
  let tempBtn = document.createElement("button");
  tempBtn.textContent = string;
  tempBtn.onclick = function () {
    handleButtonClick(string);
    tempBtn.blur();
  };
  return tempBtn;
}

function handleButtonClick(string) {
  switch (true) {
    case string == "Clear":
    case string == "Escape":
      clearInputField();
      break;
    case string == "Backspace":
    case string == "Delete":
      deleteChar();
      break;
    case string == "Enter":
      operate();
      break;
    case string == ".":
      setDecimal();
      break;
    case isNumberChar(string):
      appendCharToNumber(string);
      break;
    case hasOperator(string):
      setOperator(string);
      break;
    default:
      break;
  }
}

function appendCharToNumber(string) {
  if (operator != null) {
    numB = Number(String(numB) + string);
    inputField.textContent = numB;
    console.log(numA + operator + numB);
  } else {
    numA = Number(String(numA) + string);
    inputField.textContent = numA;
    console.log(numA);
  }
}

function setOperator(string) {
  operator = string;
  inputField.textContent = operator;
  console.log(numA + operator);
}

function setDecimal() {
  if (operator != null) {
    if (!String(numB).includes(".")) {
      numB = String(numB) + ".";
      inputField.textContent = numB;
      console.log(numA + operator + numB);
    }
  } else {
    if (!String(numA).includes(".")) {
      numA = String(numA) + ".";
      inputField.textContent = numA;
      console.log(numA);
    }
  }
}

function deleteChar() {
  if (operator != null) {
    numB = String(numB).slice(0, -1);
    inputField.textContent = numB;
    console.log(numA + operator + numB);
  } else {
    numA = String(numA).slice(0, -1);
    inputField.textContent = numA;
    console.log(numA);
  }
}

//--Input Field--//
function clearInputField() {
  numA = 0;
  numB = 0;
  operator = null;
  inputField.textContent = numA;
  console.log("Input cleared!");
}

//--Event Listeners--//
document.addEventListener("DOMContentLoaded", function () {
  spawnButtons();
  clearInputField();
});

document.addEventListener("keydown", function (event) {
  handleButtonClick(event.key);
});
