const number = document.querySelectorAll('.number');
const operator = document.querySelectorAll('.operator');
const display = document.querySelector('#display');
let num1 = [];
let num2 = [];
let result = '';
let calc = '';

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

