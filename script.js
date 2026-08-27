const display = document.querySelector('.display');//html sy scren ko utha kr js me save kr lia
const buttons = document.querySelectorAll('button');//select all button lements 
let currentInput = '0';//current number begin type 
let previousInput = '';//previous  before oprator
let oprator = '';
let shouldResetDisplay = false;//flag to clear display after oprator is pressed

// add click event listener to all buttons
buttons.forEach(button => {
  button.addEventListener('click', () => { 
    const value = button.innerText.trim();//get the text inside the clicked button 
    //inner text =get text inside the clicked button ,trim=remov extra spaces
//if  clicked value is a number or decimal point  
    if(!isNaN(value) || value === '.'){// check nan if a number or not 
        inputNumber(value);
    }
    else if(value === '+' || value === '-' || value === '*' || value === '/'){
        inputOprator(value);
    }
    else if(value === '='){
        calculate();
    }
    else if(value === 'DEL'){
        deleteLast();
    }
    else if(value === 'RESET'){
        resetCalculator();
    }
  });
});

function inputNumber(num){
    if(shouldResetDisplay){
        currentInput='';
        shouldResetDisplay=false;}
        currentInput += num;
    display.innerText = currentInput;
}

function inputOprator(op){
    if(oprator !== '') calculate(); // pehle wala calculate kar do 
    previousInput = currentInput;
    oprator = op;
    display.innerText = previousInput+ ' ' + op + ' '; // OPERATOR 
    shouldResetDisplay = true;
}

function calculate(){
    if(oprator === '') return;
    const expression=previousInput+''+oprator+''+currentInput;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;
    
    if(oprator === '+') result = prev + current;
    else if(oprator === '-') result = prev - current;
    else if(oprator === '*') result = prev * current;
    else if(oprator === '/') {
        if(current === 0) { 
            alert(" Eror:does not divided by 0"); 
            return; 
        }
        result = prev / current;
    }
    else return;
    
    // Pura hisaab display pe dikhao
    display.innerText = expression + '=' + result;
    
    currentInput = result.toString();
    oprator = '';
    previousInput = '';
    shouldResetDisplay = true;
}

function deleteLast(){
    currentInput = currentInput.slice(0, -1);
    if(currentInput === '') currentInput = '0';
    display.innerText = currentInput;
}

function resetCalculator(){
    currentInput = '0';
    previousInput = '';
    oprator = '';
    display.innerText = currentInput;
}

//  Keyboard Support
document.addEventListener('keydown', function(event) {
    const key = event.key;

    // Numbers 0-9 aur .
    if (key >= '0' && key <= '9' || key === '.') {
        inputNumber(key);
    }
    
    // Operators
    if (key === '+') inputOperator('+');
    if (key === '-') inputOperator('-');
    if (key === '*') inputOperator('*');
    if (key === '/') inputOperator('/');
    if (key === '%') inputOperator('%');
    
    // Enter = =
    if (key === 'Enter') {
        event.preventDefault(); 
        calculate();
    }
    
    // Backspace = delete
    if (key === 'Backspace') deleteLast();
    
    // Escape ya C = Reset
    if (key === 'Escape' || key === 'c' || key === 'C') resetCalculator();
});




