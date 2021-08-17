let numberButton = document.querySelectorAll('[data-number]');
let operationButton = document.querySelectorAll('[data-operation]');
let decimalButton = document.querySelector('[data-decimal]');
let deletButton = document.querySelector('[data-delete]');
let reset = document.querySelector('[data-all-clear]');
let equlalButton = document.querySelector('[data-equal]')
let calculatorDisplay = document.querySelector('.result');
let prevDisplay = document.querySelector('.prev_result');
let operandDisplay = document.querySelector('.operand_display');
let historyArea = document.querySelector('.history');
//let clearHistory = document.querySelector('.clear_history');

let firstValue = 0;
let operatorValue = '';
let nextvalue = false;
let id = localStorage.length;
let p = document.createElement('p');
        

document.addEventListener('DOMContentLoaded', () => {
    for(let i = 0; i <= localStorage.length-1; i++){
        p.textContent = JSON.parse(window.localStorage.getItem(i));
        historyArea.innerHTML +='<br>' + p.textContent + '<br>' ;
    }
})

//Clear Hisory

function clearHistory(){
    window.localStorage.clear();
    window.location.reload();
}


//Display Result

function displayResults(number){
 if(nextvalue){
    calculatorDisplay.textContent = number;
    nextvalue = false;
 } 
 else{
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
   
 }
}



function deleteLast(){
    if(!firstValue || !nextvalue ){
        let disValue = calculatorDisplay.textContent;
        disValue = disValue.substr(0,disValue.length-1);
        calculatorDisplay.textContent = disValue;
        
    }
    else{
        let disValue = firstValue.toString();
        disValue = disValue.substr(0,disValue.length-1);
        calculatorDisplay.textContent = disValue;
        firstValue = Number(disValue);

    }
}

//Number Button

numberButton.forEach(btn => {
    btn.addEventListener('click',() => displayResults(btn.innerHTML));   
})


//operation Button

operationButton.forEach(btn => {
    btn.addEventListener('click',() => useOperator(btn.innerHTML));
})


const calculate = {
    '/' : (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*' : (firstNumber, secondNumber) => firstNumber * secondNumber,
    '-' : (firstNumber, secondNumber) => firstNumber - secondNumber,
    '+' : (firstNumber, secondNumber) => firstNumber + secondNumber,
    '=' : (firstNumber, secondNumber) => secondNumber,

};


function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);

    if(operatorValue && nextvalue){
        operatorValue = operator;
        operandDisplay.textContent = operatorValue == '=' ? '' : operatorValue;
        return;
    } 

    if(!firstValue){
        firstValue = currentValue;
    }
    else{
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        //local storage
        let fullEquation = firstValue+" " + operatorValue+" " + currentValue +" " + '=' + " " +calculation + ";";
        
        window.localStorage.setItem(id,JSON.stringify(fullEquation));
        updateDisplay();
        id++;

        firstValue =Number(calculatorDisplay.textContent);
    

    }
    prevDisplay.textContent = firstValue.toFixed(2);
    nextvalue = true
    operatorValue = operator;
    operandDisplay.textContent = operatorValue == '=' ? '' : operatorValue ;
}



//Decimal Button

decimalButton.addEventListener('click', () => addDecimal(decimalButton.innerHTML));

function addDecimal(){
    if(nextvalue) return;

    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }

}


//Reset Display

reset.addEventListener('click', () => clear());

function clear(){
    firstValue = 0;
    operatorValue = '';
    nextvalue = false;
    calculatorDisplay.textContent = '0';
    prevDisplay.textContent = '';
    operandDisplay.textContent = '';
    

}

function updateDisplay(){ 
        p.textContent = JSON.parse(window.localStorage.getItem(id));
        historyArea.innerHTML += '<br>'+ p.textContent + '<br>';

}


    

//Delete Button

deletButton.addEventListener('click', () => deleteLast());