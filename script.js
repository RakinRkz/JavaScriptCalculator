class Calculator
{
    constructor(previousOperandText, currentOperandText) 
    {
      this.previousOperandText = previousOperandText;
      this.currentOperandText = currentOperandText;
      this.clear();
    }
  
    clear() 
    {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
      this.previousOperandText.innerText = '' ;
    }
  
    delete() 
    {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  
    appendNumber(number) 
    {
      if (number === '.' && this.currentOperand.includes('.')) 
        return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  
    chooseOperation(operation) 
    {
      if (this.currentOperand === '') 
        return;
      if (this.previousOperand !== '') {
        this.calculate();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }
    
    getDisplayNumber(number) 
    {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      const decimalDigits = stringNumber.split('.')[1];
      let integerDisplay;
      if (isNaN(integerDigits)) 
      {
        integerDisplay = '';
      } 
      else 
      {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
      }
      if (decimalDigits != null) 
      {
        return `${integerDisplay}.${decimalDigits}`;
      }
      else 
      {
        return integerDisplay;
      }
    }
  
    calculate() 
    {
      var result;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(current)) 
        return;
      switch (this.operation) 
      {
        case '+':
        result = prev + current;
        break;
        case '-':
        result = prev - current;
        break;
        case '×':
        result = prev * current;
        break;
        case '÷':
        result = prev / current;
        break;
        default:
        return;
      }
      this.previousOperandText.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation} ${this.getDisplayNumber(this.currentOperand)} ` ;
      this.currentOperand = result;
      this.operation = undefined;
      this.previousOperand = '';
      
    }  

    specialOps(special)
    {
      // console.log(special);
      let result;
      const ans = parseFloat(this.currentOperand);
      if(isNaN(ans))
      return;

      switch (special) 
      {
        case 'x!':
        result = 1;
        for(var i=ans; i>0; i--)
        result *= i;
        this.previousOperandText.innerText = `${this.currentOperand}!`;
        break;

        case 'x^2':
        result = ans*ans;
        this.previousOperandText.innerText = `${this.currentOperand}^2`;
        break;

        case '%':
        result = ans/100;
        // if(isNaN(result))
        // return;
        this.previousOperandText.innerText += `%`
        break;

        case '√':
        result = Math.sqrt(ans);
        this.previousOperandText.innerText = `√${this.currentOperand}`
        break;

        default:
        return;
      }
      // console.log(this.previousOperandText.innerText);
      this.currentOperand = result;
    }
  
    updateDisplay() 
    {
      this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);        
      if (this.operation != null) 
      {
        this.previousOperandText.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
      } 
    }
}
  
  
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');
const specialButtons = document.querySelectorAll('[data-special]');

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
})
})

operationButtons.forEach(button => {
button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
})
})

specialButtons.forEach(button => 
  {
    button.addEventListener('click', () =>{
      calculator.calculate();
      calculator.specialOps(button.innerText);
      calculator.updateDisplay();
    })
  })

equalsButton.addEventListener('click', button => {
    calculator.calculate()
    calculator.updateDisplay()
})


allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
