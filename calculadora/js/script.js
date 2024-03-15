document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.input-div p');
    let currentInput = '';
    let previousInput = '';
    let operation = null;

    function updateDisplay() {
        display.textContent = currentInput || '0';
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        operation = null;
        updateDisplay();
    }

    function input(value) {
        if (currentInput.length >= 10) {
            // Prevent the number from getting too long for the display
            return;
        }
        currentInput += value;
        updateDisplay();
    }

    function performOperation(nextOperation) {
        const current = parseFloat(currentInput);
        const previous = parseFloat(previousInput);
        if (isNaN(previous) || isNaN(current)) {
            return;
        }
        switch (operation) {
            case '+':
                currentInput = (previous + current).toString();
                break;
            case '-':
                currentInput = (previous - current).toString();
                break;
            case '*':
                currentInput = (previous * current).toString();
                break;
            case '/':
                if (current === 0) {
                    alert('Cannot divide by zero.');
                    return;
                }
                currentInput = (previous / current).toString();
                break;
        }
        previousInput = '';
        operation = nextOperation;
        updateDisplay();
    }

    document.querySelectorAll('.buttons-div button').forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('cinza')) {
                if (button.textContent === 'AC') {
                    clear();
                } else if (button.textContent === '+/-') {
                    currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
                    updateDisplay();
                } else if (button.textContent === '%') {
                    currentInput = (parseFloat(currentInput) / 100).toString();
                    updateDisplay();
                }
            } else if (button.classList.contains('amarelo')) {
                if (operation) {
                    performOperation(button.textContent === '=' ? null : button.textContent);
                } else {
                    previousInput = currentInput;
                    operation = button.textContent;
                    currentInput = '';
                }
                if (button.textContent === '=') {
                    operation = null;
                }
            } else {
                input(button.textContent);
            }
        });
    });

    clear(); // Initialize display
});