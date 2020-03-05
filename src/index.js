function eval() {
    // Do not use eval!!!
    return;
}
function operation (val1, val2, operator) {
     if (operator === "+") {
        return val1 + val2;
    } else if (operator === "-") {
        return val1 - val2;
    } else if (operator === "*") {
        return val1 * val2;
    } else if (operator === "/") {
        if (!val2 ) {throw  new Error('TypeError: Division by zero.')}
        return val1 / val2;
    }
}

function checkDivision(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "/") {
        if (arr[i + 1] === "0") throw new Error("TypeError: Division by zero.");
      }
    }
}

function checkBrackets(arr) {
    let brackets = 0;
    for (let bracket of arr) {
      if (bracket === "(") {
        brackets++;
      }
      else if (bracket === ")") {
        brackets--;
      }
    }
    
    if (brackets !== 0) {
        throw new Error("ExpressionError: Brackets must be paired.");
    }
}

let znaks = {
    '-': 0,
    '+': 0,
    '*': 1,
    '/': 1,
};

let a = 0;

function calculate(arr) {
    checkDivision(arr);
    checkBrackets(arr);
    let variables = [];
    let znaki = [];
    for (i=0; i< arr.length; i++) {
        if (i === arr.length-1){
           
            if (!isNaN(Number(arr[i]))) {
                if(typeof(variables[variables.length-1]) ==  'string'){
                    variables[variables.length - 1] = parseFloat(variables[variables.length-1]+arr[i]);
                }
                else (variables.push(parseFloat(arr[i])))
            } 
            const fin = getFinalResult(variables, znaki);
            if (isNaN(fin)){
                throw new Error();
            }
            return fin;
        }
        if (!isNaN(Number(arr[i]))){
            if (variables.length === 0) {
                variables.push(arr[i]);
            } else if (typeof(variables[variables.length-1]) ==  'string') {
                variables[variables.length-1] = variables[variables.length-1] + arr[i];
            } else {
                variables.push(arr[i]);
            }
        }
        
        if (arr[i] === '+' || arr[i] === '-' || arr[i] === '*' || arr[i] === '/') {
            znaki.push(arr[i]);
            variables[variables.length-1] = parseFloat(variables[variables.length-1])
        }


        if (arr[i] === '(')  {
            if ( a > 100) {
                break;
            }
            a++;
            let start = i+1;
            let end = arr.lastIndexOf(')');
            let newArray = arr.slice(start,end);
            let value = calculate(newArray);
            variables.push(value);
            i = end;
            if (i === arr.length-1){
              
                if (!isNaN(Number(arr[i]))) {
                    if(typeof(variables[variables.length-1]) ==  'string'){
                        variables[variables.length - 1] = parseInt(variables[variables.length-1]+arr[i]);
                    }
                    else (variables.push(parseInt(arr[i])))
                } 
                const fin = getFinalResult(variables, znaki);
                if (isNaN(fin)){
                    throw new Error();
                }
                return fin;
            }
        }
    }

}

function expressionCalculator (expr) {
    const mas = expr.trim();
    const arr = mas.split('');
    const filteredArr = arr.filter((v)=>v!==' ');
    const result = calculate(filteredArr);
    return result;
}

function getFinalResult (variables, znaki){
    for (i=0; i<znaki.length;i){
        if (znaks[znaki[i]] === 1) {
            let res = operation(variables[i], variables[i+1], znaki[i]);
            znaki.splice(i,1);
            variables.splice(i,2,res);
        }
        else {i++}
    }
    for (i=0; i<znaki.length;i){
            let res = operation(variables[i], variables[i+1], znaki[i]);
            znaki.splice(i,1);
           variables.splice(i,2,res);  
    }
 return variables[0];
}

module.exports = {
    expressionCalculator
}