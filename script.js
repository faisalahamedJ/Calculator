let numberButton = document.querySelectorAll('[data-number]');
let operationButton = document.querySelectorAll('[data-operation]');
let decimalButton = document.querySelector('[data-decimal]');
let deletButton = document.querySelector('[data-delete]');
let reset = document.querySelector('[data-all-clear]');
let calculatorDisplay = document.querySelector('.result');
let prevDisplay = document.querySelector('.prev_result');
let operandDisplay = document.querySelector('.operand_display');
let historyArea = document.querySelector('.history');
let filterButton = document.querySelector('.filter_box');

let firstValue = 0;
let operatorValue = '';
let nextvalue = false;
let id = localStorage.length;
let p = document.createElement('p');
        
//Initially to display History Value
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.length == 0){
        historyArea.innerHTML = ' No History';
    }
    else{
        for(let i = localStorage.length-1; i >= 0 ; i--){
            p.textContent = JSON.parse(window.localStorage.getItem(i));
            historyArea.innerHTML += p.textContent + '<br>' + '<br>' ;
        }
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
    if(!nextvalue ){
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
        let fullEquation = `${firstValue} ${operatorValue} ${currentValue} = ${calculation} ;`;
        if(fullEquation.split(' = ').length-1 <= 1 ){
            window.localStorage.setItem(id,JSON.stringify(fullEquation));
            updateDisplay();
            id++;
        }
        
        

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
        if(filterButton.value != 'all'){
            window.location.reload();
        }
        p = JSON.parse(window.localStorage.getItem(id));
        let para = document.createElement('p')
        para.innerHTML   =p + '<br>' + '<br>';
        historyArea.prepend(para);
}


    

//Delete Button

deletButton.addEventListener('click', () => deleteLast());

//filtering


 function actionFilter(filterCase){
    switch(filterCase){
        case 'all':
            displayFilter(' ;');
            break;
        case 'add':
            displayFilter(' + ');
            break;
        case 'sub':
            displayFilter(' - ');
            break;
        
        case 'multiply':
            displayFilter(' * ');
            break;
    
        case 'divide':
            displayFilter(' / ');
            break;
    } 
 }

 function displayFilter(filter){
 
     let count = 0;
     historyArea.textContent = '';
    for(let i = localStorage.length-1; i>=0 ; i--){
        let f = JSON.parse(window.localStorage.getItem(i))
        if(f.includes(filter)){
            historyArea.innerHTML += f + '<br>' + '<br>';
            count++;
        }
    }
    if(!count){
        return historyArea.textContent = 'No Result';
    }
    count = 0;
 }

 
