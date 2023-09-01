import {Evaluate} from "./Evaluation.js";

let buttonObj = document.getElementsByTagName("button");
let outputBar = document.getElementsByTagName("input")[0];
let buttonList = Array.from(buttonObj).filter(button => !button.classList.contains("view"));
let deleteBtn = document.getElementById("del");
let checkBox = document.getElementById("checkbox");
let bracketCount = 0;


function BasicOperations(operationList, outputStr, btnStr) {

    let len = outputStr.length;

    if (outputStr == "")
        outputStr = "0 " + btnStr + " ";
    else if (operationList.includes(outputStr[len - 2])) {
        outputStr = outputStr.substring(0, len - 2) + btnStr + outputStr.substring(len - 2 + 1);
    }
    
    else
        outputStr += " " + btnStr + " ";

    return outputStr;
}



function Numbers(outputStr, btnStr) {
    let outputSplit = outputStr.split(" ");
    let splitLen = outputSplit.length;
    let len = outputStr.length;
    let operations = ["!", ")", "π", "e", "%"];


    if (outputStr == "" || outputStr == "0")
        outputStr = btnStr;

    else if (outputStr[len - 1] == 0 && parseInt(outputSplit[splitLen - 1]) == 0) {
        outputStr = outputSplit.join(" ") + btnStr;
    }

    else if (operations.includes(outputStr[len-1])) {
        outputStr +=  " × " + btnStr;

    }
    else
        outputStr += btnStr;

    return outputStr
}


function Delete(outputStr) {
    let functions = ["log(", "sin(", "cos(", "tan(", "arcsin(", "arccos(", "arctan("]


    if (outputStr[outputStr.length-1] == '(')
        bracketCount--;
    else if (outputStr[outputStr.length-1] == ')')
        bracketCount++;

    
    if (functions.includes(outputStr.slice(outputStr.length-7, outputStr.length))) //to delete functions in one go
        outputStr = outputStr.slice(0, outputStr.length - 7);

    else if (functions.includes(outputStr.slice(outputStr.length-4, outputStr.length)))
        outputStr = outputStr.slice(0, outputStr.length - 4);

    else{
        outputStr = outputStr.trim();
        outputStr = outputStr.slice(0, outputStr.length - 1);
        outputStr = outputStr.trim();
    }
    

    return outputStr;
}


function SingleOperatorInput(operationList, outputStr, btnStr) {
    let len = outputStr.length;

    if (btnStr == "x!")
        btnStr = "!";

    if (outputStr == "")
        outputStr = "0" + btnStr;
    else if (operationList.includes(outputStr[len - 2])) 
        outputStr = outputStr.substring(0, len - 3) + btnStr + outputStr.substring(len - 2 + 1);
    
    else
        outputStr += btnStr;

    return outputStr;
}


function FuncInput(outputStr, btnStr) {

    if(btnStr ==  "sin⁻¹"|| btnStr == "cos⁻¹" || btnStr == "tan⁻¹")
        outputStr += "arc"+ btnStr.slice(0,3) + "(";
    
    else
        outputStr += btnStr + "(";
    
    bracketCount++;
    return outputStr;
}


function InverseFunctions(e){

    const colour1 = "rgb(218, 220, 224)";
    const colour2 = "rgb(241, 243, 244)";

    const computedColor = window.getComputedStyle(e.target).backgroundColor;

    if (computedColor === colour1) 
        e.target.style.backgroundColor = colour2;
    else if (computedColor === colour2) 
        e.target.style.backgroundColor = colour1;
    

    let invertible = document.getElementsByClassName("inv");

    let func = ["log", "ln", "sin", "cos", "tan","√"];
    let invFunc = ["10ˣ", "eˣ", "sin⁻¹", "cos⁻¹", "tan⁻¹", "x²"]
    let len = func.length;

    for(let a of invertible){
        for(let i = 0; i < len; i++){
            if (a.innerHTML == func[i]){
                a.innerHTML = invFunc[i];
                break;
            }

            else if (a.innerHTML == invFunc[i]){
                a.innerHTML = func[i];
                break;
            }
        }

    }
}

