class Calculator {
    constructor(historyElement, currentElement) {
        this.historyElement = historyElement;
        this.currentElement = currentElement;
        this.clear();
    }

    clear() {
        this.currentNum = '';
        this.historyNum = '';
        this.operation = undefined;
    }

    delete() {
        this.currentNum = this.currentNum.toString().slice(0, -1);
    }

    grabNum(number) {
        if (number === '.' && this.currentNum.includes('.')) return;
        this.currentNum = this.currentNum.toString() + number.toString();
    }

    operator(operation) {
        if (this.currentNum === '') return;
        if (this.historyNum !== '') {
            this.compute();
        }
        this.operation = operation;
        this.historyNum = this.currentNum;
        this.currentNum = '';
    }

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

    displayUpdate() {
        this.currentElement.innerText = this.getdisplayNum(this.currentNum);
        if (this.operation != null) {
            this.historyElement.innerText = `${this.getdisplayNum(this.historyNum)} ${this.operation}`;
        } else {
            this.historyElement.innerText = '';
        }
    }
}

const numberBtns = document.querySelectorAll('[data-value]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-clear]');
const historyElement = document.querySelector('[data-history]');
const currentElement = document.querySelector('[data-current]');

const calculator = new Calculator(historyElement, currentElement);

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.grabNum(button.innerText);
        calculator.displayUpdate();
    })
})

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operator(button.innerText);
        calculator.displayUpdate();
    })
})

equalsBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.displayUpdate();
})

clearBtn.addEventListener('click', button => {
    calculator.clear();
    calculator.displayUpdate();
})

deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.displayUpdate();
})

