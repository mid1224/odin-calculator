let num1, num2, operator = undefined;
let displayingResult = false;

const digitButtons = document.querySelectorAll('.digit:not(#negative):not(#decimal)');
const operatorButtons = document.querySelectorAll('.operator:not(#equal):not(#clear):not(#backspace)');
const negativeButton = document.querySelector('#negative');
const decimalButton = document.querySelector('#decimal');
const equalButton = document.querySelector('#equal');
const backspaceButton = document.querySelector('#backspace');
const clearButton = document.querySelector('#clear');
const display = document.querySelector('#display');

display.textContent = "";

digitButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (displayingResult) {
            display.textContent = "";
            displayingResult = false;
        }

        display.textContent += button.textContent;
    });
});

negativeButton.addEventListener('click', function() {
    if (display.textContent === "" || displayingResult === true) {
        display.textContent = "-";
        displayingResult = false;
    }
});

decimalButton.addEventListener('click', function() {
    if (display.textContent === "" || displayingResult === true) {
        display.textContent = "0.";
        displayingResult = false;
    } else if (display.textContent === "-") {
        display.textContent = "-0.";
    } else if (!display.textContent.includes('.')) {
        display.textContent += ".";
    }
});

operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (display.textContent !== '') {
            if (num1 === undefined) {
                // If num1 is not set, set it to the current display value
                num1 = parseFloat(display.textContent);
            } else if (operator !== undefined) {
                // If num1 and operator are already set, calculate the result
                num2 = parseFloat(display.textContent);
                let result = operate(num1, num2, operator);
                display.textContent = result; // Display the result
                num1 = result; // Use the result as the new num1
            }
            operator = button.textContent; // Set the new operator
            display.textContent = ''; // Clear the display for the next input
        }
    });
});

equalButton.addEventListener('click', function(event) {
    if (displayingResult === false) {
        if (display.textContent === "") {
            num2 = 0;
        } else {
            num2 = parseFloat(display.textContent);
        }

        let result = operate(num1, num2, operator);
        if (result === null || result === undefined || isNaN(result)) {
            display.textContent = "Error";
        } else {
            display.textContent = result;
        }

        num1 = undefined;
        num2 = undefined;
        operator = "+";

        displayingResult = true;
    }
});

backspaceButton.addEventListener('click', function(event) {
    if (display.textContent.length !== "" && displayingResult === false) {
        display.textContent = display.textContent.slice(0, -1);
    }
});

clearButton.addEventListener('click', function(event) {
    display.textContent = "";
    num1 = undefined;
    num2 = undefined;
    operator = "";
    displayingResult = false;
});

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return Math.round((num1 + num2) * 100) / 100;;
        case '-':
            return Math.round((num1 - num2) * 100) / 100;;
        case '*':
            return Math.round((num1 * num2) * 100) / 100;;
        case '/':
            if (num2 === 0) {
                return null;
            }
            return Math.round((num1 / num2) * 100) / 100;
        default:
            return null;
    }
}