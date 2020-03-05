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
        return val1 / val2;
    }
}

function checkDivision(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "/") {
        if (arr[i + 2] === "0") throw new Error("TypeError: Division by zero.");
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
}
function calculate(arr) {
    checkDivision(arr);
    checkBrackets(arr);
    let variables = [];
    let znaki = [];
    for (i=0; i< arr.length; i++) {
        if (i === arr.length-1){
            if (Number(arr[i])) {
                if(String(variables[variables.length-1]))
                variables[variables.length - 1] = variables[variables.length-1]+arr[i];
            } else (variables.push (arr[i]))
            return getFinalResult(variables, znaki);
        }
        if (Number(arr[i])){
            if (variables.length === 0) {
                variables.push(arr[i]);
            } else if (String(variables[variables.length-1])) {
                variables[variables.length-1] = variables[variables.length-1] + arr[i];
            } else {
                variables.push(arr[i]);
            }
        }
        if (arr[i] === '+' || arr[i] === '-' || arr[i] === '*' || arr[i] === '/') {
            znaki.push(arr[i]);
            variables[variables.length-1] = parseInt(variables[variables.length-1])
        }
        if (arr[i] === '(')  {
            let start = i+1;
            let end = arr.lastIndexOf(')')
            let newArray = arr.slice(start,end);
            let value = calculate(newArray);
            variables.push(value);
            i = end;
        }
    }

}

function expressionCalculator (expr) {
    const mas = expr.trim();
    const arr = mas.split('');
    const result = calculate(arr);
    return result;
}

function getFinalResult (variables, znaki){
    for (i=0; i<znaki.length;i++){
        if (znaks[znaki[i]] === 1) {
            let res = operation(variables[i], variables[i+1], znaki[i]);
            znaki = znaki.splice(i,1);
            variables = variables.splice(i,2,res);
        }
    }
    for (i=0; i<znaki.length;i++){
            let res = operation(variables[i], variables[i+1], znaki[i]);
            znaki = znaki.splice(i,1);
            variables = variables.splice(i,2,res);  
}
 return variables[0];
}

module.exports = {
    expressionCalculator
}