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
        // console.log(val1 + ' val1')
        // console.log(val2 + ' val2')
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
        // console.log(brackets + ' br')
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
    // console.log(arr)
    checkDivision(arr);
    checkBrackets(arr);
    let variables = [];
    let znaki = [];
    for (i=0; i< arr.length; i++) {
        
        if (i === arr.length-1){
           
            if (!isNaN(Number(arr[i]))) {
                if(typeof(variables[variables.length-1]) ==  'string'){
                    // console.log('aaa')
                    variables[variables.length - 1] = parseFloat(variables[variables.length-1]+arr[i]);
                }
                else (variables.push(parseFloat(arr[i])))
            } 
            //  console.log('variables');
            // console.log(variables);
            // console.log('znaki');
            // console.log(znaki);
           
            const fin = getFinalResult(variables, znaki);
            // console.log(fin)
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
            // console.log('lsss');
            let start = i+1;
            // let scobki = arr.filter( v => v=='(' || v==')');
            // console.log(scobki)
            // let amount = 0;
            // while(scobki[amount]=='('){
            //     amount ++;
            // }
           
            // let indices = [];
            // let idx = arr.indexOf(')');
            // while (idx != -1) {
            //     indices.push(idx);
            //     idx = arr.indexOf(')', idx + 1);
            // }
//             end =

// console.log(indices);
    // console.log(amount)
            // let end = indiced[indiced.length - amount + 1];
            let end = arr.lastIndexOf(')');
            let newArray = arr.slice(start,end);
            let value = calculate(newArray);
            // console.log(value)
            variables.push(value);
            // console.log(value)
            i = end;
            if (i === arr.length-1){
              
                if (!isNaN(Number(arr[i]))) {
                    if(typeof(variables[variables.length-1]) ==  'string'){
                        // console.log('aaa');
                        variables[variables.length - 1] = parseInt(variables[variables.length-1]+arr[i]);
                    }
                    else (variables.push(parseInt(arr[i])))
                } 
                // console.log('variables');
                // console.log(variables);
                // console.log('znaki');
                // console.log(znaki);
                const fin = getFinalResult(variables, znaki);
                return fin;
            }
            // console.log(variables);
       break; }
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
            // console.log(res)
            znaki.splice(i,1);
            // console.log(znaki)
            variables.splice(i,2,res);
        }
        else {i++}
    }
    for (i=0; i<znaki.length;i){
        // console.log(variables);
        // console.log(znaki)
            let res = operation(variables[i], variables[i+1], znaki[i]);
            
            znaki.splice(i,1);
           variables.splice(i,2,res);  
           
    }
    // console.log(variables);
 return variables[0];
}

module.exports = {
    expressionCalculator
}