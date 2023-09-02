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

        else if (isFunction(infix.substr(i, i+6))) { // for arcsin
            stack.push(infix.substr(i, i+6));
            i += 5; // Skip the function name
        }
        
        // If the scanned string is a function, push it onto the stack
        else if (isFunction(infix.substr(i, i+3))) {
            console.log("hello")
            stack.push(infix.substr(i, i+3));
            i += 2; // Skip the function name
        }

       

        
        // If the scanned character is '(', push it onto the stack
        else if (infix[i] === '(') {
            stack.push(infix[i]);
        }
        
        // If the scanned character is ')', pop the stack and add to output until '(' is found
        else if (infix[i] === ')') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                postfix += stack.pop() + ' ';
            }
            if (stack.length > 0 && stack[stack.length - 1] !== '(') {
                return "Invalid Expression";
            } else {
                stack.pop(); // Remove the '(' from the stack
            }
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

//--------------------------------------------------------------------------------------------------

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


function Sin(a, degree){
    if (degree == 1)
        a *= Math.PI/180
    return Math.sin(a);
} 

function Cos(a, degree){
    if (degree == 1)
        a *= Math.PI/180
    return Math.cos(a)
} 

function Tan(a, degree){
    if (degree == 1)
        a *= Math.PI/180
    return Math.tan(a)
} 

function Asin(a, degree){
    let x = Math.asin(a)
    if (degree == 1) 
        x *= Math.PI/180
    return x
} 

function Acos(a, degree){
    let x = Math.acos(a)
    if (degree == 1) 
        x *= Math.PI/180
    return x
}

function Atan(a, degree){
    let x = Math.atan(a)
    if (degree == 1) 
        x *= Math.PI/180
    return x
} 

//-----------------------------------------------------------------------------------------------------------------


// Function to evaluate a postfix expression
function evaluatePostfix(postfix, degree) {
    let stack = [];
    
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '^': (a, b) => Math.pow(a, b),
        'log': (a) => Math.log10(a),
        'sin': (a) => Sin(a, degree),
        'cos': (a) => Cos(a, degree),
        'tan': (a) => Tan(a, degree),
        'ln' : (a) => Math.log(a),
        'arcsin': (a) => Asin(a, degree),
        'arccos': (a) => Acos(a, degree),
        'arctan': (a) => Atan(a, degree),
        '√': (a) => Math.sqrt(a),
        'fac': (a) => Factorial(a)
       
        
    };

    let func = ["log", "ln", "sin", "cos", "tan","√", "arcsin", "arcos", "arctan", "fac"];
    
    const operands = postfix.split(' ');
    
    for (let i = 0; i < operands.length; i++) {
        const token = operands[i];
        
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
          
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
            // console.log(stack);

        }

        
    }
    
    return stack.pop();
}

function Evaluate(expression, degree){
    return evaluatePostfix(infixToPostfix(expression).trim(), degree);
}






export {Evaluate}