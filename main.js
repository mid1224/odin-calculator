let num1, num2, operator = 0;

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                alert("Cannot divide by zero");
                return null;
            }
            return num1 / num2;
        default:
            return null;
    }
}