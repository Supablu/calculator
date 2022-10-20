class Calculator {
    constructor(historyElement, currentElement) {
        this.historyElement = historyElement;
        this.currentElement = currentElement;
        this.clear();
    }
    //clear display for both current and history/previous elements
    clear() {
        this.currentNum = '';
        this.historyNum = '';
        this.operation = undefined;
    }
    //deletes last recored input from click event
    delete() {
        this.currentNum = this.currentNum.toString().slice(0, -1);
    }
    //stores recorded number
    grabNum(number) {
        if (number === '.' && this.currentNum.includes('.')) return;
        this.currentNum = this.currentNum.toString() + number.toString();
    }
    //records operation collected
    operator(operation) {
        if (this.currentNum === '') return;
        if (this.historyNum !== '') {
            this.compute();
        }
        this.operation = operation;
        this.historyNum = this.currentNum;
        this.currentNum = '';
    }
    //based on operator clicked, computation is preformed between 
    //current+previous/history numbers
    compute() {
        let computation;
        const previous = parseFloat(this.historyNum);
        const current = parseFloat(this.currentNum);
        if (isNaN(previous) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = previous + current;
                break;
            case '-':
                computation = previous - current;
                break;
            case '×':
                computation = previous * current;
                break;
            case '÷':
                computation = previous / current;
                break;
            default:
                return;
        }
        this.currentNum = computation;
        this.operation = undefined;
        this.historyNum = '';
    }
    //grabs numbers, allows placement of . as first selection, adds ',' 
    //after every 3 digits: example - 3,000,000
    getdisplayNum(number) {
        const stringNum = number.toString()
        const intergerDigits = parseFloat(stringNum.split('.')[0]);
        const decimalDigits = stringNum.split('.')[1];
        let intergerDisplay;
        if (isNaN(intergerDigits)) {
            intergerDisplay = '';
        } else {
            intergerDisplay = intergerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`;
        } else {
            return intergerDisplay;
        }
    }
    //grabs display value to show in current and previous/history
    displayUpdate() {
        this.currentElement.innerText = this.getdisplayNum(this.currentNum);
        if (this.operation != null) {
            this.historyElement.innerText = `${this.getdisplayNum(this.historyNum)} ${this.operation}`;
        } else {
            this.historyElement.innerText = '';
        }
    }
}
//html elements to reference
const numberBtns = document.querySelectorAll('[data-value]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-clear]');
const historyElement = document.querySelector('[data-history]');
const currentElement = document.querySelector('[data-current]');
//for Js class
const calculator = new Calculator(historyElement, currentElement);
//when any data-value is clicked, records numeric value in html
numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.grabNum(button.innerText);
        calculator.displayUpdate();
    })
})
//when any data-operation is clicked, records operator
operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operator(button.innerText);
        calculator.displayUpdate();
    })
})
//when equal button is clicked, runs computation and updates displays
equalsBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.displayUpdate();
})
//when AC button is clicked, runs clear function and displayUpdate function
clearBtn.addEventListener('click', button => {
    calculator.clear();
    calculator.displayUpdate();
})
//when Del is clicked, runs delete function, and displayUpdate function
deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.displayUpdate();
})

