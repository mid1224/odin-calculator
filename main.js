let num1, num2, operator = 0;
let displayingResult = false;

const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator:not(#equal):not(#clear)');
const equalButton = document.querySelector('#equal');
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

operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (display.textContent !== '') {
            num1 = parseFloat(display.textContent);
            operator = button.textContent;
            display.textContent = '';
        }
    });
});

equalButton.addEventListener('click', function(event) {
    num2 = parseFloat(display.textContent);
    let result = operate(num1, num2, operator);
    if (result === null) {
        display.textContent = "Error";
    } else {
        display.textContent = result;
    }

    displayingResult = true;
});

clearButton.addEventListener('click', function(event) {
    display.textContent = "";
    num1 = 0;
    num2 = 0;
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