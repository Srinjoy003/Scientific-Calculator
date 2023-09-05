const MAX_EXPR_SIZE = 100;

// Function to return precedence of operators
function precedence(operator) {
    switch (operator) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        case '^':
            return 3;
        default:
            return -1;
    }
}

// Function to check if the scanned character is an operator
function isOperator(ch) {
    return ['+', '-', '*', '/', '^'].includes(ch);
}

// Function to check if the scanned string is a function
function isFunction(str) {
    return ['sin', 'cos', 'log', 'tan', 'arcsin', 'arccos', 'arctan', 'fac'].includes(str);
}

// Main function to convert infix expression to postfix expression
function infixToPostfix(infix) {
    let postfix = '';
    let stack = [];
    let currFunc = "";
    let posBracket = 0;
    let negBracket = 0;
    let FuncObj = {};
    
    for (let i = 0; i < infix.length; i++) {
        if (infix[i] === ' ' || infix[i] === '\t') {
            continue;
        }

        // If the scanned character is a digit, add it to the postfix expression
        if (/[0-9]/.test(infix[i])) {
            while (i < infix.length && (/[0-9.]/.test(infix[i]))) {
                postfix += infix[i++];
            }
            postfix += ' ';
            i--;
        }

        else if (isFunction(infix.substr(i, 6))) { // for arcsin
            // stack.push(infix.substr(i, 6));
            FuncObj[(posBracket+1).toString()] = infix.substr(i, 6);
            i += 5; // Skip the function name
        }
        
        // If the scanned string is a function, push it onto the stack
        else if (isFunction(infix.substr(i, 3))) {
            // stack.push(infix.substr(i, 3));
            FuncObj[(posBracket+1).toString()] = infix.substr(i, 3);
            i += 2; // Skip the function name
        }

       

        

        
        // If the scanned character is '(', push it onto the stack
        else if (infix[i] === '(') {
            stack.push(infix[i]);
            posBracket++;
        }
        
        // If the scanned character is ')', pop the stack and add to output until '(' is found
        else if (infix[i] === ')') {
            negBracket++;
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                postfix += stack.pop() + ' ';
            }
            if (stack.length > 0 && stack[stack.length - 1] !== '(') {
                return "Invalid Expression";
            } 
            else {
                stack.pop(); // Remove the '(' from the stack
            }
            
            let key = negBracket.toString();
            if(key in FuncObj)
                postfix += FuncObj[key] + ' ';
        }
        
        // If the scanned character is an operator, push it onto the stack
        else if (isOperator(infix[i])) {
            while (stack.length > 0 && precedence(stack[stack.length - 1]) >= precedence(infix[i])) {
                postfix += stack.pop() + ' ';
            }
            stack.push(infix[i]);
        }
    }

    // Pop all remaining elements from the stack
    while (stack.length > 0) {
        if (stack[stack.length - 1] === '(') {
            return "Invalid Expression";
        }
        postfix += stack.pop() + ' ';
    }
    
    return postfix;
}




function Factorial(n) {
    if (n < 0) {
        return NaN; // Factorial is not defined for negative numbers
    }

    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}



// Function to evaluate a postfix expression
function evaluatePostfix(postfix) {
    let stack = [];
    
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '^': (a, b) => Math.pow(a, b),
        'log': (a) => Math.log10(a),
        'sin': (a) => Math.sin(a),
        'cos': (a) => Math.cos(a),
        'tan': (a) => Math.tan(a),
        'ln' : (a) => Math.log(a),
        'arcsin': (a) => Math.asin(a),
        'arccos': (a) => Math.acos(a),
        'arctan': (a) => Math.atan(a),
        '√': (a) => Math.sqrt(a),
        'fac': (a) => Factorial(a)
       
        
    };

    let func = ["log", "ln", "sin", "cos", "tan","√", "arcsin", "arcos", "arctan", "fac"];
    
    const operands = postfix.split(' ');
    
    for (let i = 0; i < operands.length; i++) {
        const token = operands[i];
        
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
            console.log(stack);
        }

        else if (operators[token]) {

            if (func.includes(token) ) {
                const operand = stack.pop();
                stack.push(operators[token](operand));
            } else {
                const operand2 = stack.pop();
                const operand1 = stack.pop();
                stack.push(operators[token](operand1, operand2));
            }
            console.log(stack);

        }

        
    }
    
    return stack.pop();
}

function Evaluate(expression){
    return evaluatePostfix(infixToPostfix(expression).trim());
}

// console.log(Evaluate("fac(5)"));
// console.log(Math.asin(1));
// console.log(infixToPostfix("fac(5) + 6"))
// // console.log(Evaluate("fac(5) + 6"))
console.log(infixToPostfix("fac(fac(5) + 6) + 6"))
Evaluate("fac(5) + 6");
// console.log(Evaluate("(1 + 2)*3"))
// console.log(evaluatePostfix("5 fac 6 +"))

"fac(fac(5) + 6) + 6"
"5 fac 6 + fac 6 +"
"5 6 + fac 6 + fac "


export {Evaluate}