function OutputReplacement(outputStr){ 
    

    let numList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let functions = ["log", "sin", "cos", "tan", "arcsin", "arccos", "arctan", "π", "e", "√"];
    let pi = Math.PI.toString();
    let e = Math.E.toString();
    const regex = /(\d+)!/g;


    for (let num of numList){ 
        for (let func of functions)
            outputStr= outputStr.replace(num + func, num + " × " + func)

    }

    outputStr = outputStr.replace("%", " / 100");
    outputStr = outputStr.replace("÷", "/");
    outputStr = outputStr.replace("×", "*");
    outputStr = outputStr.replace("π", pi);
    outputStr = outputStr.replace("e", e);
    outputStr = outputStr.replace(regex, 'fac($1)');

    return outputStr;
    
}



function Calculate(outputStr) {


    outputStr = OutputReplacement(outputStr);

    while (bracketCount > 0){
        outputStr += ')';
        bracketCount--;
    }

    try {
        outputStr = Evaluate(outputStr);
    }
    catch {
        outputStr = "Error";
    }

    if (outputStr == undefined)
        outputStr = "Error";

    return outputStr;
}



function main(e) {

    let btnStr = e.target.innerHTML;

    let outputStr = outputBar.value;

    let operations = ["+", "-", "×", "÷"];
    let functions = ["log", "sin", "cos", "tan","sin⁻¹", "cos⁻¹", "tan⁻¹", "√"];


    if (outputStr == "Error")
        outputStr = "";

    if (btnStr == "CE")
        outputStr = Delete(outputStr);

    else if (btnStr == "AC"){
        outputStr = ""
        deleteBtn.innerHTML = "CE";
    }

    else if (btnStr == "Inv"){
        InverseFunctions(e);
        
    }
    else if (operations.includes(btnStr))
        outputStr = BasicOperations(operations, outputStr, btnStr);

    else if (btnStr == "="){
        deleteBtn.innerHTML = "AC";
        outputStr = Calculate(outputStr);
    }

    else if (btnStr == "x!" || btnStr == "%")
        outputStr = SingleOperatorInput(operations, outputStr, btnStr);

    else if (functions.includes(btnStr))
        outputStr = FuncInput(outputStr, btnStr);

    else if (btnStr == "xʸ")
        outputStr += "^";


    else if (btnStr == "(") {
        bracketCount++;
        outputStr += btnStr;
    }
    

    else if (btnStr == ')' ){
        
        if(bracketCount > 0){
            bracketCount--;
            outputStr += btnStr;
        }
    }


    else
        outputStr = Numbers(outputStr, btnStr);

    outputBar.value = outputStr;
}


buttonList.forEach((btn) => {
    btn.addEventListener("click", main);
})



//------------------------------------------------------------------------------------------------------------------------


let numberList = Array.from(document.getElementsByClassName("num"));
let operatorList = Array.from(document.getElementsByClassName("operator"));
let heading = Array.from(document.getElementsByClassName("heading"))[0];

let light_background = "rgb(255,255,255)";
let light_num = "rgb(241,243,244)";
let light_text = "rgb(32,33,36)";
let light_op = "rgb(218,220,224)";
let dark_background = "rgb(32,33,36)";
let dark_op = "rgb(95,99,104)"
let dark_num = "rgb(60, 64, 67)";
let dark_text = "rgb(232,234,237)";
let black = "rgb(0,0,0)";

let light_background2 = "rgb(215,222,234)"
let light_num2 = "rgb(234,227,215)";
let dark_border = "rgb(225, 218, 218)"




function LightDarkMode(e){

    if(e.target.checked){
       
        document.body.style.backgroundColor = dark_background;
        heading.style.color = light_num;

        outputBar.style.backgroundColor = dark_background;
        outputBar.style.color = dark_text;
        outputBar.style.borderColor = light_background;



        numberList.forEach((btn) => {
            btn.style.backgroundColor = dark_num;
            btn.style.color = dark_text

        })

        operatorList.forEach((btn) => {
            btn.style.backgroundColor = dark_op;
            btn.style.color = dark_text;
        })

    }

    else{
        
        document.body.style.backgroundColor = light_background;
        heading.style.color = dark_num;

        outputBar.style.backgroundColor = light_background;
        outputBar.style.color = black;
        outputBar.style.borderColor = dark_border;





        numberList.forEach((btn) => {
            btn.style.backgroundColor = light_num;
            btn.style.color = light_text;

        })

        operatorList.forEach((btn) => {
            btn.style.backgroundColor = light_op;
            btn.style.color = light_text;
        })


    }


}

checkBox.addEventListener("change", LightDarkMode);



