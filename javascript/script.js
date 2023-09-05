import {Evaluate} from "./Evaluation.js";

let buttonObj = document.getElementsByTagName("button");
let outputBar = document.getElementsByTagName("input")[0];
let outputBar2 = document.getElementsByTagName("input")[1];
let buttonList = Array.from(buttonObj).filter(button => !button.classList.contains("view"));
let deleteBtn = document.getElementById("del");
let deleteBtn2 = document.getElementById("del2");

let checkBox = document.getElementById("checkbox");

let degreeBtn = document.getElementsByClassName("deg")[0];
let degreeBtn2 = document.getElementsByClassName("deg")[1];

let radianBtn = document.getElementsByClassName("rad")[0];
let radianBtn2 = document.getElementsByClassName("rad")[1];

let prevAnsTag = document.getElementsByClassName("prev-answer")[0];
let prevAnsTag2 = document.getElementsByClassName("prev-answer")[1];



let darkAngleText = "rgb(154,160,166)";
let lightAngleText = "rgb(112,117,122)";
let dark_text = "rgb(232,234,237)";
let light_text = "rgb(32,33,36)";



let bracketCount = 0;
let degree = 0;
let answerToggle = 0;
let prevAns = "0";


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
    if(btnStr != "Deg" && btnStr != "Rad"){
        let outputSplit = outputStr.split(" ");
        let splitLen = outputSplit.length;
        let len = outputStr.length;
        let operations = ["!", ")", "π", "e", "%"];



        if (outputStr == "" || outputStr == "0")
            outputStr = btnStr;

        else if (outputStr[len - 1] == 0 && parseInt(outputSplit[splitLen - 1]) == 0) {
            outputStr = outputSplit.join(" ") + btnStr;
        }


        else if (operations.includes(outputStr[len-1]) || outputStr.slice(len-3, len) == "Ans") {
            outputStr +=  " × " + btnStr;

        }
        else
            outputStr += btnStr;
    }

    return outputStr
}


