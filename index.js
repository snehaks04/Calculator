


class Calculator{
    constructor(prev,cur){
        this.prev=prev;
        this.cur=cur;
        this.clear();

    }
    clear(){
        this.curvalue="";
        this.prevvalue="";
        this.operation=undefined;
    }

    delete(){
        this.curvalue=this.curvalue.toString().slice(0,-1);

    }

    appendNumber(number){
        if(number === '.' && this.curvalue.includes('.')) return;
        this.curvalue=this.curvalue.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.curvalue === '') return
        if (this.prevvalue !== '') {
          this.compute()
        }
        this.operation = operation
        this.prevvalue = this.curvalue
        this.curvalue = ''
      }
      getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }

      compute() {
        let computation
        const prev = parseFloat(this.prevvalue)
        const current = parseFloat(this.curvalue)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
          case '+':
            computation = prev + current
            break
          case '-':
            computation = prev - current
            break
          case '*':
            computation = prev * current
            break
          case '÷':
            computation = prev / current
            break
          case '%':
            computation =(prev /100)*current;
            break
          default:
            return
        }
        this.curvalue = computation
        this.operation = undefined
        this.prevvalue = ''
      }
      updateDisplay() {
        this.cur.innerText =
          this.getDisplayNumber(this.curvalue)
        if (this.operation != null) {
          this.prev.innerText =
            `${this.getDisplayNumber(this.prevvalue)} ${this.operation}`
        } else {
          this.prev.innerText = ''
        }
      }
}
let line1 = document.querySelector(".main");
let line2 = document.querySelector(".res");

const clearr=document.querySelector('[data-clear]');
const operation=document.querySelectorAll('[data-operation]');
const deleteBtn=document.querySelector('[data-delete]');
const equall=document.querySelector('[data-compute');
const numbers=document.querySelectorAll('[data-numbers]');

const calculator = new Calculator(line1, line2)
  
  numbers.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    });
  });
  
  operation.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equall.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  clearr.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  }) ;