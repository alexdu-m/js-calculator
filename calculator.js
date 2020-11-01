/*
    Calculator
*/

console.log("This is a calculator!");

var isResultDisplayed = false;

const clearLastDigit = () => {
    const inputEquation = document.getElementById('inputEquation');
    const inputEquationValue = inputEquation.value;
    if (inputEquationValue) inputEquation.value = inputEquationValue.substring(0, inputEquationValue.length - 1);

    isResultDisplayed = false;
}

const clearWholeEquation = () => {
    document.getElementById('inputEquation').value = '';

    isResultDisplayed = false;
}

const handleDigit = number => {
    number = parseInt(number);
    if (!isDigit(number)) return;

    const inputEquation = document.getElementById('inputEquation');
    // When the result is shown, entering a digit will overwrite it
    inputEquation.value = isResultDisplayed ? `${number}` : `${inputEquation.value}${number}`;

    isResultDisplayed = false;
}

const handleOperator = operator => {
    operator = String(operator);
    const inputEquation = document.getElementById('inputEquation');
    const inputEquationValue = inputEquation.value;

    switch(operator) {
        case '+': case '-': case '*': case '/': case '=':
            if (inputEquationValue && isDigit(inputEquationValue.charAt(inputEquationValue.length - 1))) {
                if (operator === '=') {
                    inputEquation.value = calculateEquation(inputEquationValue) || '';
                    isResultDisplayed = true;
                } else {
                    inputEquation.value = `${inputEquationValue}${operator}`;
                    isResultDisplayed = false;
                }
            }
            break;
        case '.':
            if (!inputEquationValue || isDigit(inputEquationValue.charAt(inputEquationValue.length - 1))) {
                // If the equation is empty, we add 0 before adding the dot
                // When the result is shown, entering a dot will overwrite it
                inputEquation.value = isResultDisplayed ? '0.' : `${inputEquationValue || 0}.`;
                isResultDisplayed = false;
            }
            break;
    }

    
}

const calculateEquation = equation => {
    equation = String(equation);
    // TODO: Find a better way than eval() to calculate the equation
    return eval(equation);
}

const isDigit = character => {
    character = parseInt(character);
    return character >= 0 && character <= 9;
}

window.onload = () => {
    document.getElementById('buttonClearLastDigit')    .onclick = clearLastDigit;
    document.getElementById('buttonClearWholeEquation').onclick = clearWholeEquation;

    document.getElementById('buttonDigit0').onclick = () => handleDigit(0);
    document.getElementById('buttonDigit1').onclick = () => handleDigit(1);
    document.getElementById('buttonDigit2').onclick = () => handleDigit(2);
    document.getElementById('buttonDigit3').onclick = () => handleDigit(3);
    document.getElementById('buttonDigit4').onclick = () => handleDigit(4);
    document.getElementById('buttonDigit5').onclick = () => handleDigit(5);
    document.getElementById('buttonDigit6').onclick = () => handleDigit(6);
    document.getElementById('buttonDigit7').onclick = () => handleDigit(7);
    document.getElementById('buttonDigit8').onclick = () => handleDigit(8);
    document.getElementById('buttonDigit9').onclick = () => handleDigit(9);

    document.getElementById('buttonOperatorPlus')    .onclick = () => handleOperator('+');
    document.getElementById('buttonOperatorMinus')   .onclick = () => handleOperator('-');
    document.getElementById('buttonOperatorMultiply').onclick = () => handleOperator('*');
    document.getElementById('buttonOperatorDivide')  .onclick = () => handleOperator('/');
    document.getElementById('buttonOperatorEqual')   .onclick = () => handleOperator('=');
    document.getElementById('buttonOperatorDot')     .onclick = () => handleOperator('.');

    document.addEventListener('keydown', event => {
        if (event.isComposing || event.keycode === 229) {
            return;
        }

        const eventKey = event.key;

        if (isDigit(eventKey)) {
            handleDigit(parseInt(eventKey));
        } else {
            switch(eventKey) {
                case '+': case '-': case '*': case '/': case '=': case '.':
                    handleOperator(eventKey);
                    break;
                case 'Enter':
                    handleOperator('=');
                    break;
                case 'Backspace':
                    clearLastDigit();
                    break;
                case 'Escape':
                    clearWholeEquation();
                    break;
            }
        }
    });
}