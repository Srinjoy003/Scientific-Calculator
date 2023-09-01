function isFunction(str) {
    return ['sin', 'cos', 'log', 'tan', 'arcsin', 'arccos', 'arctan', 'fac'].includes(str);
}

function infixToPostfix(infix) {
    // let postfix = '';
    // let stack = [];
    
    for (let i = 0; i < infix.length; i++) {
       
        // console.log(infix.substr(i, 3));
        
        // If the scanned string is a function, push it onto the stack
        if (isFunction(infix.substr(i, 3))) {
            i += 2; // Skip the function name
            console.log("Hello")

        }

        // console.log(stack);
    }

}

infixToPostfix("fac(5) + fac(6)");