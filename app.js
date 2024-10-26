const keys = document.querySelectorAll(".key");
const display = document.querySelector("#display-text");

const operations = {
  total: 0,
  add(a, b) {
    this.total = parseFloat(a) + parseFloat(b);
  },

  substract(a, b) {
    this.total = parseFloat(a) - parseFloat(b);
  },

  multiply(a, b) {
    this.total = parseFloat(a) * parseFloat(b);
  },

  divide(a, b) {
    if (a == "0" || b == "0") {
      operations.total = "Fuck you";
      return;
    }
    this.total = parseFloat(a) / parseFloat(b);
  },

  percent(a) {
    this.total = parseFloat(a) / 100;
  },
};

let a = "";
let b = "";
let currentOp = "";
let hideResult = false;

function updateScreen(text) {
  display.textContent = text;
}

function handleNumbers(num) {
  if (currentOp === "") {
    a += num.toString();
    updateScreen(a);
  } else {
    b += num.toString();
    updateScreen(b);
  }
}

function handleOperations(op) {
  switch (op) {
    case "x":
      if (a != "") {
        currentOp = "multiply";
      }
      break;
    case "÷":
      if (a != "") {
        currentOp = "divide";
      }
      break;
    case "-":
      if (a != "") {
        currentOp = "substract";
      }
      break;
    case "=":
      if (currentOp != "" && b != "") {
        operations[currentOp](a, b);
        if (operations.total === "Fuck you") {
          reset();
          updateScreen("Fuck you.");
          break;
        }
        updateScreen(operations.total);
        a = operations.total;
        b = "";
        currentOp = "";
        hideResult = true;
      }
      break;
    case "CE":
      reset();
      break;
    case "DEL":
      del();
      break;
    case "%":
      operations.percent(a);
      updateScreen(operations.total);
      break;
    case "+/-":
      if (a != "") {
        operations.total = parseFloat(a) * -1;
        updateScreen(operations.total);
        a = operations.total;
      }
      break;
    default:
      console.log("Unexpected operation!");
  }
}

document.addEventListener("keydown", (e) => {
  e.preventDefault(); // TODO: find better way, rn it block every kb shortcut
  switch (e.key) {
    case "Enter":
      handleOperations("=");
      break;
    case "Backspace":
      handleOperations("DEL");
      break;
    case "Escape":
    case "Delete":
      handleOperations("CE");
      break;
    case "%":
      handleOperations("%");
      break;
    case "+":
      handleOperations("+");
      break;
    case "-":
      handleOperations("-");
      break;
    case "*":
      handleOperations("x");
      break;
    case "/":
      handleOperations("÷");
      break;
    case ".":
      handleNumbers(".");
      break;
    default:
      if (e.key >= "0" && e.key <= "9") {
        handleNumbers(e.key);
      }
      break;
  }
});

function reset() {
  a = "";
  b = "";
  operations.total = 0;
  updateScreen(operations.total);
}

function del() {
  // im scared of using delete()...
  if (b == "") {
    a = a.slice(0, -1);
    updateScreen(a);
    return;
  }
  b = b.slice(0, -1);
  updateScreen(b);
}

keys.forEach((key) => {
  key.addEventListener("click", (e) => {
    if (hideResult) {
      updateScreen("");
    }
    if (e.target.classList.contains("number-key")) {
      handleNumbers(e.target.textContent);
    } else {
      handleOperations(e.target.textContent);
    }
  });
});
