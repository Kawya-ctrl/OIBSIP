let lastResult = '';

function appendToDisplay(value) {

    const display = document.getElementById('display');

    if (value === '√') {
        display.value += 'Math.sqrt(';
    } 
    else {
        display.value += value;
    }
}

function clearDisplay() {
    document.getElementById('display').value = '';
    lastResult = '';
}

function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculateResult() {

    const display = document.getElementById('display');
    try {
        const expression = display.value
            .replace(/√/g, 'Math.sqrt') 
            .replace(/%/g, '/100');
        lastResult = eval(expression);
        display.value = lastResult || '';
    } 
    catch (e) {
        display.value = 'Error';
    }
}

function showAnswer() {

    const display = document.getElementById('display');
    if (lastResult) {
        display.value += lastResult;
    }
}