function Delete(outputStr) {
    let functions = ["log(", "sin(", "cos(", "tan(", "arcsin(", "arccos(", "arctan(", "Ans"]


    if (outputStr[outputStr.length-1] == '(')
        bracketCount--;
    else if (outputStr[outputStr.length-1] == ')')
        bracketCount++;

    
    if (functions.includes(outputStr.slice(outputStr.length-7, outputStr.length))) //to delete functions in one go
        outputStr = outputStr.slice(0, outputStr.length - 7);

    else if (functions.includes(outputStr.slice(outputStr.length-4, outputStr.length)))
        outputStr = outputStr.slice(0, outputStr.length - 4);

    else if (functions.includes(outputStr.slice(outputStr.length-3, outputStr.length)))
        outputStr = outputStr.slice(0, outputStr.length - 3);

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

function RadianColours(){
    degree = 0;

    if(checkBox.checked){
        degreeBtn.style.color = darkAngleText ;
        radianBtn.style.color = dark_text ;

        degreeBtn2.style.color = darkAngleText ;
        radianBtn2.style.color = dark_text ;
    }
    

    else{
        degreeBtn.style.color = lightAngleText;
        radianBtn.style.color = light_text ;
    
        degreeBtn2.style.color = lightAngleText;
        radianBtn2.style.color = light_text ;
    }
}


function DegreeColours(){
    degree = 1;

    if(checkBox.checked){
        radianBtn.style.color = darkAngleText ;
        degreeBtn.style.color = dark_text ;

        radianBtn2.style.color = darkAngleText ;
        degreeBtn2.style.color = dark_text ;
    }

    else{
        radianBtn.style.color = lightAngleText;
        degreeBtn.style.color = light_text ;

        radianBtn2.style.color = lightAngleText;
        degreeBtn2.style.color = light_text;
    }
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
    let functions = ["log", "sin", "cos", "tan", "arcsin", "arccos", "arctan", "π", "e", "√", "Ans"];
    let pi = Math.PI.toString();
    let e = Math.E.toString();
    const regex = /(\d+)!/g;
    let len = outputStr.length;


    for (let num of numList){ 
        for (let func of functions)
            outputStr= outputStr.replace(num + func, num + " × " + func)

    }

    if(outputStr[len-1] == "E")
        outputStr = outputStr.slice(0,len-1);

    outputStr = outputStr.replace("%", " / 100");
    outputStr = outputStr.replace("÷", "/");
    outputStr = outputStr.replace("×", "*");
    outputStr = outputStr.replace("π", pi);
    outputStr = outputStr.replace("e", e);
    outputStr = outputStr.replace(regex, 'fac($1)');
    outputStr = outputStr.replace("√", "sqrt");
    outputStr = outputStr.replace("Ans", prevAns);
    outputStr = outputStr.replace("E", " * 10^");

    


    return outputStr;
    
}


function AnswerInput(outputStr){
    let errorList = ["Error", "NaN", "-Infinity", "Infinity", ""]
    const digitPattern = /[0-9]/;
    let len = outputStr.length;


    if(errorList.includes(outputStr) || answerToggle == 1){
        answerToggle = 0;
        outputStr = "Ans";
        return outputStr
    }
    else if(digitPattern.test(outputStr[len-1]))
        outputStr += " Ans"
    else 
        outputStr += "Ans";

    prevAnsTag.innerHTML = "Ans = " + prevAns;
    prevAnsTag2.innerHTML = "Ans = " + prevAns;

    

    return outputStr;

}

function ExpInput(outputStr){
    const digitPattern = /[1-9]/;
    let len = outputStr.length;

    if(digitPattern.test(outputStr[len-1]))
        outputStr += "E";

    return outputStr;
    
}

function Calculate(outputStr) {
    answerToggle = 1;

    if (outputStr == "")
        return 0;

    while (bracketCount > 0){
        outputStr += ')';
        bracketCount--;
    }

    prevAnsTag.innerHTML = outputStr + " =";
    prevAnsTag2.innerHTML = outputStr + " =";


    outputStr = OutputReplacement(outputStr);

    

    try {
        outputStr = Evaluate(outputStr, degree);
    }
    catch {
        outputStr = "Error";
    }

    if (outputStr == undefined)
        outputStr = "Error";
    
    prevAns = outputStr;

    return outputStr;
}



function main(e) {

    let btnStr = e.target.innerHTML;
    let outputStr = outputBar.value;
    let len = outputStr.length;


    let operations = ["+", "-", "×", "÷"];
    let functions = ["log", "sin", "cos", "tan","sin⁻¹", "cos⁻¹", "tan⁻¹", "√"];
    let errorList = ["Error", "NaN", "-Infinity", "Infinity", ""]
    const digitPattern = /[0-9]/;
    

    if (!errorList.includes(outputStr) && answerToggle == 1 && btnStr != "Ans"){
        answerToggle = 0;

        if(digitPattern.test(btnStr) || functions.includes(btnStr) || btnStr == "Ans"){
            prevAnsTag.innerHTML = "Ans = " + outputStr;
            prevAnsTag2.innerHTML = "Ans = " + outputStr;

            outputStr = "";
        }
    }

        
        
    if (errorList.includes(outputStr))
        outputStr = "";

    if (btnStr == "CE")
        outputStr = Delete(outputStr);

    else if (btnStr == "AC"){
        deleteBtn.innerHTML = "CE";
        deleteBtn2.innerHTML = "CE";

        outputStr = ""
    }

    else if (btnStr == "EXP"){
        outputStr = ExpInput(outputStr);
    }



    else if (btnStr == "Inv"){
        InverseFunctions(e);
        
    }
   

    else if (btnStr == "="){
        deleteBtn.innerHTML = "AC";
        deleteBtn2.innerHTML = "AC";
        outputStr = Calculate(outputStr);
    }

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

    else if(btnStr == 'Deg' && degree == 0)
       DegreeColours();
        
    else if (operations.includes(btnStr))
       outputStr = BasicOperations(operations, outputStr, btnStr);
    
    else if(btnStr == 'Rad' && degree == 1)
        RadianColours();

    else if (btnStr == "x!" || btnStr == "%")
        outputStr = SingleOperatorInput(operations, outputStr, btnStr);


    else if (btnStr == "Ans")
        outputStr = AnswerInput(outputStr);

    else if(btnStr == "123" || btnStr == "Fx")
        outputStr += "";
    

    else if (outputStr[len-1] != "E"){
    
        if (btnStr == "Ans")
            outputStr = AnswerInput(outputStr);

        else if (functions.includes(btnStr))
            outputStr = FuncInput(outputStr, btnStr);

        else if (btnStr == "xʸ")
            outputStr += "0^";
        
        
        else if(btnStr == "10ˣ"|| btnStr == "eˣ")
            outputStr += btnStr.substring(0, btnStr.length - 1) + "^";

        else
            outputStr = Numbers(outputStr, btnStr);
    }

    else
        outputStr = Numbers(outputStr, btnStr);

    if (deleteBtn.innerHTML == "AC" && btnStr != "=")
        deleteBtn.innerHTML = "CE";


    outputBar.value = outputStr;
    outputBar2.value = outputStr;

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
let light_op = "rgb(218,220,224)";
let dark_background = "rgb(32,33,36)";
let dark_op = "rgb(95,99,104)"
let dark_num = "rgb(60, 64, 67)";
let black = "rgb(0,0,0)";
let dark_border = "rgb(225, 218, 218)";
let dark_prev_text = "rgb(150,155,161)";
let light_prev_text = "rgb(112,117,122)";

let mobileNumDiv = document.getElementsByClassName("cal-mobile-main")[0];
let mobileFuncDiv = document.getElementsByClassName("cal-mobile-func")[0];
let mobileNumBtn = document.getElementById("mobile-num");
let mobileFuncBtn = document.getElementById("mobile-func");

let borderSelected = "rgb(66, 133, 244)";
let borderUnselected = "rgb(225, 218, 218)"
let backgroundSelected = "rgba(57, 143, 230, 0.31)"
let white = "rgb(255,255,255)";

let mobileToggle = 0;





function LightDarkMode(e){

    if(e.target.checked){ //darkmode
       
        document.body.style.backgroundColor = dark_background;
        heading.style.color = light_num;

        outputBar.style.backgroundColor = dark_background;
        outputBar.style.color = dark_text;
        outputBar.style.borderColor = light_background;
        outputBar2.style.backgroundColor = dark_background;
        outputBar2.style.color = dark_text;
        outputBar2.style.borderColor = light_background;


        prevAnsTag.style.color = dark_prev_text; 
        prevAnsTag2.style.color = dark_prev_text; 

       
        numberList.forEach((btn) => {
            btn.style.backgroundColor = dark_num;
            btn.style.color = dark_text;

        

        })

        operatorList.forEach((btn) => {
            btn.style.backgroundColor = dark_op;
            btn.style.color = dark_text;
        })

        if (degree == 0){
            degreeBtn.style.color = darkAngleText;
            radianBtn.style.color = dark_text ;

            degreeBtn2.style.color = darkAngleText;
            radianBtn2.style.color = dark_text ;
        }
        else{
            radianBtn.style.color = darkAngleText;
            degreeBtn.style.color = dark_text ;

            radianBtn2.style.color = darkAngleText;
            degreeBtn2.style.color = dark_text ;
        }


        if (mobileToggle == 0){
            mobileFuncBtn.style.backgroundColor = dark_background;
            mobileFuncBtn.style.color = dark_text;
            mobileNumBtn.style.color = dark_text;

        }

        else{
            mobileNumBtn.style.backgroundColor = dark_background;
            mobileFuncBtn.style.color = dark_text;
            mobileNumBtn.style.color = dark_text;

        }
    }

    else{ //lightmode
        
        document.body.style.backgroundColor = light_background;
        heading.style.color = dark_num;

        outputBar.style.backgroundColor = light_background;
        outputBar.style.color = black;
        outputBar.style.borderColor = dark_border;
        outputBar2.style.backgroundColor = light_background;
        outputBar2.style.color = black;
        outputBar2.style.borderColor = dark_border;

        prevAnsTag.style.color = light_prev_text;
        prevAnsTag2.style.color = light_prev_text; 




        numberList.forEach((btn) => {
            btn.style.backgroundColor = light_num;
            btn.style.color = light_text;

        })

        operatorList.forEach((btn) => {
            btn.style.backgroundColor = light_op;
            btn.style.color = light_text;
        })


        if (degree == 0){
            degreeBtn.style.color = lightAngleText;
            radianBtn.style.color = light_text ;

            degreeBtn2.style.color = lightAngleText;
            radianBtn2.style.color = light_text ;
        }

        else{
            radianBtn.style.color = lightAngleText;
            degreeBtn.style.color = light_text ;

            radianBtn2.style.color = lightAngleText;
            degreeBtn2.style.color = light_text ;
        }

        mobileFuncBtn.style.color = light_text;
        mobileNumBtn.style.color = light_text;



        if(mobileToggle == 0){ 
            mobileFuncBtn.style.backgroundColor = light_background;
        }  

        else{
            mobileNumBtn.style.backgroundColor = light_background;
        }

      
        


    }


}

checkBox.addEventListener("change", LightDarkMode);


//-------------------------------------------------------------------------------------------------------------



function MobileBtnSwap(e) {
    if (e.target.innerHTML == "123" && mobileToggle == 1) {
        mobileFuncDiv.style.transform = "translate(110%, -125%)";
        mobileNumDiv.style.transform = "translateX(0)";

        mobileNumBtn.style.borderColor = borderSelected;
        mobileFuncBtn.style.borderColor = borderUnselected;
        mobileNumBtn.style.backgroundColor = backgroundSelected;

        if(checkBox.checked)//darkmode
            mobileFuncBtn.style.backgroundColor = dark_background;

        else //lightmode
            mobileFuncBtn.style.backgroundColor = white;
         
        

    } 
    
    else if (e.target.innerHTML == "Fx" && mobileToggle == 0) {
        mobileNumDiv.style.transform = "translateX(-110%)";
        mobileFuncDiv.style.transform = "translate(0, -125%)";

        mobileNumBtn.style.borderColor = borderUnselected;
        mobileFuncBtn.style.borderColor = borderSelected;
        mobileFuncBtn.style.backgroundColor = backgroundSelected;

        if(checkBox.checked)//darkmode
            mobileNumBtn.style.backgroundColor = dark_background;

        else //lightmode
            mobileNumBtn.style.backgroundColor = white;
    }
    mobileToggle = !mobileToggle;
}

mobileNumBtn.addEventListener("click", MobileBtnSwap);
mobileFuncBtn.addEventListener("click", MobileBtnSwap);

